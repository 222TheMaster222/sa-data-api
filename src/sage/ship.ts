import { Ship } from "@staratlas/sage";
import { readAllFromRPC } from "@staratlas/data-source";
import { AppContext } from "./appContext";

export async function getShips(context: AppContext): Promise<Ship[]> {

    return (await readAllFromRPC(
        context.connection,
        context.sage,
        Ship,
        'confirmed'))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as Ship);
}