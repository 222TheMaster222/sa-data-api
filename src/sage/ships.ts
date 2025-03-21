import { Ship } from "@staratlas/sage";
import { PublicKey } from "@solana/web3.js";
import { readFromRPCOrError } from "@staratlas/data-source";
import { AppContext } from "./appContext";

export function getShipByKey(key: PublicKey, context: AppContext): Promise<Ship> {

    return readFromRPCOrError(
        context.connection,
        context.sage,
        key,
        Ship,
        'confirmed',
    );
}