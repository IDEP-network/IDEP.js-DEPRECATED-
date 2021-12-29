import {bech32} from 'bech32';

import {EncryptedPrivateKey, EncryptedWallet} from '../../types/types';
import * as walletCreationTool from '../../utils/account';
import {CryptoStrategy, EncryptionTool} from '../../utils/crypto_strategy/crypto_strategy';
import {Bech32Address, HexEncoded} from '../types/aliases';
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
  // TODO add getters for wallet's data to check for cases when it isn't available
  publicKey: HexEncoded;
  address: string;
  name?: string;
  privateKey: EncryptedPrivateKey;
  encryptionTool: CryptoStrategy;
  store: PersistentStorage;
  constructor(encryptionTool: CryptoStrategy, store: PersistentStorage) {
    this.encryptionTool = encryptionTool;
    this.store = store;
  }
  async listSavedWallets() {
    const storedWallets = await this.store.getSavedWallets();
    return storedWallets;
  }
  async retrieveSavedWallet(name: string): Promise<WalletJson> {
    const wallet = await this.store.pickWallet(name);
    console.log(wallet);
    const { address, crypto } = wallet;
    // TODO obvious lol
    const publicKey = wallet.pub_key || wallet.publicKey;
    this.publicKey = publicKey;
    this.address = address;
    this.privateKey = crypto;
    return wallet;
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
      const randomBytes = await this.encryptionTool.getRandomBytes(12);
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
  async createNew(password: string, name?: string) {
    const walletPromise = WalletUtilities.generateWallet();
    const ramdomBytesPromise = this.encryptionTool.getRandomBytes(12);
    const promiseResults = await Promise.allSettled([
      walletPromise,
      ramdomBytesPromise,
    ]);
    const [wallet, ramdomBytes] = promiseResults.map(
      el => (el as PromiseFulfilledResult<any>).value
    );
    const { privateKey, address, mnemonic } = wallet;
    const publicKeyRaw = wallet.publicKey || wallet.pub_key;
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
    const publicKey = this.formatPublicKeyForUserInteraction(publicKeyRaw);
    return { mnemonic, publicKey, address };
  }
  async restoreFromSeed(password: string, mnemonic: string): Promise<any> {
    const wallet = await WalletUtilities.recoverFromMnemonics(mnemonic);
    return this.handleRestoredWallet(wallet, password);
  }
  async restoreFromPrivateKey(
    privKey: HexEncoded,
    password: string
  ): Promise<any> {
    const wallet = await WalletUtilities.recoverFromPrivateKey(privKey);
    return this.handleRestoredWallet(wallet, password);
  }
  async handleRestoredWallet(wallet, password) {
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
  retrievepubKeyAndAddress() {
    return {
      publicKey: this.formatPublicKeyForUserInteraction(),
      address: this.address,
    };
  }
  addAminoPrefixToPubKey(
    publicKey: HexEncoded,
    aminoPrefixHex: HexEncoded = 'EB5AE98721' // secp256k1 key type prefix
  ): Buffer {
    const pubKeyBuffer = Buffer.from(publicKey);
    const aminoPrefixBuffer = Buffer.from(aminoPrefixHex, 'hex');
    const combinedBuffers = Buffer.concat([aminoPrefixBuffer, pubKeyBuffer]);
    return combinedBuffers;
  }
  formatPublicKeyForUserInteraction(
    publicKey: HexEncoded = this.publicKey
  ): string {
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

const walletFactory = () => {
  const wallet = new Wallet(EncryptionTool, Store);
  return wallet;
};

export const wallet = walletFactory();
export interface WalletInterface extends Wallet {}
