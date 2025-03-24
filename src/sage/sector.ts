import { Sector } from "@staratlas/sage";
import { readAllFromRPC } from "@staratlas/data-source";
import { bs58 } from "@staratlas/anchor/dist/cjs/utils/bytes";
import { AppContext } from "./appContext";
import BN from "bn.js";

export async function getSectors(context: AppContext): Promise<Sector[]> {

    return (await readAllFromRPC(
        context.connection,
        context.sage,
        Sector,
        'confirmed'))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as Sector);
}

export async function getSectorsByNumPlanets(numPlanets: number, context: AppContext): Promise<Sector[]> {
    const numPlanets58 = bs58.encode(new BN(numPlanets).toTwos(64).toArrayLike(Buffer, "le", 2))

    return (await readAllFromRPC(
        context.connection,
        context.sage,
        Sector,
        'confirmed',
        [
            {
                memcmp: {
                    offset: 8 + // discriminator
                        1 + // version
                        32 + // gameId
                        8 * 2 + // coordinates
                        32 + // discoverer
                        64 // name
                    ,
                    bytes: numPlanets58, // base64 for 0x01 0x00 (1 in u16 LE)
                },
            }
        ]))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as Sector);
}