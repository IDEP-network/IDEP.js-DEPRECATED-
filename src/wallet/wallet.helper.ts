import {bufferToBytes} from '@tendermint/belt';
import {bech32} from 'bech32';
import {BIP32Interface} from 'bip32';
import {publicKeyCreate as secp256k1PublicKeyCreate} from 'secp256k1';

import {ripemd160, sha256} from '../cryptography/hashing.tools';
import {config} from '../utils/config';

const bip32 = require('bip32') as typeof import('bip32');
const bip39 = require('bip39') as typeof import('bip39');

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
  prefix: string = config.Bech32Prefix
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
): Promise<BIP32Interface> => {
  // throws if mnemonic is invalid
  // if (!bip39.validateMnemonic(mnemonic)) {
  //   throw new Error('Invalid mnemonic format'); // TO-DO custom error //type
  // }
  const seed: Buffer = await bip39.mnemonicToSeed(mnemonic);
  return bip32.fromSeed(seed);
};

export const generatePrivateKeyFromMnemonic = async (
  mnemonic: string,
  hdPath: string = config.hdPath
): Promise<Buffer> => {
  const masterKey = await generateMasterKeyFromMnemonic(mnemonic);

  const child: BIP32Interface = masterKey.derivePath(hdPath);
  return child.privateKey;
};

export const derivePublicKeyFromPrivateKey = (privateKey: Buffer): Buffer => {
  const privateKeyBytes = bufferToBytes(privateKey);
  const publicKey = secp256k1PublicKeyCreate(privateKeyBytes, true);

  return Buffer.from(publicKey);
};
export const encodeIntoBech32Format = (
  hashedAddress: Buffer,
  prefix: string = config.Bech32Prefix
): string => {
  const words = bech32.toWords(hashedAddress);
  return bech32.encode(prefix, words);
};

export const getAddressFromPublicKey = (
  key: Buffer,
  prefix: string = config.Bech32Prefix
): string => {
  const message = sha256(key);
  const hash = ripemd160(message);
  const words = bech32.toWords(hash);
  return bech32.encode(prefix, words);
};

export const getAddressFromPrivateKey = (
  key: Buffer,
  prefix: string = config.Bech32Prefix
): string => {
  return getAddressFromPublicKey(derivePublicKeyFromPrivateKey(key), prefix);
};
