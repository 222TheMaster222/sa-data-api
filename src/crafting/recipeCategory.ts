import { readAllFromRPC } from "@staratlas/data-source";
import { RecipeCategory } from "@staratlas/crafting";
import { AppContext } from "sage";

export async function getRecipeCategories(context: AppContext): Promise<RecipeCategory[]> {

    return (await readAllFromRPC(
        context.connection,
        context.crafting,
        RecipeCategory,
        'confirmed'))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as RecipeCategory);
}