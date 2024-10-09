import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as fs from 'fs';

// Import our keypair from the wallet file
const wallet = JSON.parse(fs.readFileSync('dev-wallet.json', 'utf8'));
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a Solana devnet connection
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
  try {
    // Request airdrop of 2 SOL to the wallet
    console.log("Requesting airdrop...");
    const airdropSignature = await connection.requestAirdrop(
      keypair.publicKey,
      2 * LAMPORTS_PER_SOL
    );

    const latestBlockHash = await connection.getLatestBlockhash();

    // Wait for airdrop confirmation
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: airdropSignature,
    });

    console.log(
      `Airdrop successful! Check out your TX here: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`
    );
  } catch (error) {
    console.error(`Oops, something went wrong: ${error}`);
  }
})();