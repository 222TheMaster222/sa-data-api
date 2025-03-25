import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { createAppContext } from "sage";
import { Connection } from "@solana/web3.js";
import { Ship, ShipStats } from "@staratlas/sage";
import { byteArrayToString } from "@staratlas/data-source";
import { scaleStat } from "./utils";

export class MarketPricesList extends OpenAPIRoute {
	schema = {
		tags: ["Market Prices"],
		summary: "List Market Prices",
		responses: {
			"200": {
				description: "Returns a list of market prices ",
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

		/*
		const allShips = await getShips(context);

		const latestShips = allShips.filter(s => s.data.next.key.equals(new PublicKey('11111111111111111111111111111111')))

		// Sort: first by sizeClass, then by name
		const sortedShips = Array.from(latestShips).sort((a, b) => {
			const sizeA = a.data.sizeClass;
			const sizeB = b.data.sizeClass;

			// Sort numerically by sizeClass first
			if (sizeA !== sizeB) {
				return sizeA - sizeB;
			}

			const nameA = byteArrayToString(a.data.name).toLowerCase();
			const nameB = byteArrayToString(b.data.name).toLowerCase();
			return nameA.localeCompare(nameB);
		});
	*/

		const csv = shipsToCsv([]);

		return new Response(csv, {
			headers: {
				'Content-Type': 'text/plain',
				//'Cache-Control': 'public, max-age=300', // cache 5 min
			},
		});
	}
}

function shipsToCsv(ships: Ship[]): string {

	// Step 3: Convert to CSV rows
	const rows = [
		[
			'Name', 'Price (ATLAS)'
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
