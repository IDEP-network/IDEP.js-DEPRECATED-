import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import * as crypto from 'crypto';
import {sha256} from 'js-sha256';
import ripemd160 from 'ripemd160-js';
import * as secp256k1 from 'secp256k1';

import config from './config';

let { bech32 } = require('bech32');

export const getRandomBytes = (length: number): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, bytes) => {
      if (err) reject(err);
      else resolve(bytes);
    });
  });
};

export const encodeIntoBech32Format = (
  hashedAddress: Buffer,
  prefix: string = config.Bech32Prefix
): string => {
  const words = bech32.toWords(hashedAddress);
  return bech32.encode(prefix, words);
};

export const generateMnemonic = async (): Promise<string> => {
  const randomBytes = await getRandomBytes(32);

  return bip39.entropyToMnemonic(randomBytes.toString('hex'));
};

export const generatePrivateKeyFromMnemonic = async (
  mnemonic: string
): Promise<string> => {
  // throws if mnemonic is invalid
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic format'); // TO-DO custom error type
  }

  const seed = await bip39.mnemonicToSeed(mnemonic);
  const node = bip32.fromSeed(seed);
  const child = node.derivePath(config.hdPath); // not sure about this line yet
  return child.privateKey;
};

export const derivePublicKeyFromPrivateKey = (privateKey: Buffer | string) => {
  if (typeof privateKey === 'string') {
    privateKey = Buffer.from(privateKey);
  }
  const publicKey = secp256k1.publicKeyCreate(privateKey, true);

  return publicKey;
};

export const getAddressFromPublicKey = (
  key: string,
  prefix: string = config.Bech32Prefix
): string => {
  const hash = ripemd160(sha256(key));

  return encodeIntoBech32Format(hash, prefix);
};

export const getAddressFromPrivateKey = (
  key: string,
  prefix: string = config.Bech32Prefix
): string => {
  return getAddressFromPublicKey(derivePublicKeyFromPrivateKey(key), prefix);
};

export const createMessageSignature = (
  messageSignFormat: any,
  privateKey: Buffer | string
) => {
  if (typeof privateKey === 'string') {
    privateKey = Buffer.from(privateKey);
  }
  const hashedMessage = Buffer.from(
    sha256(messageSignFormat).toString(),
    'hex'
  );

  const { signature } = secp256k1.sign(hashedMessage, privateKey);
  return signature;
};

export const stringToBuffer = (
  string: string,
  encoding: BufferEncoding = 'hex'
): Buffer => Buffer.from(string, encoding);

export const bufferToString = (
  buffer: Buffer,
  encoding: BufferEncoding = 'hex'
): string => buffer.toString(encoding);

// TO-DO keystore, signature, generate hash for tx
