import { Fleet } from "@staratlas/sage";
import { readAllFromRPC } from "@staratlas/data-source";
import { bs58 } from "@staratlas/anchor/dist/cjs/utils/bytes";
import { AppContext } from "./appContext";
import { PublicKey } from "@solana/web3.js";

export async function getFleets(context: AppContext): Promise<Fleet[]> {

    return (await readAllFromRPC(
        context.connection,
        context.sage,
        Fleet,
        'confirmed'))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as Fleet);
}

export async function getFleetsByOwnerProfile(ownerProfile: PublicKey, context: AppContext): Promise<Fleet[]> {
    const ownerProfile58 = bs58.encode(ownerProfile.toBuffer());

    return (await readAllFromRPC(
        context.connection,
        context.sage,
        Fleet,
        'confirmed',
        [{
            memcmp: {
                offset: 8 + 1 + 32,
                bytes: ownerProfile58,
            }
        }]))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as Fleet);
}

export async function getFleetsBySubProfile(subProfile: PublicKey, context: AppContext): Promise<Fleet[]> {
    const subProfile58 = bs58.encode(subProfile.toBuffer());

    return (await readAllFromRPC(
        context.connection,
        context.sage,
        Fleet,
        'confirmed',
        [{
            memcmp: {
                offset: 8 + // discriminator
                    1 + // Version
                    32 + // Game Id
                    32 + // Owner Profile
                    32 // Fleet Ships
                , // 
                bytes: subProfile58,
            }
        }]))
        .filter(p => p.type === 'ok')
        .map(p => (p as any).data as Fleet);
}