import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { createAppContext, getFleets } from "sage";
import { Connection } from "@solana/web3.js";
import { Fleet, ShipStats } from "@staratlas/sage";
import { byteArrayToString } from "@staratlas/data-source";
import { scaleStat } from "./utils";

export class FleetList extends OpenAPIRoute {
	schema = {
		tags: ["Fleets"],
		summary: "List Fleets",
		responses: {
			"200": {
				description: "Returns a list of fleets",
				content: {
					"text/csv": {
						schema: z.string(),
					},
				},
			},
		},
	};

	async handle(c) {

		const connection = new Connection(c.env.RPC_URL, { commitment: "confirmed" })
		const context = createAppContext(connection)

		const allFleets = await getFleets(context);

		const sortedFleets = Array.from(allFleets).sort((a, b) => {
			const nameA = byteArrayToString(a.data.fleetLabel).toLowerCase();
			const nameB = byteArrayToString(b.data.fleetLabel).toLowerCase();
			return nameA.localeCompare(nameB);
		});

		const csv = fleetsToCsv(sortedFleets);

		return new Response(csv, {
			headers: {
				'Content-Type': 'text/plain',
				//'Cache-Control': 'public, max-age=300', // cache 5 min
			},
		});
	}
}

function fleetsToCsv(fleets: Fleet[]): string {

	// Step 3: Convert to CSV rows
	const rows = [
		[
			'Name', 'Cargo Capacity', 'Fuel Capacity', 'Ammo Capacity', 'Food Consumption Rate', 'Ammo Consumption Rate', 'Mining Rate',
			'Subwarp Speed', 'Warp Speed', 'Max Warp Distance', 'Warp Cool Down', 'Warp Fuel Consumption Rate', 'Subwarp Fuel Consumption Rate', 'Planet Exit Fuel Amount',
			'Scan Cool Down', 'Required Crew', 'Respawn Time', 'Scan Cost', 'SDU Per Scan', 'Passenger Capacity',
		], // CSV header
		...fleets.map((fleet) => {
			const { cargoStats, miscStats, movementStats } = fleet.data.stats as ShipStats;
			return [
				byteArrayToString(fleet.data.fleetLabel),
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
