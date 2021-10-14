import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import * as crypto from 'crypto';
import { sha256 } from 'js-sha256';
import ripemd160 from 'ripemd160-js';
import * as secp256k1 from 'secp256k1';
import * as cryptoJs from 'crypto-js'
import { config } from './config';
import {
 base64ToBytes,
 //bufferToBytes,
 bytesToBase64,
 toCanonicalJSONBytes
} from '@tendermint/belt';
import { KeyPair } from '../types/account';
import { TxSignatureMeta, StdTx } from '../types/types'
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

export const pbkdf2 = (salt, password) => {
 const key512Bits1000Iterations = cryptoJs.PBKDF2(password, salt, { keySize: 512 / 32, iterations: 1000 });
 return key512Bits1000Iterations;
}

export const aesEncrypt = (msg, pwd) => cryptoJs.AES.encrypt(msg, pwd);

export const aesDecrypt = (msg, pwd) => cryptoJs.AES.decrypt(msg, pwd);

export const generateMasterKeyFromMnemonic = async (mnemonic: string): Promise<any> => {
 // throws if mnemonic is invalid
 if (!bip39.validateMnemonic(mnemonic)) {
  throw new Error('Invalid mnemonic format'); // TO-DO custom error type
 }

 const seed = await bip39.mnemonicToSeed(mnemonic);
 return bip32.fromSeed(seed);
}

export const generatePrivateKeyFromMnemonic = async (
 mnemonic: string
): Promise<Buffer> => {
 const masterKey = await generateMasterKeyFromMnemonic(mnemonic);

 const child = masterKey.derivePath(config.hdPath); // not sure about this line yet
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

export const aminoMarshalPubKey = (pubKey) => {
 // TO DO
 return Buffer.from(pubKey).toString('hex');
}

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

export const createSignedMessageBytes = (signMsg, privateKey: Buffer): Uint8Array => {
 const msgInBytesFormat = toCanonicalJSONBytes(signMsg);

 return hashAndSignBytesWithPrivateKey(msgInBytesFormat, privateKey);
}

export const hashAndSignBytesWithPrivateKey = (bytes: Buffer | Uint8Array, key: Buffer): Uint8Array => {
 const hash = sha256(bytes);
 const { signature } = secp256k1.ecdsaSign(hash, key);
 return signature;
}

export const generateSignature = (signMsg, keys: KeyPair) => {
 const { private: privKey, public: pubKey } = keys;
 const signedMsgBytes = createSignedMessageBytes(signMsg, privKey);

 return {
  signature: bytesToBase64(signedMsgBytes),
  publicKey: {
   type: 'tendermint/PubKeySecp256k1',
   value: bytesToBase64(pubKey),
  }
 }
}

// convert tx and metadata to the correct format for signing
export const createSignMsg = (tx: StdTx, meta: TxSignatureMeta) => {
 return {
  account_number: meta.accountNumber,
  chain_id: meta.chainId,
  fee: tx.fee,
  memo: tx.memo,
  msgs: tx.message,
  sequence: meta.sequence
 }
}

export const signTx = (tx: StdTx, meta: TxSignatureMeta, keys: KeyPair): StdTx => {
 const signMsg = createSignMsg(tx, meta);
 const signature = generateSignature(signMsg, keys);
 const signatures = tx.signatures?.length ? [...tx.signatures, signature] : [signature];
 return { ...tx, signatures }
}

export const verifySignedBytes = (signMsg, signature, pubKey): boolean => {
 const bytes = toCanonicalJSONBytes(signMsg)
 const hash = sha256(bytes);

 return secp256k1.ecdsaVerify(signature, hash, pubKey)
}

const verifySingleSignature = (signMsg, signature): boolean => {
 const signedBytes = base64ToBytes(signature.signature);
 const pubKey = base64ToBytes(signature.publicKey);

 return verifySignedBytes(signMsg, signedBytes, pubKey);
}

export const verifyTxSignatures = (signMsg, signatures): boolean => {
 if (!signatures.length) {
  return false;
 }
 for (let i = 0; i < signatures.length; i++) {
  if (!verifySingleSignature(signMsg, signatures[i])) {
   return false;
  }
 }

 return true;
}

export const verifyTx = (tx: StdTx, meta: TxSignatureMeta): boolean => {
 const signMsg = createSignMsg(tx, meta);

 return verifyTxSignatures(signMsg, tx.signatures);
}

export const stringToBuffer = (
 string: string,
 encoding: BufferEncoding = 'hex'
): Buffer => Buffer.from(string, encoding);

export const bufferToString = (
 buffer: Buffer,
 encoding: BufferEncoding = 'hex'
): string => buffer.toString(encoding);

// TO-DO keystore, signature, generate hash for tx
