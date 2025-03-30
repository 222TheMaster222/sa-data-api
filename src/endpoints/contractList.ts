import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import Papa from 'papaparse';
import { Program, AnchorProvider, BN, setProvider, utils, workspace } from "@coral-xyz/anchor";
import { Srsly, IDL } from "../srsly/idl/srsly_idl"
import { createAppContext, getFleets } from "sage";
import { byteArrayToString } from "@staratlas/data-source";
import { Faction } from "@staratlas/profile-faction";
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
		const context = createAppContext(connection);
		const wallet = {
			publicKey: Keypair.generate().publicKey,
			signAllTransactions: async txs => txs,
			signTransaction: async tx => tx,
		};
		const provider = new AnchorProvider(
			connection,
			wallet,
			AnchorProvider.defaultOptions(),
		);

		const program = new Program<Srsly>(IDL, provider)

		const [contracts, rentals, fleets] = await Promise.all([
			program.account.contractState.all(),
			program.account.rentalState.all(),
			getFleets(context),
		]);

		const results = contracts.map(contract => {

			const rental = contract.account.currentRentalState.equals(PublicKey.default)
				? undefined
				: rentals.find(r => r.publicKey.equals(contract.account.currentRentalState))

			const fleet = fleets.find(f => f.key.equals(contract.account.fleet))

			return {
				contract,
				rental,
				fleet,
			}
		})

		const data = results.map(result => {
			const { contract: c, fleet: f, rental: r } = result;


			return {
				'Contract Address': c.publicKey.toBase58(),
				'Rental State': c.account.currentRentalState.toBase58(),
				'Min Duration': c.account.durationMin.toString(),
				'Max Duration': c.account.durationMax.toString(),
				'Fleet': c.account.fleet.toBase58(),
				'Game ID': c.account.gameId.toBase58(),
				'Owner': c.account.owner.toBase58(),
				'Owner Profile': c.account.ownerProfile.toBase58(),
				'Owner Token Account': c.account.ownerTokenAccount.toBase58(),
				// 'Payment Frequency': JSON.stringify(c.account.paymentsFeq), // Uncomment if needed
				'Contract Rate': c.account.rate.toString(),
				'Marked for Closure': c.account.toClose,
				'Contract Version': c.account.version,
				'Faction': Faction[f.data.faction],
				'Fleet Label': byteArrayToString(f.data.fleetLabel),
				'Rental Rate': r?.account.rate.toString(),
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
