export interface KeyPair {
 private:  Buffer;
 public: Buffer;
}

export interface Wallet {
 keys: KeyPair;
 address: string;
 mnemonic: any;
}

export interface KeyRing {
 Keys: KeyPair[];
 write(name: string, key: Wallet): void;
 read(name: string): Wallet;

 // add things
}
