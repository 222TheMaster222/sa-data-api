import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { createAppContext } from "sage";
import { Connection } from "@solana/web3.js";
import { getPlayerNames, getPlayerProfiles } from "sage/playerProfile";
import Papa from "papaparse";

export class ProfileNamesList extends OpenAPIRoute {
	schema = {
		tags: ["Profile Names"],
		summary: "List Profile Names",
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

		const [playerProfiles, playerNames] = await Promise.all([
			getPlayerProfiles(context),
			getPlayerNames(context),
		])

		const playerNameMapObject = playerNames.reduce((acc, x) => {
			acc[x.data.profile.toBase58()] = x.name;
			return acc;
		}, {});

		const data = playerProfiles.map(src => {
			return {
				'Player Profile Key': src.key.toBase58(),
				'Name': playerNameMapObject[src.key.toBase58()],
			}
		})

		const csv = Papa.unparse(data)

		return new Response(csv, {
			headers: {
				'Content-Type': 'text/plain',
				//'Cache-Control': 'public, max-age=300', // cache 5 min
			},
		});
	}
}