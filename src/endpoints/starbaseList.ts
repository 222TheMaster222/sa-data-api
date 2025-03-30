import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { createAppContext, getGame, getGameState, getStarbases } from "sage";
import { Connection } from "@solana/web3.js";
import { byteArrayToString, getCurrentTimestampOnChain } from "@staratlas/data-source";
import Papa from 'papaparse';
import { calculateCurrentResourceTimeStop, calculateResourceExhaustionTime, GLOBAL_SCALE_DECIMALS_2, Starbase, StarbaseState, StarbaseUpgradeState } from "@staratlas/sage";
import { Faction } from "@staratlas/profile-faction";
import { sectorToString } from "./utils";
import { CraftingFacility } from "@staratlas/crafting";
import BN from "bn.js";

export class StarbaseList extends OpenAPIRoute {
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

		const allStarbases: Starbase[] = await getStarbases(context);
		console.log('fetched starbases')

		const game = await getGame(context);
		console.log('fetched game', game)
		const gameState = await getGameState(game.data.gameState, context);
		console.log('fetched gamestate', gameState)

		const currentGlobalTime = new BN((await getCurrentTimestampOnChain(connection)).toString())

		const data = allStarbases
			.map(s => {
				const upkeepInfo = s.getUpkeepInfo(gameState);

				const ammoTime = calculateCurrentResourceTimeStop(
					currentGlobalTime,
					s.data.upkeepAmmoLastUpdate,
					s.data.upkeepAmmoGlobalLastUpdate,
					s.data.upkeepAmmoBalance,
					upkeepInfo.ammoDepletionRate / GLOBAL_SCALE_DECIMALS_2,
				)

				const ammoExhaustionTime = calculateResourceExhaustionTime(
					ammoTime.localTime,
					ammoTime.newBalance,
					upkeepInfo.ammoDepletionRate / GLOBAL_SCALE_DECIMALS_2);

				const ammoTimeRemaining = ammoExhaustionTime.sub(ammoTime.localTime) // in seconds
				const ammoTimeExhaustion = new Date(new Date().getTime() + ammoTimeRemaining.toNumber() * 1000)

				const foodTime = calculateCurrentResourceTimeStop(
					currentGlobalTime,
					s.data.upkeepFoodLastUpdate,
					s.data.upkeepFoodGlobalLastUpdate,
					s.data.upkeepFoodBalance,
					upkeepInfo.foodDepletionRate / GLOBAL_SCALE_DECIMALS_2,
				)

				const foodExhaustionTime = calculateResourceExhaustionTime(
					foodTime.localTime,
					foodTime.newBalance,
					upkeepInfo.foodDepletionRate / GLOBAL_SCALE_DECIMALS_2);

				const foodTimeRemaining = foodExhaustionTime.sub(foodTime.localTime) // in seconds
				const foodTimeExhaustion = new Date(new Date().getTime() + foodTimeRemaining.toNumber() * 1000)


				const toolkitTime = calculateCurrentResourceTimeStop(
					currentGlobalTime,
					s.data.upkeepToolkitLastUpdate,
					s.data.upkeepToolkitGlobalLastUpdate,
					s.data.upkeepToolkitBalance,
					upkeepInfo.toolkitDepletionRate / GLOBAL_SCALE_DECIMALS_2,
				)

				const toolkitExhaustionTime = calculateResourceExhaustionTime(
					toolkitTime.localTime,
					toolkitTime.newBalance,
					upkeepInfo.toolkitDepletionRate / GLOBAL_SCALE_DECIMALS_2);

				const toolkitTimeRemaining = toolkitExhaustionTime.sub(toolkitTime.localTime) // in seconds
				const toolkitTimeExhaustion = new Date(new Date().getTime() + toolkitTimeRemaining.toNumber() * 1000)

				return {
					'Starbase Address': s.key.toBase58(),
					'Version': s.data.version,
					'Game ID': s.data.gameId.toBase58(),
					'Sector': sectorToString(s.data.sector),
					'Crafting Facility': s.data.craftingFacility.toBase58(),
					'Upgrade Facility': s.data.upgradeFacility.toBase58(),
					'Starbase Name': byteArrayToString(s.data.name),
					'Subcoord': sectorToString(s.data.subCoordinates),
					'Faction': Faction[s.data.faction],
					'PDA Bump': s.data.bump,
					'Sequence ID': s.data.seqId,
					'State': StarbaseState[s.data.state],
					'Level': s.data.level,
					'Health (HP)': s.data.hp.toString(),
					'Shield (SP)': s.data.sp.toString(),
					'Ring Available': s.data.sectorRingAvailable,
					'Upgrade State': StarbaseUpgradeState[s.data.upgradeState],
					'Num Upgrade Ingredients': s.data.numUpgradeIngredients,
					'Last Built/Destroyed Timestamp': s.data.builtDestroyedTimestamp.toString(),
					'Ammo Depletion Rate (per sec)': upkeepInfo.ammoDepletionRate.toString(),
					'Ammo Time Remaining (Sec)': ammoTimeRemaining.toString(),
					'Ammo Time Exhaustion': ammoTimeExhaustion.toISOString(),
					'Food Depletion Rate (per sec)': upkeepInfo.foodDepletionRate.toString(),
					'Food Time Remaining (Sec)': foodTimeRemaining.toString(),
					'Food Time Exhaustion': foodTimeExhaustion.toISOString(),
					'Toolkit Depletion Rate (per sec)': upkeepInfo.toolkitDepletionRate.toString(),
					'Toolkit Time Remaining (Sec)': toolkitTimeRemaining.toString(),
					'Toolkit Time Exhaustion': toolkitTimeExhaustion.toISOString(),
				};
			})
			.sort((a, b) => a['Starbase Name'].localeCompare(b['Starbase Name']))

		const csv = Papa.unparse(data)

		return new Response(csv, {
			headers: {
				'Content-Type': 'text/plain',
				//'Cache-Control': 'public, max-age=300', // cache 5 min
			},
		});
	}
}