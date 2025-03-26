import { readAllFromRPC } from "@staratlas/data-source";
import { Recipe, RecipeCategory } from "@staratlas/crafting";
import { AppContext } from "sage";

export async function getRecipes(context: AppContext): Promise<Recipe[]> {

    return (await readAllFromRPC(
        context.connection,
        context.crafting,
        Recipe,
        'confirmed'))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as Recipe);
}
