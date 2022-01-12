import {WebCrypto} from './browser.strategy';
import {CryptoStrategy} from './crypto-strategy.interface';
import {NodeCrypto} from './node.strategy';

const encryptionToolFactory = () => {
  if (process.envType === 'browser') {
    const crypto = window.crypto.subtle;
    const getRandomBytes = window.crypto.getRandomValues;
    return new WebCrypto(crypto, getRandomBytes);
  } else {
    const crypto = require('crypto') as typeof import('crypto');
    return new NodeCrypto(crypto);
  }
};

export const EncryptionTool = encryptionToolFactory();

export class WalletEncrptor {
  strategy: CryptoStrategy;
  constructor(strategy: CryptoStrategy) {
    this.strategy = strategy;
  }
  async getRandomBytes(length: number): Promise<Buffer | Uint8Array> {
    const bytes = this.strategy.getRandomBytes(length);
    return bytes;
  }

  async encrypt(message: string, password: string): Promise<any> {
    const encrypted = await this.strategy.encrypt(message, password);
    return encrypted;
  }
  async decrypt(encryptedphrase: any, password: string): Promise<string> {
    const decrypt = this.strategy.decrypt(encryptedphrase, password);
    return decrypt;
  }
}
