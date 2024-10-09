import { Keypair } from  "@solana/web3.js"
import * as fs from "fs"

let kpair = Keypair.generate();

console.log(`You've generated a new Solana wallet: ${kpair.publicKey.toBase58()}`);
fs.writeFileSync('dev-wallet.json', `[${kpair.secretKey}]`);
console.log("Your wallet has been saved to dev-wallet.json");