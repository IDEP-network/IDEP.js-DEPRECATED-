import {EncryptedPrivateKey, EncryptedWallet} from '../../types/types';
import * as walletCreationTool from '../../utils/account';
import {CryptoStrategy, EncryptionTool} from '../../utils/crypto_strategy/crypto_strategy';
import {HexEncoded} from '../types/aliases';
import {PersistentStorage, Store, WalletJson} from './store';

export class WalletUtilities {
  static async generateWallet() {
    const mnemonic = await walletCreationTool.generateMnemonic();
    const {
      privateKey,
      publicKey,
      address,
    } = await WalletUtilities.generateFromSeed(mnemonic);
    return { mnemonic, privateKey, publicKey, address };
  }
  static async recoverFromMnemonics(mnemonic: string) {
    return WalletUtilities.generateFromSeed(mnemonic);
  }
  static async generateFromSeed(mnemonic: string) {
    const privateKey = await walletCreationTool.generatePrivateKeyFromMnemonic(
      mnemonic
    );
    const publicKey = walletCreationTool.derivePublicKeyFromPrivateKey(
      privateKey
    );
    const address = await walletCreationTool.getAddressFromPublicKey(publicKey);
    return { privateKey, publicKey, address };
  }
  static async recoverFromPrivateKey(privateKey: string) {
    const publicKey = walletCreationTool.derivePublicKeyFromPrivateKey(
      Buffer.from(privateKey, 'hex')
    );
    const address = await walletCreationTool.getAddressFromPublicKey(publicKey);
    return { privateKey, publicKey, address };
  }
}

export class Wallet {
  publicKey: HexEncoded;
  address: string;
  privateKey: EncryptedPrivateKey;
  encryptionTool: CryptoStrategy;
  storedWalletsNames: string[];
  store: PersistentStorage;
  constructor(encryptionTool: CryptoStrategy, store: PersistentStorage) {
    this.encryptionTool = encryptionTool;
    this.store = store;
  }
  async loadFromStore() {
    const storedWallets = await this.store.getSavedWallets();
    this.storedWalletsNames = storedWallets;
    return storedWallets;
  }
  async retrieveWalletFromStore(name: string): Promise<WalletJson> {
    const wallet = await this.store.pickWallet(name);
    const { pub_key, address, crypto } = wallet;
    this.publicKey = pub_key;
    this.address = address;
    this.privateKey = crypto;
    return wallet;
  }

  async storeWalletInMemory(password, privateKey, publicKey, address) {
    this.privateKey = await this.encryptionTool.encrypt(
      privateKey.toString('hex'),
      password
    );
    this.publicKey = publicKey.toString('hex');
    this.address = address;
  }
  async persistWallet(name: string) {
    const ramdomBytes = await this.encryptionTool.getRandomBytes(12);
    const encryptedWallet: EncryptedWallet = {
      name,
      id: Buffer.from(ramdomBytes).toString('hex'),
      pub_key: this.publicKey,
      address: this.address,
      crypto: this.privateKey,
    };
    await this.store.saveWallet(name, encryptedWallet);
  }
  async getNewWallet(password: string) {
    const wallet = await WalletUtilities.generateWallet();
    const { privateKey, publicKey, address } = wallet;
    await this.storeWalletInMemory(password, privateKey, publicKey, address);
  }
  async walletFromSeed(password: string, mnemonic: string) {
    const wallet = await WalletUtilities.recoverFromMnemonics(mnemonic);
    const { privateKey, publicKey, address } = wallet;
    await this.storeWalletInMemory(password, privateKey, publicKey, address);
  }
    const wallet = await WalletUtilities.generateWallet();
  async walletFromPrivateKey(privKey: HexEncoded, password: string) {
    const wallet = await WalletUtilities.recoverFromPrivateKey(privKey);
    const { privateKey, publicKey, address } = wallet;
    console.log('2 ', privateKey);
    await this.storeWalletInMemory(password, privateKey, publicKey, address);
  }
  async retrieveKeys(password: string) {
    const privateKey = await this.encryptionTool.decrypt(
      this.privateKey,
      password
    );
    return { privateKey, publicKey: this.publicKey, address: this.address };
  }
  retrievepubKeyAndAddress() {
    return { publicKey: this.publicKey, address: this.address };
  }
}

const walletFactory = () => {
  const wallet = new Wallet(EncryptionTool, Store);
  return wallet;
};

export const wallet = walletFactory();
