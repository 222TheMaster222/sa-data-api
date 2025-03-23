import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { createAppContext, getSectors } from "sage";
import { Connection } from "@solana/web3.js";
import { byteArrayToString } from "@staratlas/data-source";
import { sectorToString } from './utils'
import Papa from 'papaparse';

export class SectorList extends OpenAPIRoute {
	schema = {
		tags: ["Sectors"],
		summary: "List Sectors",
		responses: {
			"200": {
				description: "Returns a list of sectors",
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

		const allSectors = await getSectors(context);

		const sectorModels = allSectors.map(src => ({
			name: byteArrayToString(src.data.name),
			coordinates: sectorToString(src.data.coordinates),
		}));

		const sortedSectorModels = sectorModels.sort((a, b) => a.name.localeCompare(b.name))

		const csv = Papa.unparse(sortedSectorModels)

		return new Response(csv, {
			headers: {
				'Content-Type': 'text/plain',
				//'Cache-Control': 'public, max-age=300', // cache 5 min
			},
		});
	}
}