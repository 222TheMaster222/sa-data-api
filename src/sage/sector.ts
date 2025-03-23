import { Sector } from "@staratlas/sage";
import { readAllFromRPC } from "@staratlas/data-source";
import { AppContext } from "./appContext";

export async function getSectors(context: AppContext): Promise<Sector[]> {

    return (await readAllFromRPC(
        context.connection,
        context.sage,
        Sector,
        'confirmed'))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as Sector);
}