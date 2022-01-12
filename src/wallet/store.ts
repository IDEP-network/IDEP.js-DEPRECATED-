import Keyv from 'keyv';

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
  console.log(process.envType);
  if (process.envType === 'browser') {
    class PersistentLocalStorage {
      get(name) {
        const value = window.localStorage.getItem(name);
        return JSON.parse(value);
      }
      set(name, value) {
        window.localStorage.setItem(name, JSON.stringify(value));
      }
    }
    return new PersistentStorage(new PersistentLocalStorage());
  } else {
    const storage = new Keyv('sqlite://./db.sqlite', {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    });
    return new PersistentStorage(storage);
  }
};

export const Store = storageFactory();

/*


interface StorageContract {
  store: StorageAdapter;
  pickWallet: (name: string) => walletJson;
  retrieveStoredWallets: () => walletJson[];
  saveWallet: (wallet: any) => boolean;
}
*/
