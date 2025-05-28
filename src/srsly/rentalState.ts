import { Program } from "@coral-xyz/anchor-31";
import { PublicKey } from "@solana/web3.js";
import { Srsly } from "./idl/srsly";

export class RentalState {
    static findAddress(
        program: Program<Srsly>,
        contract: PublicKey,
        borrower: PublicKey
    ): [PublicKey, number] {
        return PublicKey.findProgramAddressSync(
            [Buffer.from("rental_state"), contract.toBuffer(), borrower.toBuffer()],
            program.programId
        );
    }
}