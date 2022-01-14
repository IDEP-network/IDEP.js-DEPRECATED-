import {HttpClient} from '../communication/http.client';
import {JsonRpc} from '../communication/json-rpc.client';
import {RestClient, restClientFactory} from '../communication/rest-api.client';
import {StdFee} from '../types/types';
import {walletFactory, WalletInterface} from '../wallet/wallet';
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
  clientConfig: ClientInstanceConfig;
  wallet: WalletInterface;
  constructor(
    configuration: ClientInstanceConfig,
    rpcClient: JsonRpc,
    wallet: WalletInterface
  ) {
    this.clientConfig = configuration
    this.rpc = rpcClient;
    this.wallet = wallet;
  }
  get restClient(): RestClient {
    if (!this._restClient)
      this._restClient = restClientFactory(`${this.clientConfig.nodeUrl.slice(0, -5)}1317`);
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

export const createNewClient = (
  instanceConfig?: Partial<ClientInstanceConfig>
): Client => {
  console.log(process.envType);
  const configuration = {
    ...defaultClientConfig,
    ...instanceConfig,
  };
  const wallet = walletFactory(configuration.hdPath, configuration.bech32Prefix);
  const rpcClient = new JsonRpc(HttpClient, configuration.nodeUrl);
  const client: Client = new Client(configuration, rpcClient, wallet);
  return client;
};

interface ClientInstanceConfig {
  nodeUrl: string;
  chainId: string;
  fee: StdFee;
  bech32Prefix: string;
  hdPath: string;
}

const defaultClientConfig: ClientInstanceConfig = {
  nodeUrl: 'http://159.89.84.111:26657',
  chainId: 'SanfordNetwork',
  fee: {
    gas: '7000',
    amount: [{ denom: 'idep', amount: '500' }],
  },
  bech32Prefix: 'idep',
  hdPath: "m/44'/118'/0'/0/0",
};
//export default clientFactory;

export interface ClientInterface extends Client {}
