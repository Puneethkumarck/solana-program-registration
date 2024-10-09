import bs58 from 'bs58';
import * as fs from 'fs';
import * as path from 'path';

// Your private key in Base58 format
const privateKeyBase58 = "4FSmSFrfxqVyn96AVGTw3NBNj578yxKjTkrX6oKFz8FKMzFF4gtSfCWpr4MeW4PwTgrtAA5KtWdJQ6EvFk5z7fQv";

// Convert Base58 to Uint8Array
const privateKeyUint8Array = bs58.decode(privateKeyBase58);

// Convert Uint8Array to regular array
const privateKeyArray = Array.from(privateKeyUint8Array);

// Create JSON string
const jsonContent = JSON.stringify(privateKeyArray);

// Define the file path
const filePath = path.join(process.cwd(), 'Turbin3-wallet.json');

// Write to file
fs.writeFile(filePath, jsonContent, 'utf8', (err) => {
    if (err) {
        console.error("An error occurred while writing the wallet file:", err);
    } else {
        console.log(`Turbin3-wallet.json has been created successfully at ${filePath}`);
        console.log("Make sure to add this file to your .gitignore to keep your private key secure.");
    }
});

// Optionally, add to .gitignore
const gitignorePath = path.join(process.cwd(), '.gitignore');
fs.appendFile(gitignorePath, '\nTurbin3-wallet.json', (err) => {
    if (err) {
        console.error("An error occurred while updating .gitignore:", err);
    } else {
        console.log(".gitignore has been updated to include Turbin3-wallet.json");
    }
});