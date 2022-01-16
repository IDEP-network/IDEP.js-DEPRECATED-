import { WebCrypto } from './browser.strategy';
import { CryptoStrategy } from './crypto-strategy.interface';
import { NodeCrypto } from './node.strategy';

declare global {
  interface Window {
    getRandom:<T>(array: T) => T;
  }
}

const encryptionToolFactory = () => {
  if (process.envType === 'browser') {
    const crypto = window.crypto.subtle;
    window.getRandom = window.crypto.getRandomValues;
    return new WebCrypto(crypto);
  } else if (process.envType === 'react-native') {
    const crypto = require('isomorphic-webcrypto');
    (async () => {
      await crypto.ensureSecure();
      window.getRandom = crypto.getRandomValues;
    })(); // 70% chancee it'll work
    return new WebCrypto(crypto.subtle);
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
