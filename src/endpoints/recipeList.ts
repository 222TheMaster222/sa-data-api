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
			.map(r => {
				const c = categories.find(c => c.key.equals(r.data.category));

				return {
					key: r.key,
					data: {
						...r.data,
						namespace: byteArrayToString(r.data.namespace),
						status: RecipeStatus[r.data.status],
					},
					category: {
						key: c.key,
						data: {
							...c.data,
							namespace: byteArrayToString(c.data.namespace),
						},
					}
				}
			})
			.filter(r => {
				if (filterCategory && !filterCategory.includes(r.category.data.namespace)) return false;
				if (filterStatus && !filterStatus.includes(r.data.status)) return false;
				return true;
			})
			.sort((a, b) => {

				const categoryNamespaceCompare = a.category.data.namespace.localeCompare(b.category.data.namespace);
				if (categoryNamespaceCompare !== 0) {
					return categoryNamespaceCompare;
				}

				const recipeNamespaceCompare = a.data.namespace.localeCompare(b.data.namespace);
				if (recipeNamespaceCompare !== 0) {
					return recipeNamespaceCompare;
				}

				return a.key.toBase58().localeCompare(b.key.toBase58());
			})

		const resourceModels = mapReducedRecipes.map(r => ({
			'Category': r.category.data.namespace,
			'Namespace': r.data.namespace,
			'Duration': r.data.duration.toString(),
			'Min Duration': r.data.minDuration.toString(),
			'Status': r.data.status,
			'Fee Amount': scaleStat(r.data.feeAmount.toNumber(), 8).toString(),
			'Usage Count': r.data.usageCount.toString(),
			'Usage Limit': r.data.usageLimit.toString(),
			'Value': r.data.value.toString(),
			'Consumables Count': r.data.consumablesCount,
			'Non Consumables Count': r.data.nonConsumablesCount,
			'Outputs Count': r.data.outputsCount,
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