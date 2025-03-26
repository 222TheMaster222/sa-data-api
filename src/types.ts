import { RecipeStatus } from "@staratlas/crafting";
import { DateTime, Num, Str } from "chanfana";
import { z } from "zod";

export const Task = z.object({
	name: Str({ example: "lorem" }),
	slug: Str(),
	description: Str({ required: false }),
	completed: z.boolean().default(false),
	due_date: DateTime(),
});

export const Recipe = z.object({
	namespace: Str({
		example: "Toolkit 1",
		description: "The name of this recipe (stored as a 32-byte array)."
	}),
	duration: Num({
		example: 4,
		description: "The time required to craft this Recipe (in seconds)."
	}),
	minDuration: Num({
		example: 1,
		description: "The minimum time required to craft this Recipe (in seconds)."
	}),
	feeAmount: Num({
		example: 0.00014462,
		description: "The amount to charge when this recipe is used."
	}),
	status: z.nativeEnum(RecipeStatus, {
		description: "The status of the recipe. Valid values are: Initializing, Active, and Deactivated."
	}),
	totalCount: Num({
		example: 2,
		description: "The total count of all inputs and outputs in this recipe."
	}),
	usageCount: Num({
		example: 13555749315,
		description: "The number of times this recipe has been used."
	}),
	usageLimit: Num({
		example: 18446744073709551615,
		description: "The maximum number of times this recipe can be used."
	}),
	value: Num({
		example: 140000,
		description: "The economic value of this recipe, as determined by the creator."
	}),
	version: Num({
		example: 0,
		description: "The data version of this recipe account."
	}),
	category: Str({
		example: "Tier 2",
		description: "The Recipe Category (typically represented by the category's namespace)."
	}),
});
