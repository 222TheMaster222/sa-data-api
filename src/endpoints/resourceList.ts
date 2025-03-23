import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Task } from "../types";
import { createAppContext, getMineItems, getPlanets, getResources, getSectors } from "sage";
import { Connection } from "@solana/web3.js";
import { LocationType } from "@staratlas/sage";
import { byteArrayToString } from "@staratlas/data-source";
import { coordinatesEqual, scaleStat, sectorToString } from './utils'
import Papa from 'papaparse';

export class ResourceList extends OpenAPIRoute {
	schema = {
		tags: ["Resource"],
		summary: "List Resource",
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
				description: "Returns a list of resources",
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

		const [allResources, allMineItems, allPlanets, allSectors] = await Promise.all([
			getResources(context),
			getMineItems(context),
			getPlanets(context),
			getSectors(context),
		]);

		// If CPU performance is a problem, we could swap sectorName with planetName :shrug:
		const mineItemMap = new Map(allMineItems.map(mi => [mi.key.toBase58(), mi]));
		const planetMap = new Map(allPlanets.map(p => [p.key.toBase58(), p]));
		const sectorByCoord = new Map(
			allSectors.map(s => [sectorToString(s.data.coordinates), s])
		);

		const blobs = allResources.map(resource => {
			const mineItem = mineItemMap.get(resource.data.mineItem.toBase58());
			const planet = planetMap.get(resource.data.location.toBase58());
			const sector = sectorByCoord.get(sectorToString(planet.data.sector));

			return {
				resource,
				mineItem,
				sector,
			}
		})

		const resourceModels = blobs.map(x => ({
			sectorName: byteArrayToString(x.sector.data.name),
			name: byteArrayToString(x.mineItem.data.name),
			hardness: scaleStat(x.mineItem.data.resourceHardness, 2),
			systemRichness: scaleStat(x.resource.data.systemRichness, 2),
		}));

		const sortedResourceModels = resourceModels.sort((a, b) => a.sectorName.localeCompare(b.sectorName))

		const csv = Papa.unparse(sortedResourceModels)

		return new Response(csv, {
			headers: {
				'Content-Type': 'text/plain',
				//'Cache-Control': 'public, max-age=300', // cache 5 min
			},
		});
	}
}
