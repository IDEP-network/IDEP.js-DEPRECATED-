import Keyv from 'keyv';

import isNode from '../../utils/is_node';

export type WalletJson = any;
export type StorageAdapter = any;

export class PersistentStorage {
  store: StorageAdapter;
  constructor(storage) {
    this.store = storage;
  }
  async getSavedWallets() {
    const wallets = await this.store.get('wallets');
    if (!wallets) {
      return [];
    }
    return wallets;
  }
  async pickWallet(name: string): Promise<WalletJson> {
    const wallet = await this.store.get(name);
    if (!wallet) {
      throw new Error(`Wallet name ${name} not found`);
    }
    return wallet;
  }
  async saveWallet(name, wallet): Promise<boolean> {
    // TODO check async in tests
    //  TODO default namee
    const existingNames = await this.getSavedWallets();
    if (existingNames.indexOf(name) === -1) {
      await this.store.set('wallets', existingNames.concat(name));
    }
    const result = await this.store.set(name, wallet);
    return result;
  }
}

const storageFactory = () => {
  if (isNode) {
    const storage = new Keyv('sqlite://./db.sqlite', {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    });
    return new PersistentStorage(storage);
  } else {
    return new PersistentStorage(localStorage);
  }
};

export const Store = storageFactory();
