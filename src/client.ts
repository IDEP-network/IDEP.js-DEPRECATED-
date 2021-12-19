import {JsonRpc} from './communication/json-rpc';
import {HttpClient} from './communication/querying/HttpClient';
import {Auth} from './x/auth';
import {Bank} from './x/bank';
import {Nft} from './x/nft';
import {Tx} from './x/tx';
import {wallet} from './x/wallet';

class Client {
  rpc: JsonRpc;
  private _auth?: Auth;
  private _bank?: Bank;
  private _nft?: Nft;
  private _tx?: Tx;
  wallet: any;
  constructor(rpcClient: JsonRpc, wallet) {
    this.rpc = rpcClient;
    this.wallet = wallet;
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

const clientFactory = (): Client => {
  const rpcClient = new JsonRpc(HttpClient, 'http://159.89.84.111:26657');
  const client: Client = new Client(rpcClient, wallet);
  return client;
};

export default clientFactory();

export interface ClientInterface extends Client {}
