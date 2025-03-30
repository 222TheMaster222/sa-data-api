import { Game } from "@staratlas/sage";
import { readAllFromRPC } from "@staratlas/data-source";
import { AppContext } from "./appContext";
import { PublicKey } from "@solana/web3.js";

export async function getGame(context: AppContext): Promise<Game> {

    const [game] = (await readAllFromRPC(
        context.connection,
        context.sage,
        Game,
        'confirmed'))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as Game);

    return game;
}