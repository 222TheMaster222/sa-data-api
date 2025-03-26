import { OpenAPIRoute } from "chanfana";
import { createAppContext } from "sage";
import { Connection } from "@solana/web3.js";
import { byteArrayToString } from "@staratlas/data-source";
import Papa from 'papaparse';
import { getRecipeCategories, getRecipes } from "crafting";
import { RecipeStatus } from "@staratlas/crafting";
import { scaleStat } from "./utils";
import { Recipe } from "types";
import { z } from "zod";

export class RecipeList extends OpenAPIRoute {
	schema = {
		tags: ["Recipes"],
		summary: "List Recipes",
		request: {
			query: z.object({
				category: z.string().optional(),
				status: z.string().optional().default(RecipeStatus[RecipeStatus.Active]),
			}),

		},
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

		const data = await this.getValidatedData<typeof this.schema>();

		const filterCategory = parseCsvParam(data.query.category);
		const filterStatus = parseCsvParam(data.query.status);


		const connection = new Connection(c.env.RPC_URL, { commitment: "confirmed" })
		const context = createAppContext(connection)

		const [recipes, categories] = await Promise.all([
			getRecipes(context),
			getRecipeCategories(context),
		])

		const mapReducedRecipes = recipes
			.map(r => ({
				data: {
					...r.data,
					namespace: byteArrayToString(r.data.namespace),
				},
				key: r.key,
				category: categories.find(c => c.key.equals(r.data.category))
			}))
			.filter(r => {
				if (filterCategory && !filterCategory.includes(byteArrayToString(r.category.data.namespace))) return false;
				if (filterStatus && !filterStatus.includes(RecipeStatus[r.data.status])) return false;
				return true;
			})
			.sort((a, b) => {

				if (byteArrayToString(a.category.data.namespace) !== byteArrayToString(b.category.data.namespace)) {
					return byteArrayToString(a.category.data.namespace).localeCompare(byteArrayToString(b.category.data.namespace));
				}

				if (a.data.namespace !== b.data.namespace) {
					return a.data.namespace.localeCompare(b.data.namespace);
				}

				return a.key.toBase58().localeCompare(b.key.toBase58());
			})

		const resourceModels = mapReducedRecipes.map(r => ({
			'Category': byteArrayToString(r.category.data.namespace),
			'Namespace': r.data.namespace,
			'Duration': r.data.duration.toString(),
			'Min Duration': r.data.minDuration.toString(),
			'Status': RecipeStatus[r.data.status],
			'Fee Amount': scaleStat(r.data.feeAmount.toNumber(), 8).toString(),
			'Usage Count': r.data.usageCount.toString(),
			'Usage Limit': r.data.usageLimit.toString(),
			'Value': r.data.value.toString(),
			'Consumables Count': r.data.consumablesCount.toString(),
			'Non Consumables Count': r.data.nonConsumablesCount.toString(),
			'Outputs Count': r.data.outputsCount.toString(),
			'Total Count': r.data.totalCount,
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

function parseCsvParam(value?: string): string[] | undefined {
	if (!value) return undefined;
	return value.split(',').map(s => s.trim()).filter(Boolean);
}