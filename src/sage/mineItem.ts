import { MineItem } from "@staratlas/sage";
import { readAllFromRPC } from "@staratlas/data-source";
import { AppContext } from "./appContext";

export async function getMineItems(context: AppContext): Promise<MineItem[]> {

    return (await readAllFromRPC(
        context.connection,
        context.sage,
        MineItem,
        'confirmed'))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as MineItem);
}