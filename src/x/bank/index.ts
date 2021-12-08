import {ClientInterfce} from '../../client';
import {
  MsgSend,
  queryAllBalancesRequest,
  queryBalanceRequest,
  queryParamsRequest,
  querySupplyOfRequest
} from '../../types/bank';
import {Coin, StdFee} from '../../types/types';
import {Bech32Address, HexEncoded} from '../types/aliases';

export class Bank {
  client: ClientInterfce;
  constructor(client: ClientInterfce) {
    this.client = client;
  }
  async msgSendTx(
    recipient: Bech32Address,
    amount: Coin[],
    baseTx: {
      from: Bech32Address;
      pub_key: HexEncoded;
      gas?: string | undefined;
      fee?: StdFee | undefined;
      memo?: string | 'No memes for you';
    } // TODO note
  ) {
    // TODO validate addrresses
    const msgs: any[] = [
      new MsgSend({ fromAddress: recipient, toAddress: baseTx.from, amount }),
    ];
    return this.client.tx.buildSignSend(msgs, baseTx);
  }
  async checkBalance(address: string, denom: string) {
    const [query, protoResponse] = queryBalanceRequest(address, denom);
    const balance = await this.client.rpc.abciQuery(
      '/cosmos.bank.v1beta1.Query/Balance', // remove emagic strings
      query,
      protoResponse
    );
    return balance;
  }
  async checkALlBalances(address: string) {
    const [query, protoResponse] = queryAllBalancesRequest(address);
    const balances = await this.client.rpc.abciQuery(
      '/cosmos.bank.v1beta1.Query/AllBalances', // remove emagic strings
      query,
      protoResponse
    );
    return balances;
  }
  async checkSupply(denom: string = 'idep') {
    const [query, protoResponse] = querySupplyOfRequest(denom);
    const denomSupply = await this.client.rpc.abciQuery(
      '/cosmos.bank.v1beta1.Query/SupplyOf', // remove emagic strings
      query,
      protoResponse
    );
    return denomSupply;
  }

  async checkParams() {
    const [query, protoResponse] = queryParamsRequest();
    const params = await this.client.rpc.abciQuery(
      '/cosmos.bank.v1beta1.Query/Params', // remove emagic strings
      query,
      protoResponse
    );
    return params;
  }
}
