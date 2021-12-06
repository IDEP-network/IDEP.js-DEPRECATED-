import {JsonRpc} from './communication/json-rpc';
import {HttpClient} from './communication/querying/HttpClient';
import {Auth} from './x/auth';
import {Bank} from './x/bank';
import {Nft} from './x/nft';

class Client {
  rpc: JsonRpc;
  private _auth?: Auth;
  private _bank?: Bank;
  private _nft?: Nft;
  constructor(rpcClient: JsonRpc, wallet: any = false) {
    if (!wallet) {
      //gen neew wallet
    }
    this.rpc = rpcClient;
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
}

const clientFactory = (): Client => {
  const rpcClient = new JsonRpc(HttpClient, 'http://142.93.65.220:26657');
  const client: Client = new Client(rpcClient);
  return client;
};

export default clientFactory();

export interface ClientInterfce extends Client {}
