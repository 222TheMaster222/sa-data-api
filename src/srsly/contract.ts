import { Program } from "@coral-xyz/anchor-31";
import { PublicKey } from "@solana/web3.js";
import { Srsly } from "./idl/srsly";

export class Contract {
    static findAddress(
        program: Program<Srsly>,
        fleet: PublicKey
    ): [PublicKey, number] {
        return PublicKey.findProgramAddressSync(
            [Buffer.from("rental_contract"), fleet.toBuffer()],
            program.programId
        );
    }
}