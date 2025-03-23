import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Task } from "../types";
import { createAppContext, getMineItems, getResources, getShips } from "sage";
import { Connection, PublicKey } from "@solana/web3.js";
import { Ship, ShipStats } from "@staratlas/sage";
import { byteArrayToString } from "@staratlas/data-source";
import { scaleStat } from './utils'
import Papa from 'papaparse';

export class MineItemList extends OpenAPIRoute {
	schema = {
		tags: ["Mine Item"],
		summary: "List Mine Item",
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
				description: "Returns a list of mine items",
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

		const allMineItems = await getMineItems(context);

		const mineItemModels = allMineItems.map(src => ({
			name: byteArrayToString(src.data.name),
			key: src.key.toBase58(),
			resourceHardness: scaleStat(src.data.resourceHardness, 2),
			mint: src.data.mint.toBase58(),
		}));

		const sortedMineItemModels = mineItemModels.sort((a, b) => a.name.localeCompare(b.name))

		const csv = Papa.unparse({
			fields: ['name', 'resourceHardness'],
			data: sortedMineItemModels
		})

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
