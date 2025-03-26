import { OpenAPIRoute } from "chanfana";
import { createAppContext } from "sage";
import { Connection } from "@solana/web3.js";
import { byteArrayToString } from "@staratlas/data-source";
import Papa from 'papaparse';
import { getRecipeCategories, getRecipes } from "crafting";
import { RecipeStatus } from "@staratlas/crafting";
import { scaleStat } from "./utils";
import { Recipe } from "types";

export class RecipeList extends OpenAPIRoute {
	schema = {
		tags: ["Recipes"],
		summary: "List Recipes",
		responses: {
			"200": {
				description: "Returns a list of recipes",
				content: {
					"text/csv": {
						schema: Recipe.array()
					},
				},
			},
		},
	};

	async handle(c) {

		const connection = new Connection(c.env.RPC_URL, { commitment: "confirmed" })
		const context = createAppContext(connection)

		const allRecipes = (await getRecipes(context))
			.filter(r => r.data.status === RecipeStatus.Active)
			.sort((a, b) => {

				const namespaceCompare = byteArrayToString(a.data.namespace).localeCompare(byteArrayToString(b.data.namespace))

				if (namespaceCompare !== 0) {
					return namespaceCompare
				}

				return a.data.version - b.data.version
			});

		const categories = await getRecipeCategories(context);

		const resourceModels = allRecipes.map(r => ({
			'Namespace': byteArrayToString(r.data.namespace),
			'Duration': r.data.duration.toString(),
			'Min Duration': r.data.minDuration.toString(),
			'Fee Amount': scaleStat(r.data.feeAmount.toNumber(), 8).toString(),
			'Status': RecipeStatus[r.data.status],
			'Total Count': r.data.totalCount,
			'Usage Count': r.data.usageCount.toString(),
			'Usage Limit': r.data.usageLimit.toString(),
			'Value': r.data.value.toString(),
			'Version': r.data.version,
			'Category': byteArrayToString(categories.find(c => c.key.equals(r.data.category))?.data.namespace ?? []),
		}))

		const csv = Papa.unparse(resourceModels)

		return new Response(csv, {
			headers: {
				'Content-Type': 'text/plain',
				//'Cache-Control': 'public, max-age=300', // cache 5 min
			},
		});
	}
}
