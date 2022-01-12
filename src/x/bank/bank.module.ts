import {ClientInterface} from '../../client/client';
import {Bech32Address} from '../../types/aliases';
import {
  InputOrOutput,
  MsgMultiSend,
  MsgSend,
  MsgSendValue,
  queryAllBalancesRequest,
  queryBalanceRequest,
  queryBankParamsRequest,
  querySupplyOfRequest
} from '../../types/bank-proto.types';
import {Coin, TxDetails} from '../../types/types';

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
    txDetails: TxDetails
  ) {
    // TODO validate addrresses
    const value = ({
      amount: transfer.amount,
      toAddress: transfer.recipient,
      fromAddress: txDetails.from,
    } as unknown) as MsgSendValue;
    const msgs: any[] = [new MsgSend(value)];
    return this.client.tx.buildSignSend(msgs, txDetails);
  }

  async msgMultiSend(
    inputs: InputOrOutput[],
    outputs: InputOrOutput[],
    txDetails: TxDetails
  ) {
    // TODO validate addrresses
    const msgs: any[] = [new MsgMultiSend({ inputs, outputs })];
    return this.client.tx.buildSignSend(msgs, txDetails);
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
    const [query, protoResponse] = queryBankParamsRequest();
    const params = await this.client.rpc.abciQuery(
      '/cosmos.bank.v1beta1.Query/Params', // remove emagic strings
      query,
      protoResponse
    );
    return params;
  }
}
