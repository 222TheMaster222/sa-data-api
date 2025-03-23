import { Planet, Resource } from "@staratlas/sage";
import { readAllFromRPC } from "@staratlas/data-source";
import { AppContext } from "./appContext";

export async function getPlanets(context: AppContext): Promise<Planet[]> {

    return (await readAllFromRPC(
        context.connection,
        context.sage,
        Planet,
        'confirmed'))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as Planet);
}