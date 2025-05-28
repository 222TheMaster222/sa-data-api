import { PublicKey } from "@solana/web3.js";
import { ANTEGEN_PROGRAM_ID } from "../../constants";

export class RentalThread {
    static findAddress(
        rentalAuthority: PublicKey,
        rentalState: PublicKey,
    ): [PublicKey, number] {
        return PublicKey.findProgramAddressSync(
            [
                Buffer.from("thread"),
                rentalAuthority.toBuffer(),
                rentalState.toBuffer()
            ],
            ANTEGEN_PROGRAM_ID
        );
    }
}