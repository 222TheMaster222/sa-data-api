import { RecipeStatus, CRAFTING_IDL } from "@staratlas/crafting";
import { DateTime, Num, Str } from "chanfana";
import { z } from "zod";

export const Task = z.object({
	name: Str({ example: "lorem" }),
	slug: Str(),
	description: Str({ required: false }),
	completed: z.boolean().default(false),
	due_date: DateTime(),
});


const recipeAccount = CRAFTING_IDL.accounts.find(a => a.name === 'recipe');
const recipeFieldsMap: Record<string, string> = recipeAccount.type.fields.reduce((acc, field) => {
	acc[field.name] = field.docs[0] || "";
	return acc;
}, {} as Record<string, string>);

const recipeStatusValues = CRAFTING_IDL.types
	.find(t => t.name === 'RecipeStatus')
	.type.variants.map(v => v.name);

export const Recipe = z.object({
	namespace: Str({
		example: "Toolkit 1",
		description: recipeFieldsMap['namespace'],
	}),
	duration: Num({
		example: 4,
		description: recipeFieldsMap['duration'],
	}),
	minDuration: Num({
		example: 1,
		description: recipeFieldsMap['minDuration'],
	}),
	feeAmount: Num({
		example: 0.00014462,
		description: recipeFieldsMap['feeAmount'],
	}),
	status: z.enum(recipeStatusValues as [string, ...string[]], {
		description: recipeFieldsMap['status'],
	}),
	totalCount: Num({
		example: 2,
		description: recipeFieldsMap['totalCount'],
	}),
	usageCount: Num({
		example: 13555749315,
		description: recipeFieldsMap['usageCount'],
	}),
	usageLimit: Num({
		example: 18446744073709551615,
		description: recipeFieldsMap['usageLimit'],
	}),
	value: Num({
		example: 140000,
		description: recipeFieldsMap['value'],
	}),
	version: Num({
		example: 0,
		description: recipeFieldsMap['version'],
	}),
	category: Str({
		example: "Tier 2",
		description: recipeFieldsMap['category'],
	}),
});
