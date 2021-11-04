//import {base64ToBytes, bytesToBase64, toCanonicalJSONBytes} from '@tendermint/belt';
import {bech32} from 'bech32';
import {BIP32Interface} from 'bip32';
import {Cipher, Decipher} from 'crypto';
import {sha256} from 'js-sha256';

import {KeyPair} from '../types/account';
import {AesEncryptedPhrase, Crypto, KdfParams, StdSignature, StdTx, TxSignatureMeta} from '../types/types';
import {config} from './config';

const keccak256 = require('keccak256') as typeof import('keccak256');
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

export const pbkdf2 = (password: string, salt: Buffer): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const key = Buffer.from(password);
    crypto.pbkdf2(key, salt, 100000, 256 / 8, 'sha512', (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  });
};

export const scrypt = (
  password: string,
  salt: Buffer,
  keylen: number = 32,
  cost: number = 16384,
  blocksize: number = 8,
  parallelization: number = 1
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const key = Buffer.from(password);
    crypto.scrypt(
      key,
      salt,
      keylen,
      { N: cost, r: blocksize, p: parallelization },
      (err, derivedKey) => {
        if (err) reject(err);
        else resolve(derivedKey);
      }
    );
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

const getDefaultKdfParams = (): KdfParams => {
  const kdfParams: KdfParams = {
    keylen: 32,
    N: 16384,
    r: 8,
    p: 1,
  };
  return kdfParams;
};

export const aesEncryptPbkdf2 = async (
  msg: string,
  pwd: string
): Promise<AesEncryptedPhrase> => {
  const nonce: Buffer = await getRandomBytes(12);
  const salt: Buffer = await getRandomBytes(16);
  const key: Buffer = await pbkdf2(pwd, salt);
  // aes-ctr is just ok with12 bytes, but we need to pad at the end to get required 16 bytes
  const iv: Buffer = Buffer.concat([nonce, Buffer.alloc(4, 0)]);

  const encrypted: string = aesEncrypt(msg, key, iv);
  const encryptedPhrase: AesEncryptedPhrase = {
    ciphertext: encrypted,
    iv: iv.toString('hex'),
    salt: salt.toString('hex'),
  };
  return encryptedPhrase;
};

export const aesEncrypt = (msg: string, key: Buffer, iv: Buffer): string => {
  let cipher: Cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
  const encrypted: string =
    cipher.update(msg.toString(), 'utf8', 'hex') + cipher.final('hex');
  return encrypted;
};

export const aesEncryptScrypt = async (
  msg: string,
  pwd: string
): Promise<Crypto> => {
  const kdfParams: KdfParams = getDefaultKdfParams();
  const nonce: Buffer = await getRandomBytes(12);
  const salt: Buffer = await getRandomBytes(16);
  const key: Buffer = await scrypt(
    pwd,
    salt,
    kdfParams.keylen,
    kdfParams.N,
    kdfParams.r,
    kdfParams.p
  );
  kdfParams.salt = salt.toString('hex');
  // aes-ctr is just ok with12 bytes, but we need to pad at the end to get required 16 bytes
  const iv: Buffer = Buffer.concat([nonce, Buffer.alloc(4, 0)]);

  const encrypted: string = aesEncrypt(msg, key, iv);

  const mac = keccak256(
    Buffer.concat([key.slice(16, 32), Buffer.from(encrypted, 'hex')])
  ).toString('hex');
  const encryptedPhrase: Crypto = {
    ciphertext: encrypted,
    cipherparams: {
      iv: iv.toString('hex'),
    },
    cipher: 'aes-256-ctr',
    kdf: 'scrypt',
    kdfparams: kdfParams,
    mac: mac,
  };
  return encryptedPhrase;
};

export const aesDecryptScrypt = async (
  msg: Crypto,
  pwd: string
): Promise<string> => {
  const { ciphertext, cipherparams, kdfparams, mac } = msg;

  const key: Buffer = await scrypt(
    pwd,
    Buffer.from(kdfparams.salt, 'hex'),
    kdfparams.keylen,
    kdfparams.N,
    kdfparams.r,
    kdfparams.p
  );
  const testMac = keccak256(
    Buffer.concat([key.slice(16, 32), Buffer.from(ciphertext, 'hex')])
  ).toString('hex');
  if (mac !== testMac)
    throw new Error('Message Authentication Code does not match');
  let iv: Buffer = Buffer.from(cipherparams.iv, 'hex');
  let decipher: Decipher = crypto.createDecipheriv('aes-256-ctr', key, iv);
  const decrypted: string =
    decipher.update(ciphertext, 'hex', 'utf8') + decipher.final('utf8');
  return decrypted;
};

export const aesDecryptPbkdf2 = async (
  msg: AesEncryptedPhrase,
  pwd: string
): Promise<string> => {
  const key: Buffer = await pbkdf2(pwd, Buffer.from(msg.salt, 'hex'));
  let iv: Buffer = Buffer.from(msg.iv, 'hex');
  const decrypted: string = aesDecrypt(msg.ciphertext, iv, key);
  return decrypted;
};

export const aesDecrypt = (
  ciphertext: string,
  iv: Buffer,
  key: Buffer
): string => {
  let decipher: Decipher = crypto.createDecipheriv('aes-256-ctr', key, iv);
  const decrypted: string =
    decipher.update(ciphertext, 'hex', 'utf8') + decipher.final('utf8');
  return decrypted;
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

  const child: BIP32Interface = masterKey.derivePath(hdPath); // not sure about this line yet
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
  // TO  DO finish changing  tonative crypto
  //const sha256Hash = crypto.createHash('sha256');
  //const ripemd = crypto.createHash('ripemd160');
  //sha256Hash.update(key);

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

export const generateSignature = (signMsg, keys: KeyPair): StdSignature => {
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
