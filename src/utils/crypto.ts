//import {base64ToBytes, bytesToBase64, toCanonicalJSONBytes} from '@tendermint/belt';
import {bech32} from 'bech32';
import {BIP32Interface} from 'bip32';
import {sha256} from 'js-sha256';

import {KeyPair} from '../types/account';
import {AesEncryptedPhrase, StdSignature, StdTx, TxSignatureMeta} from '../types/types';
import {config} from './config';

const bip32 = require('bip32') as typeof import('bip32');
const bip39 = require('bip39') as typeof import('bip39');
const crypto = require('crypto') as typeof import('crypto');
const CryptoJS = require('crypto-js') as typeof import('crypto-js');
const secp256k1 = require('secp256k1') as typeof import('secp256k1');
//const bech32 = require('bech32')  as typeof import('bech32');
const tendermintBelt =
  require('@tendermint/belt') as typeof import('@tendermint/belt');
//const { bech32 } = require('bech32');

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

export const pbkdf2 = (password, salt) => {
  const key = CryptoJS.enc.Utf8.parse(password);
  const key512Bits1000Iterations = CryptoJS.PBKDF2(key, salt, {
    keySize: 256 / 8,
    iterations: 1000,
  });
  return key512Bits1000Iterations;
};

export const aesEncrypt = async (msg, pwd) => {
  const randomBytes = await getRandomBytes(12);
  const iv = CryptoJS.enc.Hex.parse(randomBytes.toString('hex'));
  const salt = CryptoJS.lib.WordArray.random(128 / 8);
  const key = pbkdf2(pwd, salt);
  const encrypted = CryptoJS.AES.encrypt(msg, key, {
    mode: CryptoJS.mode.CTR,
    iv: iv,
    padding: CryptoJS.pad.NoPadding,
  });
  const encryptedPhrase: AesEncryptedPhrase = {
    cipherText: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
    iv: encrypted.iv.toString(CryptoJS.enc.Hex),
    salt: salt.toString(CryptoJS.enc.Hex),
  };
  return encryptedPhrase;
};

export const aesDecrypt = async (msg, pwd) => {
  const key = pbkdf2(pwd, CryptoJS.enc.Hex.parse(msg.salt));
  const iv = CryptoJS.enc.Hex.parse(msg.iv);
  const cipherText = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(msg.cipherText),
  });
  const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
    mode: CryptoJS.mode.CTR,
    iv,
    padding: CryptoJS.pad.NoPadding,
  });
  return decrypted.toString(CryptoJS.enc.Latin1);
};
export const generateMasterKeyFromMnemonic = async (
  mnemonic: string
): Promise<any> => {
  // throws if mnemonic is invalid
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic format'); // TO-DO custom error type
  }
  const seed = await bip39.mnemonicToSeed(mnemonic);
  return bip32.fromSeed(seed);
};

export const generatePrivateKeyFromMnemonic = async (
  mnemonic: string
): Promise<Buffer> => {
  const masterKey = await generateMasterKeyFromMnemonic(mnemonic);

  const child = masterKey.derivePath(config.hdPath); // not sure about this line yet
  return child.privateKey;
};

export const derivePublicKeyFromPrivateKey = (
  privateKey: Buffer | string
): Buffer => {
  if (typeof privateKey === 'string') {
    privateKey = Buffer.from(privateKey);
  }
  const publicKey: Uint8Array = secp256k1.publicKeyCreate(privateKey, true);

  return Buffer.from(publicKey);
};

export const getAddressFromPublicKey = (
  key: Buffer,
  prefix: string = config.Bech32Prefix
): string => {
  const message = CryptoJS.enc.Hex.parse(key.toString('hex'));
  const hash = CryptoJS.RIPEMD160(CryptoJS.SHA256(message)).toString();

  return encodeIntoBech32Format(Buffer.from(hash, 'hex'), prefix);
};

export const getAddressFromPrivateKey = (
  key: Buffer,
  prefix: string = config.Bech32Prefix
): string => {
  return getAddressFromPublicKey(derivePublicKeyFromPrivateKey(key), prefix);
};

export const aminoMarshalPubKey = (pubKey) => {
  // TO DO
  return Buffer.from(pubKey).toString('hex');
};

export const createMessageSignature = (
  messageSignFormat: any,
  privateKey: Buffer | string
) => {
  if (typeof privateKey === 'string') {
    privateKey = Buffer.from(privateKey);
  }
  //const msgInBytesFormat = tendermintBelt.toCanonicalJSONBytes(signMsg);
  const hashedMessage = sha256.array(messageSignFormat);
  const msgUintArr = new Uint8Array(hashedMessage);

  const { signature } = secp256k1.ecdsaSign(
    msgUintArr,
    new Uint8Array(privateKey)
  );
  return signature;
};

export const createSignedMessageBytes = (
  signMsg,
  privateKey: Buffer
): Uint8Array => {
  const msgInBytesFormat = tendermintBelt.toCanonicalJSONBytes(signMsg);
  return hashAndSignBytesWithPrivateKey(msgInBytesFormat, privateKey);
};

export const hashAndSignBytesWithPrivateKey = (
  bytes: Buffer | Uint8Array,
  key: Buffer
): Uint8Array => {
  const hash = sha256.array(bytes);
  const uintArr = new Uint8Array(hash);
  const uintArrFormatedKey = new Uint8Array(key);
  const { signature } = secp256k1.ecdsaSign(uintArr, uintArrFormatedKey);
  return signature;
};

export const generateSignature = (signMsg, keys: KeyPair) => {
  const { private: privKey, public: pubKey } = keys;
  const signedMsgBytes = createSignedMessageBytes(signMsg, privKey);

  return {
    signature: tendermintBelt.bytesToBase64(signedMsgBytes),
    publicKey: {
      type: 'tendermint/PubKeySecp256k1',
      value: tendermintBelt.bytesToBase64(pubKey),
    },
  };
};

// convert tx and metadata to the correct format for signing
export const createSignMsg = (tx: StdTx, meta: TxSignatureMeta) => {
  return {
    account_number: meta.accountNumber,
    chain_id: meta.chainId,
    fee: tx.fee,
    memo: tx.memo,
    msgs: tx.message,
    sequence: meta.sequence,
  };
};

export const signTx = (
  tx: StdTx,
  meta: TxSignatureMeta,
  keys: KeyPair
): StdTx => {
  const signMsg = createSignMsg(tx, meta);
  const signature = generateSignature(signMsg, keys);
  const signatures = tx.signatures?.length
    ? [...tx.signatures, signature]
    : [signature];
  return { ...tx, signatures };
};

export const verifySignedBytes = (signMsg, signature, pubKey): boolean => {
  const bytes = tendermintBelt.toCanonicalJSONBytes(signMsg);
  const hash = sha256.array(bytes);
  const uintArr = new Uint8Array(hash);

  return secp256k1.ecdsaVerify(signature, uintArr, pubKey);
};

export const verifySingleSignature = (signMsg, signature): boolean => {
  const signedBytes = tendermintBelt.base64ToBytes(signature.signature);
  const pubKey = tendermintBelt.base64ToBytes(
    signature.publicKey?.value || signature.publicKey
  );

  return verifySignedBytes(signMsg, signedBytes, pubKey);
};

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
};

export const verifyTx = (tx: StdTx, meta: TxSignatureMeta): boolean => {
  const signMsg = createSignMsg(tx, meta);
  return verifyTxSignatures(signMsg, tx.signatures);
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
