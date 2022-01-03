import sha3 from 'js-sha3';
import * as scryptPbkdf from 'scrypt-pbkdf';
import * as util from 'util';

import {HexEncoded} from '../../types/aliases';
import {EncryptedPrivateKey, KdfParams} from '../../types/types';
import {CryptoStrategy, getDefaultKdfParams} from './encryption-strategy';

export class WebCrypto implements CryptoStrategy {
  precomputedHexOctets: string[];
  getRandomValues: <T>(array: T) => T;
  subtle: SubtleCrypto;

  constructor(subtle: SubtleCrypto, getRandomValues) {
    this.precomputedHexOctets = [];
    this.subtle = subtle;
    this.getRandomValues = getRandomValues;
    for (let n = 0; n <= 0xff; ++n) {
      const hexOctet: string = n.toString(16).padStart(2, '0');
      this.precomputedHexOctets.push(hexOctet);
    }
  }
  public async getRandomBytes(length): Promise<Uint8Array> {
    return this.getRandomValues(new Uint8Array(length));
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
  bufferToHex(arrayBuffer: ArrayBuffer): HexEncoded {
    const buff = new Uint8Array(arrayBuffer);
    const hexOctets = [];
    for (let i = 0; i < buff.length; ++i)
      hexOctets.push(this.precomputedHexOctets[buff[i]]);

    return hexOctets.join('');
  }
  hexToBuffer(hex: HexEncoded): ArrayBuffer {
    const hexString = hex.replace(/^0x/, '');
    if (hexString.length % 2 != 0) {
      throw new Error('Invalid hex. Length must be a multiple of 2.');
    }
    const nonHexChars = hexString.match(/[G-Zg-z\s]/i);
    if (nonHexChars) {
      throw new Error('Invalid hex. Contains invalid characters.');
    }

    const octets = hexString.match(/[\dA-Fa-f]{2}/gi);
    const decimalNumbers = octets.map(s => {
      return parseInt(s, 16);
    });

    const array = new Uint8Array(decimalNumbers);

    return array.buffer;
  }
  async sha256(thing: any) {
    const hashBuffer = await this.subtle.digest('SHA-256', thing);
    return this.bufferToHex(hashBuffer);
  }
  async importKey(key: ArrayBuffer): Promise<globalThis.CryptoKey> {
    const imported = await this.subtle.importKey(
      'raw',
      key,
      {
        name: 'AES-CTR',
      },
      true,
      ['encrypt', 'decrypt']
    );
    return imported;
  }

  getKeccak(key: ArrayBuffer, encryptedphrase: ArrayBuffer) {
    const slicedEncKey = new Uint8Array(key, 16, 16);
    const typedArrayFromPhrase = new Uint8Array(encryptedphrase);
    const temporaryArrayBuffer = new ArrayBuffer(
      16 + typedArrayFromPhrase.byteLength
    );
    let macBytes = new Uint8Array(temporaryArrayBuffer);
    macBytes.set(slicedEncKey);
    macBytes.set(typedArrayFromPhrase, 16);
    const mac = sha3.keccak_256(macBytes);
    return mac;
  }

  public async encrypt(msg: string, pwd: string): Promise<EncryptedPrivateKey> {
    const encoded = this.encodeMessage(msg);
    const kdfParams: KdfParams = getDefaultKdfParams();
    const salt = this.getRandomValues(new Uint8Array(16));

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
    const nonce = this.getRandomValues(new Uint8Array(12));
    let iv = new Uint8Array(16);
    iv.set(nonce);
    const encrypted = await this.subtle.encrypt(
      {
        name: 'AES-CTR',
        counter: iv,
        length: 32,
      },
      webCryptoKey,
      encoded
    );
    const mac = this.getKeccak(key, encrypted);
    const encryptedPhrase: EncryptedPrivateKey = {
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
  public async decrypt(msg: EncryptedPrivateKey, pwd: string): Promise<string> {
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
    const decrypted = await this.subtle.decrypt(
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

    const recalculatedMac = this.getKeccak(key, text);
    if (recalculatedMac !== msg.mac) {
      throw new Error('Message Authentication Code does not match');
    }
    return decryptedText;
  }
}
