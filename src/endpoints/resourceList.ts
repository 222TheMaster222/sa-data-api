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

		const allResources = await getResources(context);
		const allMineItems = await getMineItems(context);
		const allPlanets = await getPlanets(context);
		const allSectors = await getSectors(context);

		const blobs = allResources.map(resource => {

			const mineItem = allMineItems.find(mi => resource.data.mineItem.equals(mi.key))
			const planet = allPlanets.find(p => resource.data.locationType === LocationType.Planet && resource.data.location.equals(p.key));
			const sector = allSectors.find(s => coordinatesEqual(planet.data.sector, s.data.coordinates))

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
