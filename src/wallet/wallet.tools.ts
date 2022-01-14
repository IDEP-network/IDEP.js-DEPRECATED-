import {Bech32Address, HexEncoded} from '..';
import * as walletCreationTool from './wallet.helper';

export class WalletTools {
  static async generateWallet(hdPath: string, bech32Prefix: string): Promise<WalletRaw> {
    const mnemonic = await walletCreationTool.generateMnemonic();
    const {
      privateKey,
      publicKey,
      address,
    } = await WalletTools.generateFromSeed(mnemonic, hdPath, bech32Prefix);
    return { mnemonic, privateKey, publicKey, address };
  }
  static async recoverFromMnemonics(mnemonic: string, hdPath: string, bech32Prefix: string): Promise<WalletRaw> {
    return WalletTools.generateFromSeed(mnemonic, hdPath, bech32Prefix);
  }
  static async generateFromSeed(mnemonic: string, hdPath: string, bech32Prefix: string): Promise<WalletRaw> {
    const privateKey = await walletCreationTool.generatePrivateKeyFromMnemonic(
      mnemonic,
      hdPath
    );
    const publicKey = walletCreationTool.derivePublicKeyFromPrivateKey(
      privateKey
    );
    const address = walletCreationTool.getAddressFromPublicKey(publicKey, bech32Prefix);
    return { privateKey, publicKey, address };
  }
  static async recoverFromPrivateKey(
    privateKeyHex: HexEncoded,
    bech32Prefix: string
  ): Promise<WalletRaw> {
    const privateKey = Buffer.from(privateKeyHex, 'hex');
    const publicKey = walletCreationTool.derivePublicKeyFromPrivateKey(
      privateKey
    );
    const address = walletCreationTool.getAddressFromPublicKey(publicKey, bech32Prefix);
    return { privateKey, publicKey, address };
  }
}

export interface WalletRaw {
  mnemonic?: string;
  address: Bech32Address;
  privateKey: Buffer;
  publicKey: Buffer;
}
