import {ClientInterfce} from '../../client';
import {queryAllBalancesRequest, queryBalanceRequest, queryParamsRequest, querySupplyOfRequest} from '../../types/bank';

export class Bank {
  client: ClientInterfce;
  constructor(client: ClientInterfce) {
    this.client = client;
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
