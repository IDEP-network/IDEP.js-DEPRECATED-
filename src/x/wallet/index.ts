// wallet as an interface for tx generation and signing, with actual wallets provided by the keys class.  keys  class di gets  only keyring interface, no client. wallet has to get a  wallet passed through constructor and then  it can be  interface to create txs.
import {EncryptedPrivateKey} from '../../types/types';
import * as walletCreationTool from '../../utils/account';
import {CryptoStrategy, EncryptionTool} from '../../utils/crypto_strategy/crypto_strategy';
import {HexEncoded} from '../types/aliases';

export class WalletUtilities {
  //  TO DO STORE DATA ENCRYPTED, PERSISTENT STORAGE
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
  privateKey: EncryptedPrivateKey;
  encryptionTool: CryptoStrategy;
  address: string;
  constructor(encryptionTool: CryptoStrategy) {
    this.encryptionTool = encryptionTool;
  }
  async storeWalletInMemory(password, privateKey, publicKey, address) {
    this.privateKey = await this.encryptionTool.encrypt(
      privateKey.toString('hex'),
      password
    );
    this.publicKey = publicKey.toString('hex');
    this.address = address;
  }
  async getNewWallet(password: string) {
    const wallet = await WalletUtilities.generateWallet();
    const { privateKey, publicKey, address } = wallet;
    this.storeWalletInMemory(password, privateKey, publicKey, address);
  }
  async walletFromSeed(password: string, mnemonic: string) {
    const wallet = await WalletUtilities.recoverFromMnemonics(mnemonic);
    const { privateKey, publicKey, address } = wallet;
    this.storeWalletInMemory(password, privateKey, publicKey, address);
  }
  async walleetFromPrivateKey(password: string, mnemonic?: string | undefined) {
    const wallet = await WalletUtilities.generateWallet();
    const { privateKey, publicKey, address } = wallet;
    this.storeWalletInMemory(password, privateKey, publicKey, address);
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
  const wallet = new Wallet(EncryptionTool);
  return wallet;
};

export const wallet = walletFactory();
