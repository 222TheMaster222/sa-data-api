import { PublicKey } from "@solana/web3.js";
import { ATLAS_MINT } from "../../constants";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "spl-token-new";

export class RentalTokenAccount {
    static findAddress(
        rentalState: PublicKey,
        mint: PublicKey = ATLAS_MINT,
    ): [PublicKey, number] {
        return PublicKey.findProgramAddressSync(
            [
                rentalState.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                mint.toBuffer()
            ],
            ASSOCIATED_TOKEN_PROGRAM_ID
        );
    }
}