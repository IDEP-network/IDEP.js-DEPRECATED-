import {JsonRpc} from './communication/json-rpc';
import {HttpClient} from './communication/querying/HttpClient';
import {Auth} from './x/auth';
import {Bank} from './x/bank';
import {Nft} from './x/nft';
import {Tx} from './x/tx';
import {wallet, WalletInterface} from './x/wallet';

class Client {
  rpc: JsonRpc;
  private _auth?: Auth;
  private _bank?: Bank;
  private _nft?: Nft;
  private _tx?: Tx;
  wallet: WalletInterface;
  constructor(rpcClient: JsonRpc, wallet: WalletInterface) {
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

const clientFactory = (nodeUrl: string): Client => {
  const rpcClient = new JsonRpc(HttpClient, nodeUrl);
  const client: Client = new Client(rpcClient, wallet);
  return client;
};

export default clientFactory;

export interface ClientInterface extends Client {}
