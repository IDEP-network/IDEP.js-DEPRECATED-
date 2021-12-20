import {ClientInterface} from '../../client';
import {
  InputOrOutput,
  MsgMultiSend,
  MsgSend,
  MsgSendValue,
  queryAllBalancesRequest,
  queryBalanceRequest,
  queryParamsRequest,
  querySupplyOfRequest
} from '../../types/bank';
import {Coin, StdFee} from '../../types/types';
import {Bech32Address, HexEncoded} from '../types/aliases';

interface SendTransfer {
  recipient: Bech32Address;
  amount: Coin[];
}

export class Bank {
  client: ClientInterface;
  constructor(client: ClientInterface) {
    this.client = client;
  }
  async msgSend(
    transfer: SendTransfer,
    baseTx: {
      from: Bech32Address;
      password: string;
      pub_key?: HexEncoded;
      gas?: string | undefined;
      fee?: StdFee | undefined;
      memo?: string | 'No memes for you';
    } // TODO note
  ) {
    // TODO validate addrresses
    const value = ({
      amount: transfer.amount,
      toAddress: transfer.recipient,
      fromAddress: baseTx.from,
    } as unknown) as MsgSendValue;
    const msgs: any[] = [new MsgSend(value)];
    return this.client.tx.buildSignSend(msgs, baseTx);
  }

  async msgMultiSend(
    inputs: InputOrOutput[],
    outputs: InputOrOutput[],
    baseTx: {
      from: Bech32Address;
      pub_key: HexEncoded;
      gas?: string | undefined;
      fee?: StdFee | undefined;
      memo?: string | 'No memes for you';
    } // TODO note
  ) {
    // TODO validate addrresses
    const msgs: any[] = [new MsgMultiSend({ inputs, outputs })];
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
