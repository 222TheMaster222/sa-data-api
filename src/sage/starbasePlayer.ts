import { StarbasePlayer } from "@staratlas/sage";
import { readAllFromRPC } from "@staratlas/data-source";
import { AppContext } from "./appContext";
import { PublicKey } from "@solana/web3.js";
import { bs58 } from "@staratlas/anchor/dist/cjs/utils/bytes";

export async function getStarbasePlayers(context: AppContext): Promise<StarbasePlayer[]> {

    return (await readAllFromRPC(
        context.connection,
        context.sage,
        StarbasePlayer,
        'confirmed'))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as StarbasePlayer);
}

export async function getStarbasePlayersByPlayerProfile(playerProfile: PublicKey, context: AppContext): Promise<StarbasePlayer[]> {
    const playerProfile58 = bs58.encode(playerProfile.toBuffer());

    return (await readAllFromRPC(
        context.connection,
        context.sage,
        StarbasePlayer,
        'confirmed',
        [{
            memcmp: {
                offset: 8 + 1,
                bytes: playerProfile58,
            }
        }]))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as StarbasePlayer);
}