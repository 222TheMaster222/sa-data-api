import { GameState, Starbase } from "@staratlas/sage";
import { readAllFromRPC, readFromRPCOrError } from "@staratlas/data-source";
import { AppContext } from "./appContext";
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";

export async function getStarbases(context: AppContext): Promise<Starbase[]> {

    return (await readAllFromRPC(
        context.connection,
        context.sage,
        Starbase,
        'confirmed'))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as Starbase);
}