import {Bech32Address, HexEncoded} from './aliases';


export interface Coin {
  denom: string;
  amount: string;
}

export interface StdFee {
  amount: Coin[];
  gas: any;
}

export interface Message {
  type: string;
  value: any;
}

export interface TxSignatureMeta {
  account_number: string;
  chain_id: string;
  sequence: string;
}

export interface TxDetails {
  from: Bech32Address;
  password: string;
  publicKey?: HexEncoded;
  fee?: StdFee;
  memo?: string;
  simulate?: boolean;
}

export interface StdSignature {
  signature: any;
  pub_key: any;
}

export interface KdfParams {
  salt?: string;
  keylen: number;
  // cost
  N: number;
  // blocksize
  r: number;
  // parallelization
  p: number;
}

export interface CipherParams {
  iv: string;
}

export interface EncryptedPrivateKey {
  ciphertext: HexEncoded;
  cipherparams: CipherParams;
  cipher: string;
  kdf: string;
  kdfparams: KdfParams;
  mac: HexEncoded;
}

export interface EncryptedWallet {
  version?: number;
  name: string;
  id: string;
  publicKey: string;
  address: string;
  crypto: EncryptedPrivateKey;
}
