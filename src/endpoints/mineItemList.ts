import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { createAppContext, getMineItems } from "sage";
import { Connection } from "@solana/web3.js";
import { byteArrayToString } from "@staratlas/data-source";
import { scaleStat } from './utils'
import Papa from 'papaparse';

export class MineItemList extends OpenAPIRoute {
	schema = {
		tags: ["Mine Items"],
		summary: "List Mine Items",
		responses: {
			"200": {
				description: "Returns a list of mine items",
				content: {
					"text/csv": {
						schema: z.string(),
					},
				},
			},
		},
	};

	async handle(c: { env: Env }) {

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
			fields: ['Name', 'Hardness'],
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
