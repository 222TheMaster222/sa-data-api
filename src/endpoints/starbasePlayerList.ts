import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { createAppContext, getStarbasePlayers, getStarbasePlayersByPlayerProfile } from "sage";
import { Connection, PublicKey } from "@solana/web3.js";
import Papa from 'papaparse';

export class StarbasePlayerList extends OpenAPIRoute {
	schema = {
		tags: ["Starbase Players"],
		summary: "List Starbase Players",
		request: {
			query: z.object({
				playerProfile: z.string().min(32).max(44), // Solana pubkey
			}),
		},
		responses: {
			"200": {
				description: "Returns a list of starbase players",
				content: {
					"text/csv": {
						schema: z.string(),
					},
				},
			},
		},
	};

	async handle(c) {
		const { playerProfile } = (await this.getValidatedData<typeof this.schema>()).query;

		const connection = new Connection(c.env.RPC_URL, { commitment: "confirmed" })
		const context = createAppContext(connection)

		const starbasePlayers = await getStarbasePlayersByPlayerProfile(new PublicKey(playerProfile), context);

		const data = starbasePlayers
			.filter(sp => sp.data.playerProfile.equals(new PublicKey('8GL7D7yQi6fRpMs6dugVmz9TLSrpwYoR71ewpFiekKBL')))
			.map(sp => {
				return {
					"Starbase Player Address": sp.key.toBase58(),
					"Version": sp.data.version,
					"Player Profile": sp.data.playerProfile.toBase58(),
					"Game ID": sp.data.gameId.toBase58(),
					"Starbase": sp.data.starbase.toBase58(),
					"Sage Player Profile": sp.data.sagePlayerProfile.toBase58(),
					"PDA Bump": sp.data.bump,
					"Ship Escrow Count": sp.data.shipEscrowCount,
					"Old Total Crew": sp.data.oldTotalCrew,
					"New Total Crew": sp.data.newTotalCrew,
					"Busy Crew": sp.data.busyCrew.toString(),
					"Game Update ID": sp.data.updateId.toString(),
					"Updated Ship Escrow Count": sp.data.updatedShipEscrowCount,
				};
			})
			.sort((a, b) => a["Starbase Player Address"].localeCompare(b['Starbase Player Address']))

		const csv = Papa.unparse(data)

		return new Response(csv, {
			headers: {
				'Content-Type': 'text/plain',
				//'Cache-Control': 'public, max-age=300', // cache 5 min
			},
		});
	}
}