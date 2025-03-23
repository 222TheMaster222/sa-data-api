import { Resource } from "@staratlas/sage";
import { readAllFromRPC } from "@staratlas/data-source";
import { AppContext } from "./appContext";

export async function getResources(context: AppContext): Promise<Resource[]> {

    return (await readAllFromRPC(
        context.connection,
        context.sage,
        Resource,
        'confirmed'))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as Resource);
}