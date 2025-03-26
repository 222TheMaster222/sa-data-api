import { Connection, Keypair, PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
import { AnchorProvider, Program } from "@staratlas/anchor";
import { CRAFTING_IDL, CraftingIDLProgram } from "@staratlas/crafting";
import { PLAYER_PROFILE_IDL, PlayerProfileIDLProgram } from "@staratlas/player-profile";
import { SAGE_IDL, SageIDLProgram } from "@staratlas/sage";

const CRAFTING_PROGRAM_ID = new PublicKey('CRAFT2RPXPJWCEix4WpJST3E7NLf79GTqZUL75wngXo5');
const SAGE_PROGRAM_ID = new PublicKey('SAGE2HAwep459SNq61LHvjxPk4pLPEJLoMETef7f7EE');
const PLAYER_PROFILE_ID = new PublicKey('pprofELXjL5Kck7Jn5hCpwAL82DpTkSYBENzahVtbc9');

// Shared application context
export interface AppContext {
    connection: Connection
    crafting: CraftingIDLProgram
    sage: SageIDLProgram
    playerProfile: PlayerProfileIDLProgram
}

// Function to create the context
export function createAppContext(connection: Connection): AppContext {

    const walletKeypair = Keypair.generate();

    const provider = new AnchorProvider(
        connection,
        new FakeWallet(walletKeypair),
        AnchorProvider.defaultOptions(),
    );

    return {
        connection,
        crafting: new Program(CRAFTING_IDL, CRAFTING_PROGRAM_ID, provider),
        sage: new Program(SAGE_IDL, SAGE_PROGRAM_ID, provider),
        playerProfile: new Program(PLAYER_PROFILE_IDL, PLAYER_PROFILE_ID, provider),
    };
}


class FakeWallet {

    private payer: Keypair;

    constructor(payer: Keypair) {
        this.payer = payer;
    }

    signTransaction<T extends Transaction | VersionedTransaction>(tx: T): Promise<T> {
        throw 'not implemented - signTransaction'
    }

    signAllTransactions<T extends Transaction | VersionedTransaction>(txs: T[]): Promise<T[]> {
        throw 'not implemented - signAllTransactions'
    }

    get publicKey(): PublicKey {
        return this.payer.publicKey;
    }
}
