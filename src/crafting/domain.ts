import { readAllFromRPC } from "@staratlas/data-source";
import { CraftingDomain } from "@staratlas/crafting";
import { AppContext } from "sage";

export async function getDomains(context: AppContext): Promise<CraftingDomain[]> {

    return (await readAllFromRPC(
        context.connection,
        context.crafting,
        CraftingDomain,
        'confirmed'))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as CraftingDomain);
}