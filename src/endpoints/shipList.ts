import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Task } from "../types";
import { createAppContext, getShips } from "sage";
import { Connection } from "@solana/web3.js";
import { Ship } from "@staratlas/sage";
import { byteArrayToString } from "@staratlas/data-source";
import { BN } from "bn.js";

export class ShipList extends OpenAPIRoute {
	schema = {
		tags: ["Tasks"],
		summary: "List Tasks",
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
				description: "Returns a list of tasks",
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

		const ships = await getShips(context);

		const csv = shipsToCsv(ships);

		return new Response(csv, {
			headers: {
				'Content-Type': 'text/plain',
				//'Cache-Control': 'public, max-age=300', // cache 5 min
			},
		});
	}
}


function shipsToCsv(ships: Ship[]): string {
	// Step 1: Deduplicate ships by mint, keeping highest updateId
	const latestByMint = new Map<string, Ship>();

	for (const ship of ships) {
		const mint = ship.data.mint.toBase58();
		const current = latestByMint.get(mint);

		if (!current || new BN(ship.data.updateId).gt(new BN(current.data.updateId))) {
			latestByMint.set(mint, ship);
		}
	}

	// Step 2: Convert to array and sort by name
	const dedupedShips = Array.from(latestByMint.values()).sort((a, b) => {
		const nameA = byteArrayToString(a.data.name).toLowerCase();
		const nameB = byteArrayToString(b.data.name).toLowerCase();
		return nameA.localeCompare(nameB);
	});

	// Step 3: Convert to CSV rows
	const rows = [
		['pubkey', 'name', 'mint', 'version', 'gameId', 'updateId'], // CSV header
		...dedupedShips.map((ship) => [
			ship.key.toBase58(),
			byteArrayToString(ship.data.name),
			ship.data.mint.toBase58(),
			ship.data.version.toString(),
			ship.data.gameId.toBase58(),
			ship.data.updateId.toString(),
		]),
	];

	return rows.map(row => row.join(',')).join('\n');
}