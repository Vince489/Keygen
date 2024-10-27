# Keypair Generation Library

This library provides functionality to generate, manage, and use keypairs for cryptographic applications. It leverages the NaCl cryptography library for key generation and message signing, and BIP39 for seed phrase management.

## Features

- Generate a new keypair.
- Generate a keypair from a seed phrase.
- Validate seed phrases.
- Sign and verify messages.
- Convert keypairs to and from JSON format.

## Installation

To install the library, use npm:

npm install bs58 tweetnacl bip39

## Usage

### Generate a New Keypair

const Keypair = require('./keypair');

const keypair = Keypair.generate();
console.log('Public Key:', keypair.publicKey);
console.log('Private Key:', keypair.privateKey);

### Generate Keypair from a Seed Phrase

const seedPhrase = 'your seed phrase here';
const keypair = Keypair.fromSeedPhrase(seedPhrase);
console.log('Public Key:', keypair.publicKey);
console.log('Private Key:', keypair.privateKey);

### Validate Seed Phrase

const isValid = await Keypair.validateSeedPhrase(seedPhrase);
console.log('Is valid seed phrase:', isValid);

### Sign a Message

const message = 'Hello, World!';
const signature = Keypair.sign(keypair.privateKey, message);
console.log('Signature:', signature);

### Verify a Signature

const isValid = Keypair.verify(message, signature, keypair.publicKey);
console.log('Is signature valid?', isValid);

### Convert Keypair to JSON

const json = keypair.toJSON();
console.log('Keypair JSON:', json);

### Create Keypair from JSON

const restoredKeypair = Keypair.fromJSON(json);
console.log('Restored Public Key:', restoredKeypair.publicKey);

## Tests

To run the tests, ensure you have Jest installed and run:

npm test

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
