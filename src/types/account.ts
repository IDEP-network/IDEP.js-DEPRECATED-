export interface KeyPair {
  private: string | Buffer | Uint8Array;
  public: string | Buffer | Uint8Array;
}

export interface Wallet {
  keys: KeyPair;
  address: string;
}

export interface KeyRing {
 Keys: KeyPair[]
 // add things
}
