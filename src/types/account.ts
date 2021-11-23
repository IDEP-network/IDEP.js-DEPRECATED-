import {EncryptedWallet} from './types';

export interface KeyPair {
  private: Buffer;
  public: Buffer;
}

export interface Wallet {
  keys: KeyPair;
  address: string;
  mnemonic: any;
}

export interface KeyRing {
  wallets: EncryptedWallet[]; // regular json keystore files
  write(name: string, value: EncryptedWallet): void;
  read(name: string): EncryptedWallet;
  delete(name: string): void;
}
