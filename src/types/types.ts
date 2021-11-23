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
  gas: string;
}

export interface Message {
  type: string;
  value: any;
}

export interface TxSignatureMeta {
  accountNumber: string;
  chainId: string;
  sequence: string;
}

export interface StdMessageSignature extends TxSignatureMeta {
  fee: StdFee;
  memo: string;
  messages: Message[];
}

export interface StdSignature {
  signature: any;
  publicKey: any;
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
export interface Crypto {
  ciphertext: string;
  cipherparams: CipherParams;
  cipher: string;
  kdf: string;
  kdfparams: KdfParams;
  mac: string;
}

export interface EncryptedWallet {
  version: number;
  id: string;
  address: string;
  crypto: Crypto;
}
