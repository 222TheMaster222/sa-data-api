import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Task } from "../types";
import { createAppContext, getMineItems, getResources } from "sage";
import { Connection } from "@solana/web3.js";
import { LocationType, Ship, ShipStats } from "@staratlas/sage";
import { byteArrayToString } from "@staratlas/data-source";
import { scaleStat } from './utils'
import Papa from 'papaparse';

export class ResourceList extends OpenAPIRoute {
	schema = {
		tags: ["Resource"],
		summary: "List Resource",
		request: {
			query: z.object({
				page: Num({
					description: "Page number",
					default: 0,
				}),
				isCompleted: Bool({
					description: "Filter by completed flag",
					required: false,
				}),
			}),
		},
		responses: {
			"200": {
				description: "Returns a list of resources",
				content: {
					"application/json": {
						schema: z.object({
							series: z.object({
								success: Bool(),
								result: z.object({
									tasks: Task.array(),
								}),
							}),
						}),
					},
				},
			},
		},
	};

	async handle(c) {

		const connection = new Connection(c.env.RPC_URL, { commitment: "confirmed" })
		const context = createAppContext(connection)

		const allResources = await getResources(context);
		const allMineItems = await getMineItems(context);

		const blobs = allResources.map(r => ({
			resource: r,
			mineItem: allMineItems.find(mi => r.data.mineItem.equals(mi.key)),
		}))

		LocationType

		const resourceModels = blobs.map(x => ({
			locationKey: x.resource.data.location.toBase58(),
			locationType: LocationType[x.resource.data.locationType],
			resourceName: byteArrayToString(x.mineItem.data.name),
			resourceHardness: scaleStat(x.mineItem.data.resourceHardness, 2),
			systemRichness: scaleStat(x.resource.data.systemRichness, 2),
		}));

		const sortedResourceModels = resourceModels.sort((a, b) => a.resourceName.localeCompare(b.resourceName))

		const csv = Papa.unparse(sortedResourceModels)

		return new Response(csv, {
			headers: {
				'Content-Type': 'text/plain',
				//'Cache-Control': 'public, max-age=300', // cache 5 min
			},
		});
	}
}

type MineItemModel = {
	key: string
	name: string
	resourceHardness: number
	mint: string
}

function shipsToCsv(ships: Ship[]): string {

	// Step 3: Convert to CSV rows
	const rows = [
		[
			'Name', 'Class', 'Cargo Capacity', 'Fuel Capacity', 'Ammo Capacity', 'Food Consumption Rate', 'Ammo Consumption Rate', 'Mining Rate',
			'Subwarp Speed', 'Warp Speed', 'Max Warp Distance', 'Warp Cool Down', 'Warp Fuel Consumption Rate', 'Subwarp Fuel Consumption Rate', 'Planet Exit Fuel Amount',
			'Scan Cool Down', 'Required Crew', 'Respawn Time', 'Scan Cost', 'SDU Per Scan', 'Passenger Capacity',
		], // CSV header
		...ships.map((ship) => {
			const { cargoStats, miscStats, movementStats } = ship.data.stats as ShipStats;
			return [
				byteArrayToString(ship.data.name),
				ship.data.sizeClass,
				cargoStats.cargoCapacity,
				cargoStats.fuelCapacity,
				cargoStats.ammoCapacity,
				scaleStat(cargoStats.foodConsumptionRate, 4),
				scaleStat(cargoStats.ammoConsumptionRate, 4),
				scaleStat(cargoStats.miningRate, 4),
				scaleStat(movementStats.subwarpSpeed, 6),
				scaleStat(movementStats.warpSpeed, 6),
				scaleStat(movementStats.maxWarpDistance, 2),
				movementStats.warpCoolDown,
				scaleStat(movementStats.warpFuelConsumptionRate, 2),
				scaleStat(movementStats.subwarpFuelConsumptionRate, 2),
				movementStats.planetExitFuelAmount,
				miscStats.scanCoolDown,
				miscStats.requiredCrew,
				miscStats.respawnTime,
				miscStats.scanCost,
				miscStats.sduPerScan,
				miscStats.passengerCapacity,
			]
		}),
	];

	return rows.map(row => row.join(',')).join('\n');
}
