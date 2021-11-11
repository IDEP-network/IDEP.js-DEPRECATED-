/*
let crypto;
try {
  crypto = await import('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}
*/

export interface CryptoStrategy {
  getRandomBytes(length: number): Promise<Buffer | Uint8Array>;
  kdfMethod(
    password: string,
    salt: string | any
  ): Promise<Buffer | ArrayBuffer>;
  encrypt(message: string, password: string): Promise<any>;
  decrypt(encryptedphrase: any, password: string): Promise<string>;
}

export class WalletEncrptor {
  strategy: CryptoStrategy;
  constructor(strategy: CryptoStrategy) {
    this.strategy = strategy;
  }
  async getRandomBytes(length: number): Promise<Buffer | Uint8Array> {
    const bytes = await this.strategy.getRandomBytes(length);
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
