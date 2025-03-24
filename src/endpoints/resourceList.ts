import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { createAppContext, getMineItems, getPlanets, getResources, getSectorsByNumPlanets } from "sage";
import { Connection } from "@solana/web3.js";
import { byteArrayToString } from "@staratlas/data-source";
import { scaleStat, sectorToString } from './utils'
import Papa from 'papaparse';

export class ResourceList extends OpenAPIRoute {
	schema = {
		tags: ["Resources"],
		summary: "List Resources",
		responses: {
			"200": {
				description: "Returns a list of resources",
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

		const [allResources, allMineItems, allPlanets, allSectors] = await Promise.all([
			getResources(context),
			getMineItems(context),
			getPlanets(context),
			getSectorsByNumPlanets(1, context), // sectors returns a lot, so let's limit it the best we can :shrug:
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
			'Sector Name': byteArrayToString(x.sector.data.name),
			'Name': byteArrayToString(x.mineItem.data.name),
			'Hardness': scaleStat(x.mineItem.data.resourceHardness, 2),
			'Richness': scaleStat(x.resource.data.systemRichness, 2),
		}));

		const sortedResourceModels = resourceModels.sort((a, b) => a["Sector Name"].localeCompare(b["Sector Name"], undefined, { numeric: true, sensitivity: 'base' }))

		const csv = Papa.unparse(sortedResourceModels)

		return new Response(csv, {
			headers: {
				'Content-Type': 'text/plain',
				//'Cache-Control': 'public, max-age=300', // cache 5 min
			},
		});
	}
}
