import {Bech32Address, HexEncoded} from '..';
import * as walletCreationTool from './wallet.helper';

export class WalletTools {
  static async generateWallet(): Promise<WalletRaw> {
    const mnemonic = await walletCreationTool.generateMnemonic();
    const {
      privateKey,
      publicKey,
      address,
    } = await WalletTools.generateFromSeed(mnemonic);
    return { mnemonic, privateKey, publicKey, address };
  }
  static async recoverFromMnemonics(mnemonic: string): Promise<WalletRaw> {
    return WalletTools.generateFromSeed(mnemonic);
  }
  static async generateFromSeed(mnemonic: string): Promise<WalletRaw> {
    const privateKey = await walletCreationTool.generatePrivateKeyFromMnemonic(
      mnemonic
    );
    const publicKey = walletCreationTool.derivePublicKeyFromPrivateKey(
      privateKey
    );
    const address = walletCreationTool.getAddressFromPublicKey(publicKey);
    return { privateKey, publicKey, address };
  }
  static async recoverFromPrivateKey(
    privateKeyHex: HexEncoded
  ): Promise<WalletRaw> {
    const privateKey = Buffer.from(privateKeyHex, 'hex');
    const publicKey = walletCreationTool.derivePublicKeyFromPrivateKey(
      privateKey
    );
    const address = walletCreationTool.getAddressFromPublicKey(publicKey);
    return { privateKey, publicKey, address };
  }
}

export interface WalletRaw {
  mnemonic?: string;
  address: Bech32Address;
  privateKey: Buffer;
  publicKey: Buffer;
}
