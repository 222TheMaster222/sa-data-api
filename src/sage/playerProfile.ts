import { readAllFromRPC } from "@staratlas/data-source";
import { AppContext } from "./appContext";
import { PlayerName, PlayerProfile } from "@staratlas/player-profile";

export async function getPlayerProfiles(context: AppContext): Promise<PlayerProfile[]> {

    return (await readAllFromRPC(
        context.connection,
        context.playerProfile,
        PlayerProfile,
        'confirmed'))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as PlayerProfile);
}

export async function getPlayerNames(context: AppContext): Promise<PlayerName[]> {

    return (await readAllFromRPC(
        context.connection,
        context.playerProfile,
        PlayerName,
        'confirmed'))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as PlayerName);
}
