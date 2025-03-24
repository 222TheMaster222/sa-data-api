import { Fleet } from "@staratlas/sage";
import { readAllFromRPC } from "@staratlas/data-source";
import { AppContext } from "./appContext";

export async function getFleets(context: AppContext): Promise<Fleet[]> {

    return (await readAllFromRPC(
        context.connection,
        context.sage,
        Fleet,
        'confirmed'))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as Fleet);
}