const bs58 = require('bs58');
const nacl = require('tweetnacl');
const bip39 = require('bip39');
const Keypair = require('./keypair');

describe('Keypair class', () => {
  test('should generate a valid keypair', () => {
    const keypair = Keypair.generate();
    expect(keypair).toHaveProperty('publicKey');
    expect(keypair).toHaveProperty('privateKey');
    expect(typeof keypair.publicKey).toBe('string');
    expect(typeof keypair.privateKey).toBe('string');
  });

  test('should generate a keypair from a seed phrase', () => {
    const seedPhrase = bip39.generateMnemonic();
    const keypair = Keypair.fromSeedPhrase(seedPhrase);
    expect(keypair).toHaveProperty('publicKey');
    expect(keypair).toHaveProperty('privateKey');
    expect(typeof keypair.publicKey).toBe('string');
    expect(typeof keypair.privateKey).toBe('string');
  });

  test('should generate a seed phrase', async () => {
    const seedPhrase = await Keypair.generateSeedPhrase();
    expect(typeof seedPhrase).toBe('string');
  });

  test('should validate a valid seed phrase', async () => {
    const seedPhrase = bip39.generateMnemonic();
    const isValid = await Keypair.validateSeedPhrase(seedPhrase);
    expect(isValid).toBe(true);
  });

  test('should return false for invalid seed phrase', async () => {
    const invalidSeedPhrase = 'invalid seed phrase example';
    const isValid = await Keypair.validateSeedPhrase(invalidSeedPhrase);
    expect(isValid).toBe(false);
  });

  test('should retrieve keypair from a valid seed phrase', async () => {
    const seedPhrase = bip39.generateMnemonic();
    const keypair = await Keypair.retrieveKeypairFromSeedPhrase(seedPhrase);
    expect(keypair).toHaveProperty('publicKey');
    expect(keypair).toHaveProperty('privateKey');
  });

  test('should throw an error for an invalid seed phrase when retrieving keypair', async () => {
    const invalidSeedPhrase = 'invalid seed phrase example';
    await expect(Keypair.retrieveKeypairFromSeedPhrase(invalidSeedPhrase)).rejects.toThrow('Invalid seed phrase provided.');
  });

  test('should sign a message with a private key', () => {
    const keypair = Keypair.generate();
    const message = 'Hello World';
    const signature = keypair.sign(message); // Use instance's sign method
    expect(typeof signature).toBe('string');
  });

  test('should verify a valid signature', () => {
    const keypair = Keypair.generate();
    const message = 'Hello World';
    const signature = keypair.sign(message); // Use instance's sign method
    const isValid = Keypair.verify(message, signature, keypair.publicKey);
    expect(isValid).toBe(true);
  });

  test('should return false for an invalid signature', () => {
    const keypair = Keypair.generate();
    const message = 'Hello World';
    const invalidSignature = bs58.encode(nacl.randomBytes(64)); // Random invalid signature
    const isValid = Keypair.verify(message, invalidSignature, keypair.publicKey);
    expect(isValid).toBe(false);
  });

  // New Tests for JSON Conversion
  test('should convert keypair to JSON and back', () => {
    const keypair = Keypair.generate();
    const json = keypair.toJSON();
    
    const restoredKeypair = Keypair.fromJSON(json);
    expect(restoredKeypair.publicKey).toBe(keypair.publicKey);
    expect(restoredKeypair.privateKey).toBe(keypair.privateKey);
  });

  test('should throw an error when creating keypair from invalid JSON', () => {
    const invalidJson = { foo: 'bar' };
    expect(() => Keypair.fromJSON(invalidJson)).toThrow('Invalid keypair JSON object.');
  });
});
