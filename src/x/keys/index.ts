import {v4 as uuid} from 'uuid';

import {EncryptedWallet} from '../../types/types';
import * as crypto from '../../utils/crypto';

const Keyv = require('keyv');
const KeyvFile = require('keyv-file').KeyvFile;

// work in progress
class Keys {
  private client: any;
  constructor(client) {
    this.client = client;
  }
  async createWallet(name: string, password: string): Promise<EncryptedWallet> {
    const mnemonic = await crypto.generateMnemonic();
    // output mnemonic somehow to the user
    const newWallet: EncryptedWallet = await this.getWalletFromMnemonic(
      mnemonic,
      password,
      name
    );
    return newWallet;
  }
  async recoverWallet(
    mnemonic: string,
    password: string,
    name: string
  ): Promise<EncryptedWallet> {
    const recoveredWallet: EncryptedWallet = await this.getWalletFromMnemonic(
      mnemonic,
      password,
      name
    );
    return recoveredWallet;
  }
  async getWalletFromMnemonic(
    mnemonic: string,
    password: string,
    name: string
  ): Promise<EncryptedWallet> {
    if (!name) {
      throw new Error('Name of the wallet can not be empty');
    }
    if (!password) {
      throw new Error('Password of the wallet can not be empty');
    }
    const privateKey: Buffer = await crypto.generatePrivateKeyFromMnemonic(
      mnemonic
    );
    const publicKey: Buffer = crypto.derivePublicKeyFromPrivateKey(privateKey);
    const address: string = crypto.getAddressFromPublicKey(publicKey);
    const encryptedPrivateKey = await crypto.aesEncryptScrypt(
      privateKey.toString('hex'),
      password
    );
    const wallet: EncryptedWallet = {
      version: 1,
      id: uuid(),
      address,
      pub_key: publicKey.toString('hex'),
      crypto: encryptedPrivateKey,
    };
    this.client.keyring.write(name, wallet);
    return wallet;
  }
  // TO-DO add support for importing keys from another keystore. add support for exporting keystores.
  async importPrivateKey(name: string, password: string, privateKey: string) {
    const publicKey: Buffer = crypto.derivePublicKeyFromPrivateKey(
      Buffer.from(privateKey, 'hex')
    );
    const address: string = crypto.getAddressFromPublicKey(publicKey);
    const encryptedPrivateKey = await crypto.aesEncryptScrypt(
      privateKey,
      password
    );
    const wallet: EncryptedWallet = {
      version: 1,
      id: uuid(),
      address,
      pub_key: publicKey.toString('hex'),
      crypto: encryptedPrivateKey,
    };
    this.client.keyring.write(name, wallet);
    return wallet;
  }
  async delete(name: string, password: string) {
    if (!name) {
      throw new Error('Name of the wallet cannot be empty');
    }
    if (!password) {
      throw new Error('Name of the wallet cannot be empty');
    }
    const wallet = this.client.keyring.read(name);
    if (!wallet) {
      throw new Error(`Wallet  named  ${name} not found`);
    }
    const decryptedPrivateKey = await crypto.aesDecryptScrypt(
      wallet.crypto,
      password
    ); // throws if mac doesn't check out
    if (!decryptedPrivateKey) throw new Error('Wallet cannot  be decrypted');
    this.client.keyring.delete(name);
  }
  show(name: string) {
    if (!name) {
      throw new Error('Name of the wallet can not be empty');
    }
    const wallet = this.client.keyRing.read(name);
    if (!wallet) {
      throw new Error(`Wallet named ${name} not found`);
    }
    return wallet.address;
  }
}
export default Keys;
