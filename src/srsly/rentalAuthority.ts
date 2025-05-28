import { Program } from "@coral-xyz/anchor-31";
import { PublicKey } from "@solana/web3.js";
import { Srsly } from "./idl/srsly";

export class RentalAuthority {
    static findAddress(program: Program<Srsly>): [PublicKey, number] {
        return PublicKey.findProgramAddressSync(
            [Buffer.from("rental_authority")],
            program.programId
        );
    }
}