import {HttpClient} from '../communication/http.client';
import {JsonRpc} from '../communication/json-rpc.client';
import {RestClient, restClientFactory} from '../communication/rest-api.client';
import {StdFee} from '../types/types';
import {wallet, WalletInterface} from '../wallet/wallet';
import {Auth} from '../x/auth/auth.module';
import {Bank} from '../x/bank/bank.module';
import {Nft} from '../x/nft/nft.module';
import {Tx} from '../x/tx/tx.module';

class Client {
  rpc: JsonRpc;
  private _restClient?: RestClient;
  private _auth?: Auth;
  private _bank?: Bank;
  private _nft?: Nft;
  private _tx?: Tx;
  nodeUrl: string;
  chainId: string;
  fee: StdFee;
  wallet: WalletInterface;
  constructor(
    nodeUrl: string,
    chainId: string,
    fee: StdFee,
    rpcClient: JsonRpc,
    wallet: WalletInterface
  ) {
    this.nodeUrl = nodeUrl;
    this.chainId = chainId;
    this.fee = fee;
    this.rpc = rpcClient;
    this.wallet = wallet;
  }
  get restClient(): RestClient {
    if (!this._restClient)
      this._restClient = restClientFactory(`${this.nodeUrl.slice(0, -5)}1317`);
    return this._restClient;
  }
  get auth(): Auth {
    if (!this._auth) this._auth = new Auth(this);
    return this._auth;
  }

  get bank(): Bank {
    if (!this._bank) this._bank = new Bank(this);
    return this._bank;
  }

  get nft(): Nft {
    if (!this._nft) this._nft = new Nft(this);
    return this._nft;
  }
  get tx(): Tx {
    if (!this._tx) this._tx = new Tx(this);
    return this._tx;
  }
}

export const clientFactory = (
  instanceConfig?: Partial<ClientInstanceConfig>
): Client => {
  console.log(process.envType);
  const { nodeUrl, chainId, fee } = {
    ...defaultClientConfig,
    ...instanceConfig,
  };
  const rpcClient = new JsonRpc(HttpClient, nodeUrl);
  const client: Client = new Client(nodeUrl, chainId, fee, rpcClient, wallet);
  return client;
};

interface ClientInstanceConfig {
  nodeUrl: string;
  chainId: string;
  fee: StdFee;
}

const defaultClientConfig: ClientInstanceConfig = {
  nodeUrl: 'http://159.89.84.111:26657',
  chainId: 'SanfordNetwork',
  fee: {
    gas: '7000',
    amount: [{ denom: 'idep', amount: '500' }],
  },
};
//export default clientFactory;

export interface ClientInterface extends Client {}
