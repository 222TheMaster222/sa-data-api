import { GameState } from "@staratlas/sage";
import { readFromRPCOrError } from "@staratlas/data-source";
import { AppContext } from "./appContext";
import { PublicKey } from "@solana/web3.js";

export async function getGameState(gameStateId: PublicKey, context: AppContext): Promise<GameState> {

    return readFromRPCOrError(
        context.connection,
        context.sage,
        gameStateId,
        GameState,
        'confirmed');
}