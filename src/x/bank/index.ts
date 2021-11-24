import {Coin} from '../../types/types';

type Client = any; // TO DO
export class Bank {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }
  async checkBalance(address: string, denom: string) {
    const result: Balance = await this.client.queryClient.requestData(
      'cosmos/bank/v1beta1/balances/',
      `${address}/${denom}`
    );
    return result;
  }
  async checkALlBalances(address: string) {
    const result: AllBalances = await this.client.queryClient.requestData(
      'cosmos/bank/v1beta1/balances/',
      address
    );
    return result;
  }
  async checkSupply(denom: string = 'idep') {
    const result: Supply = await this.client.queryClient.requestData(
      'cosmos/bank/v1beta1/supply',
      denom
    );
    return result;
  }
}

type Supply = {
  supply: Coin;
};

type Balance = {
  balance: Coin;
};

type AllBalances = {
  balances: Coin[];
};
