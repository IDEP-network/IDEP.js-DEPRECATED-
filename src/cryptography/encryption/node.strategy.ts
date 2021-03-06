import sha3 from 'js-sha3';

import {HexEncoded} from '../../types/aliases';
import {EncryptedPrivateKey, KdfParams} from '../../types/types';
import {getDefaultKdfParams} from '../../utils/default-kdf-params';
import {CryptoStrategy} from './crypto-strategy.interface';

export class NodeCrypto implements CryptoStrategy {
  private crypto: any;
  constructor(crypto: any) {
    this.crypto = crypto;
  }
  getRandomBytes(length: number): Buffer {
    return this.crypto.randomBytes(length);
  }
  public async kdfMethod(
    password: string,
    salt: Buffer,
    keylen: number = 32,
    cost: number = 16384,
    blocksize: number = 8,
    parallelization: number = 1
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const passwordBuffer = Buffer.from(password);
      this.crypto.scrypt(
        passwordBuffer,
        salt,
        keylen,
        { N: cost, r: blocksize, p: parallelization },
        (err, derivedKey) => {
          if (err) reject(err);
          else resolve(derivedKey);
        }
      );
    });
  }
  getKeccak(key: Buffer, encryptedphrase: string): string {
    return sha3.keccak_256(
      Buffer.concat([key.slice(16, 32), Buffer.from(encryptedphrase, 'hex')])
    );
  }
  public async encrypt(msg: string, pwd: string): Promise<EncryptedPrivateKey> {
    const kdfParams: KdfParams = getDefaultKdfParams();
    const nonce: Buffer = this.getRandomBytes(12);
    const salt: Buffer = this.getRandomBytes(16);
    const key: Buffer = await this.kdfMethod(
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

    const encrypted: HexEncoded = this.aesEncrypt(msg, key, iv);

    const mac = this.getKeccak(key, encrypted);
    const encryptedPhrase: EncryptedPrivateKey = {
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
  }
  aesEncrypt(msg: string, key: Buffer, iv: Buffer): HexEncoded {
    let cipher = this.crypto.createCipheriv('aes-256-ctr', key, iv);
    const encrypted: string =
      cipher.update(msg.toString(), 'utf8', 'hex') + cipher.final('hex');
    return encrypted;
  }
  public async decrypt(msg: EncryptedPrivateKey, pwd: string): Promise<string> {
    const { ciphertext, cipherparams, kdfparams, mac } = msg;

    const key: Buffer = await this.kdfMethod(
      pwd,
      Buffer.from(kdfparams.salt, 'hex'),
      kdfparams.keylen,
      kdfparams.N,
      kdfparams.r,
      kdfparams.p
    );
    const recalculatedMac = this.getKeccak(key, ciphertext);
    if (recalculatedMac !== mac)
      throw new Error('Message Authentication Code does not match');
    let iv: Buffer = Buffer.from(cipherparams.iv, 'hex');
    let decipher = this.crypto.createDecipheriv('aes-256-ctr', key, iv);
    const decryptedText: string =
      decipher.update(ciphertext, 'hex', 'utf8') + decipher.final('utf8');
    return decryptedText;
  }
}
