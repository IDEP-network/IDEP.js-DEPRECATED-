import {bech32} from 'bech32';

import {CryptoStrategy} from '../cryptography/encryption/crypto-strategy.interface';
import {EncryptionTool} from '../cryptography/encryption/encryption-strategy';
import {Bech32Address, Bech32PublicKey, HexEncoded} from '../types/aliases';
import {EncryptedPrivateKey, EncryptedWallet} from '../types/types';
import {PersistentStorage, Store, WalletJson} from './store';
import {WalletRaw, WalletTools} from './wallet.tools';

if (process.envType === 'browser') {
  var Buffer = require('buffer/').Buffer;
} else {
  var Buffer = require('buffer').Buffer;
}
interface WalletDataForUser {
  address: Bech32Address;
  publicKey: Bech32PublicKey;
  mnemonic?: string;
}

export class Wallet {
  // TODO add getters for wallet's data to check for cases when it isn't available
  publicKey: HexEncoded;
  address: string;
  name?: string;
  privateKey: EncryptedPrivateKey;
  encryptionTool: CryptoStrategy;
  store: PersistentStorage;
  bech32Prefix: string;
  hdPath: string;
  constructor(encryptionTool: CryptoStrategy, store: PersistentStorage, hdPath: string, bech32Prefix: string) {
    this.encryptionTool = encryptionTool;
    this.store = store;
    this.hdPath = hdPath;
    this.bech32Prefix = bech32Prefix;
  }
  async listSavedWallets(): Promise<string[]> {
    const storedWallets = await this.store.getSavedWallets();
    return storedWallets;
  }
  async retrieveSavedWallet(name: string): Promise<WalletJson> {
    const wallet = await this.store.pickWallet(name);
    const { address, crypto, publicKey } = wallet;
    this.publicKey = publicKey;
    this.address = address;
    this.privateKey = crypto;
    return { publicKey, address };
  }

  async storeWalletInMemory(
    privateKey: EncryptedPrivateKey,
    publicKey: HexEncoded,
    address: Bech32Address,
    name?: string
  ): Promise<void> {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
    this.address = address;
    this.name = name || address;
  }
  async persistWallet(
    name?: string,
    encryptedWallet?: EncryptedWallet
  ): Promise<void> {
    if (!encryptedWallet) {
      const randomBytes = this.encryptionTool.getRandomBytes(12);
      encryptedWallet = {
        name: name || this.address,
        id: Buffer.from(randomBytes).toString('hex'),
        publicKey: this.publicKey,
        address: this.address,
        crypto: this.privateKey,
      };
    }
    await this.store.saveWallet(encryptedWallet.name, encryptedWallet);
  }
  async createNew(password: string, name?: string): Promise<WalletDataForUser> {
    const wallet = await WalletTools.generateWallet(this.hdPath, this.bech32Prefix);
    const ramdomBytes = this.encryptionTool.getRandomBytes(12);
    const { privateKey, address, mnemonic } = wallet;
    const publicKeyRaw = wallet.publicKey;
    const encryptedPrivate = await this.encryptionTool.encrypt(
      privateKey.toString('hex'),
      password
    );
    const encryptedWallet: EncryptedWallet = {
      name: name || this.address,
      id: Buffer.from(ramdomBytes).toString('hex'),
      publicKey: publicKeyRaw.toString('hex'),
      address: address,
      crypto: encryptedPrivate,
    };
    const storePromise = this.storeWalletInMemory(
      encryptedWallet.crypto,
      encryptedWallet.publicKey,
      encryptedWallet.address,
      encryptedWallet.name
    );
    const persistPromise = this.persistWallet(
      encryptedWallet.name,
      encryptedWallet
    );
    await Promise.all([storePromise, persistPromise]);
    const publicKey = this.formatPublicKeyForUserInteraction(
      publicKeyRaw.toString('hex')
    );
    return { mnemonic, publicKey, address };
  }
  async restoreWithSeed(
    mnemonic: string,
    password: string
  ): Promise<WalletDataForUser> {
    const wallet = await WalletTools.recoverFromMnemonics(mnemonic, this.hdPath, this.bech32Prefix);
    return this.handleRestoredWallet(wallet, password);
  }
  async restoreWithPrivateKey(
    privKey: HexEncoded,
    password: string
  ): Promise<WalletDataForUser> {
    const wallet = await WalletTools.recoverFromPrivateKey(privKey, this.bech32Prefix);
    return this.handleRestoredWallet(wallet, password);
  }
  async handleRestoredWallet(
    wallet: WalletRaw,
    password: string
  ): Promise<WalletDataForUser> {
    const { privateKey, publicKey: publicKeyRaw, address } = wallet;
    const encryptedPrivate = await this.encryptionTool.encrypt(
      privateKey.toString('hex'),
      password
    );
    const publicKey = this.formatPublicKeyForUserInteraction(
      publicKeyRaw.toString('hex')
    );
    await this.storeWalletInMemory(
      encryptedPrivate,
      publicKeyRaw.toString('hex'),
      address
    );
    return { publicKey, address };
  }
  async getPrivateKey(password: string) {
    const privateKey = await this.encryptionTool.decrypt(
      this.privateKey,
      password
    );
    return privateKey;
  }
  retrievepubKeyAndAddress(): WalletDataForUser {
    return {
      publicKey: this.formatPublicKeyForUserInteraction(),
      address: this.address,
    };
  }
  addAminoPrefixToPubKey(
    publicKey: HexEncoded,
    aminoPrefixHex: HexEncoded = 'EB5AE98721' // secp256k1 key type prefix
  ): Buffer {
    const pubKeyBuffer = Buffer.from(publicKey, 'hex');
    const aminoPrefixBuffer = Buffer.from(aminoPrefixHex, 'hex');
    const combinedBuffers = Buffer.concat([aminoPrefixBuffer, pubKeyBuffer]);
    return combinedBuffers;
  }
  formatPublicKeyForUserInteraction(
    publicKey: HexEncoded = this.publicKey
  ): Bech32PublicKey {
    const aminoPrefixedPubKey: Buffer = this.addAminoPrefixToPubKey(publicKey);
    const words = bech32.toWords(aminoPrefixedPubKey);
    const encodedPublicKey = bech32.encode('ideppub', words, 200);
    return encodedPublicKey;
  }
  bech32EncodePublicKey(publicKey: HexEncoded = this.publicKey): Buffer {
    const aminoPrefixedPubKey: Buffer = this.addAminoPrefixToPubKey(publicKey);
    return Buffer.from(bech32.toWords(aminoPrefixedPubKey));
  }
}

export const walletFactory = (bech32Prefix: string, hdPath: string) => {
  const wallet = new Wallet(EncryptionTool, Store, bech32Prefix, hdPath);
  return wallet;
};

export interface WalletInterface extends Wallet { }
