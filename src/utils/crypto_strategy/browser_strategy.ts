import sha3 from 'js-sha3';
import * as scryptPbkdf from 'scrypt-pbkdf';

import {Crypto, KdfParams} from '../../types/types';
import {getDefaultKdfParams} from '../crypto';
import {CryptoStrategy} from './crypto_strategy';

const util = require('util');
const { subtle, getRandomValues } = require('crypto').webcrypto;

export class WebCrypto implements CryptoStrategy {
  precomputedHexOctets;

  constructor() {
    this.precomputedHexOctets = [];
    for (let n = 0; n <= 0xff; ++n) {
      const hexOctet = n.toString(16).padStart(2, '0');
      this.precomputedHexOctets.push(hexOctet);
    }
  }
  public async getRandomBytes(length): Promise<Uint8Array> {
    return getRandomValues(new Uint8Array(length));
  }
  public async kdfMethod(
    password: string,
    salt: Uint8Array,
    keylen: number = 32,
    cost: number = 16384,
    blocksize: number = 8,
    parallelization: number = 1
  ): Promise<ArrayBuffer> {
    const scryptParams = {
      N: cost,
      r: blocksize,
      p: parallelization,
    };
    const pwdTypedArray = this.encodeMessage(password);
    const key = await scryptPbkdf.scrypt(
      pwdTypedArray,
      salt,
      keylen,
      scryptParams
    );
    return key;
  }
  encodeMessage(msg: string) {
    let enc = new util.TextEncoder();
    return enc.encode(msg);
  }
  bufferToHex(arrayBuffer: ArrayBuffer): string {
    const buff = new Uint8Array(arrayBuffer);
    const hexOctets = [];
    for (let i = 0; i < buff.length; ++i)
      hexOctets.push(this.precomputedHexOctets[buff[i]]);

    return hexOctets.join('');
  }
  hexToBuffer(hex: string): ArrayBuffer {
    const hexString = hex.replace(/^0x/, '');

    // ensure even number of characters
    if (hexString.length % 2 != 0) {
      console.log(
        'WARNING: expecting an even number of characters in the hexString'
      );
    }

    // check for some non-hex characters
    const nonHexChars = hexString.match(/[G-Zg-z\s]/i);
    if (nonHexChars) {
      throw new Error('WARNING: found non-hex characters');
    }

    // split the string into pairs of octets
    const pairs = hexString.match(/[\dA-Fa-f]{2}/gi);

    // convert the octets to integers
    const integers = pairs.map(s => {
      return parseInt(s, 16);
    });

    const array = new Uint8Array(integers);
    console.log(array);

    return array.buffer;
  }
  async importKey(key: ArrayBuffer) {
    const imported = await subtle.importKey(
      'raw', //can be "jwk" or "raw"
      key,
      {
        name: 'AES-CTR',
      },
      true,
      ['encrypt', 'decrypt']
    );
    return imported;
  }

  getKeccak(key: ArrayBuffer, encryptedphrase) {
    const cutKey = new Uint8Array(key, 16, 16);
    let macBuf = new Uint8Array(16 + encryptedphrase.byteLength);
    macBuf.set(cutKey);
    macBuf.set(encryptedphrase, 16);
    const mac = sha3.keccak_256(macBuf);
    return mac;
  }

  public async encrypt(msg: string, pwd: string) {
    let encoded = this.encodeMessage(msg);
    const kdfParams: KdfParams = getDefaultKdfParams();
    const salt = getRandomValues(new Uint8Array(16));

    const key: ArrayBuffer = await this.kdfMethod(
      pwd,
      salt,
      kdfParams.keylen,
      kdfParams.N,
      kdfParams.r,
      kdfParams.p
    );
    kdfParams.salt = this.bufferToHex(salt.buffer);
    const webCryptoKey = await this.importKey(key);
    // counter will be needed for decryption
    const nonce = getRandomValues(new Uint8Array(12));
    let iv = new Uint8Array(16);
    iv.set(nonce);
    const encrypted: Uint8Array = await subtle.encrypt(
      {
        name: 'AES-CTR',
        counter: iv,
        length: 32,
      },
      webCryptoKey,
      encoded
    );
    console.log(encrypted);
    const mac = this.getKeccak(key, encrypted);
    const encryptedPhrase: Crypto = {
      ciphertext: this.bufferToHex(encrypted),
      cipherparams: {
        iv: this.bufferToHex(iv.buffer),
      },
      cipher: 'aes-256-ctr',
      kdf: 'scrypt',
      kdfparams: kdfParams,
      mac: mac,
    };
    return encryptedPhrase;
  }
  public async decrypt(msg: Crypto, pwd: string): Promise<string> {
    const kdfParams: KdfParams = getDefaultKdfParams();
    const salt = new Uint8Array(this.hexToBuffer(msg.kdfparams.salt));
    const key: ArrayBuffer = await this.kdfMethod(
      pwd,
      salt,
      kdfParams.keylen,
      kdfParams.N,
      kdfParams.r,
      kdfParams.p
    );
    kdfParams.salt = this.bufferToHex(salt.buffer);
    const webCryptoKey = await this.importKey(key);
    const iv = new Uint8Array(this.hexToBuffer(msg.cipherparams.iv));
    const text = new Uint8Array(this.hexToBuffer(msg.ciphertext));
    let decrypted = await subtle.decrypt(
      {
        name: 'AES-CTR',
        counter: iv,
        length: 32,
      },
      webCryptoKey,
      text
    );
    const decoder = new util.TextDecoder();
    const decryptedText = decoder.decode(decrypted);

    const calculateMac = this.getKeccak(key, text.buffer);
    console.log(calculateMac);
    if (calculateMac !== msg.mac) {
      throw new Error('Message Authentication Code does not match');
    }
    return decryptedText;
  }
}
