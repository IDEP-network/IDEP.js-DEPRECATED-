import {bech32} from 'bech32';
import {publicKeyCreate as secp256k1PublicKeyCreate} from 'secp256k1';

import * as bip32 from '../bip32';
import * as bip39 from '../bip39';
import {ripemd160, sha256} from '../cryptography/hashing.tools';

if (process.envType === 'browser') {
  var Buffer = require('buffer/').Buffer;
  var getRandomBytes = (length: number): any => {
    const uintarr = window.crypto.getRandomValues(new Uint8Array(length));
    return Buffer.from(uintarr);
  };
} else {
  var Buffer = require('buffer/').Buffer;
  const crypto = require('crypto') as typeof import('crypto');
  var getRandomBytes = (length: number): any => {
    return crypto.randomBytes(length);
  };
}

export const verifyAddress = (
  address: string,
  prefix: string = 'idep'
) => {
  const DECODED_ADDRESS_LENGTH = 20;

  const decodedAddress = bech32.decode(address);
  const length = Buffer.from(bech32.fromWords(decodedAddress.words)).length;
  let errors = [];
  if (decodedAddress.prefix !== prefix) {
    errors = errors.concat('Address prefix is not correct.');
  }
  if (length !== DECODED_ADDRESS_LENGTH) {
    errors = errors.concat('Address length is not valid.');
  }
  if (errors.length > 0) {
    const error = errors.join(' ');
    throw new Error(error);
  }
  return true;
};

export const generateMnemonic = async (): Promise<string> => {
  const randomBytes = await getRandomBytes(24);

  return bip39.entropyToMnemonic(randomBytes.toString('hex'));
};

export const generateMasterKeyFromMnemonic = async (
  mnemonic: string
): Promise<any> => {
  // throws if mnemonic is invalid
  // if (!bip39.validateMnemonic(mnemonic)) {
  //   throw new Error('Invalid mnemonic format'); // TO-DO custom error //type
  // }
  const seed: Buffer = await bip39.mnemonicToSeed(mnemonic);
  return bip32.fromSeed(seed);
};

export const generatePrivateKeyFromMnemonic = async (
  mnemonic: string,
  hdPath: string
): Promise<Buffer> => {
  const masterKey = await generateMasterKeyFromMnemonic(mnemonic);

  const child = await masterKey.derivePath(hdPath);
  return child.privateKey;
};

export const derivePublicKeyFromPrivateKey = (privateKey: Buffer): Buffer => {
  const privateKeyBytes = new Uint8Array(privateKey);
  const publicKey = secp256k1PublicKeyCreate(privateKeyBytes, true);

  return Buffer.from(publicKey);
};

export const getAddressFromPublicKey = (
  key: Buffer,
  prefix: string
): string => {
  const message = sha256(key);
  const hash = ripemd160(message);
  const words = bech32.toWords(hash);
  return bech32.encode(prefix, words);
};

export const getAddressFromPrivateKey = (
  key: Buffer,
  prefix: string
): string => {
  return getAddressFromPublicKey(derivePublicKeyFromPrivateKey(key), prefix);
};
