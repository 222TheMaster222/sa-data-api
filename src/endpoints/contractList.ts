import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { createAppContext } from "sage";
import { Connection } from "@solana/web3.js";
import Papa from 'papaparse';

export class ContractList extends OpenAPIRoute {
	schema = {
		tags: ["Fleet Rental Contracts"],
		summary: "List Fleet Rental Contracts",
		responses: {
			"200": {
				description: "Returns a list of fleet rental contracts",
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

		const data = [{
			'Id': '123456',
			'Name': 'Hello World',
		}];

		const csv = Papa.unparse({
			fields: ['Id', 'Name'],
			data: data
		})

		return new Response(csv, {
			headers: {
				'Content-Type': 'text/plain',
				//'Cache-Control': 'public, max-age=300', // cache 5 min
			},
		});
	}
}
