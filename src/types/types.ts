import {Bech32Address, HexEncoded} from './aliases';

export interface JsonRpcResponse {
  id: string | number;
  jsonrpc: string;
  result: any | JsonRpcError;
  isSuccessful: boolean;
}

export interface JsonRpcError {
  code: number;
  message: string;
  data: string;
}

export interface JsonRpcRequest {
  id: string | number;
  jsonrpc: string;
  method: string;
  params: any;
}

export interface AbciQuery {
  // query actor's path
  path: string;
  // use a given height to query state at
  height?: string;
}

export interface AbciQueryRequest {
  data?: string;
  query: AbciQuery;
}

export interface AbciQueryResponse {
  response: AbciQueryResponseValue;
  query: AbciQuery;
}

export interface AbciQueryResponseValue {
  value: string;
  code: number;
  log: string;
  codespace: string;
}

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
    pub_key?: HexEncoded;
    fee?: StdFee;
    memo?: string;

}

export interface BaseTx {
  from: string;
  account_number: string;
  memo?: string;
  chain_id: string;
  sequence: string;
  gas: string;
  gas_adjustment: string;
  fees: Coin;
  simulate: boolean;
}

export interface StdMessageSignature extends TxSignatureMeta {
  fee: StdFee;
  memo: string;
  messages: Message[];
}

export interface StdSignature {
  signature: any;
  pub_key: any;
}

export interface Tx {
  message: Message[];
  fee: StdFee;
  memo: string;
}

export interface StdTx extends Tx {
  signatures?: StdSignature[];
}

export interface AesEncryptedPhrase {
  ciphertext: string;
  iv: string;
  salt: string;
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

export interface TxMeta {
  memo: string;
  chainId: string;
  accountNumber: string;
  sequence: string;
}
