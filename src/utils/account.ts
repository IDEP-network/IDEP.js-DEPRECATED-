import {bufferToBytes} from '@tendermint/belt';
import {bech32} from 'bech32';
import {BIP32Interface} from 'bip32';
import {publicKeyCreate as secp256k1PublicKeyCreate} from 'secp256k1';

import {config} from './config';
import {ripemd160, sha256} from './hashing';
import isNode from './is_node';

const bip32 = require('bip32') as typeof import('bip32');
const bip39 = require('bip39') as typeof import('bip39');
const crypto = require('crypto') as typeof import('crypto');
//const CryptoJS = require('crypto-js') as typeof import('crypto-js');

if (isNode) {
  var Buffer = require('buffer').Buffer;
} else {
  var Buffer = require('buffer/').Buffer;
}
export const getRandomBytes = (length: number): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, bytes) => {
      if (err) reject(err);
      else resolve(bytes);
    });
  });
};

export const pbkdf2 = (password: string, salt: Buffer): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const key = Buffer.from(password);
    crypto.pbkdf2(key, salt, 100000, 256 / 8, 'sha512', (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  });
};

export const verifyAddress = (
  address,
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
  console.log(errors);
  console.log(decodedAddress);
  if (errors.length > 0) {
    const error = errors.join(' ');
    throw new Error(error);
  }
  return true;
};

export const generateMnemonic = async (): Promise<string> => {
  const randomBytes = await getRandomBytes(32);

  return bip39.entropyToMnemonic(randomBytes.toString('hex'));
};

export const generateMasterKeyFromMnemonic = async (
  mnemonic: string
): Promise<BIP32Interface> => {
  // throws if mnemonic is invalid
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic format'); // TO-DO custom error type
  }
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

export const getAddressFromPublicKeyOld = async (
  key: Buffer,
  prefix: string = config.Bech32Prefix
): Promise<string> => {
  //const message =CryptoJS.enc.Hex.parse(key.toString('hex'));
  const hash = await ripemd160(await sha256(key)); //CryptoJS.RIPEMD160(CryptoJS.SHA256(message)).toString();

  return encodeIntoBech32Format(hash, prefix);
};

export const getAddressFromPublicKey = async (
  key: Buffer,
  prefix: string = config.Bech32Prefix
): Promise<string> => {
  const message = await sha256(key);
  const hash = await ripemd160(message);
  const words = bech32.toWords(hash);
  return bech32.encode(prefix, words);
};

export const getAddressFromPrivateKey = async (
  key: Buffer,
  prefix: string = config.Bech32Prefix
): Promise<string> => {
  return getAddressFromPublicKey(derivePublicKeyFromPrivateKey(key), prefix);
};
