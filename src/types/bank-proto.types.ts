import {GeneralTxTools} from '../x/tx/general-tx.tools';
import {Bech32Address, ProtoBufObject, ProtoBufType} from './aliases';
import {MsgType} from './msg.types';
import * as pbs from './proto';
import {Coin} from './types';

export const queryBalanceRequest = (
  address: string,
  denom: string = 'idep'
) => {
  const query = new pbs.bank_query_pb.QueryBalanceRequest();
  query.setAddress(address);
  query.setDenom(denom);
  return [query, pbs.bank_query_pb.QueryBalanceResponse];
};

export const queryAllBalancesRequest = (address: string) => {
  const query = new pbs.bank_query_pb.QueryAllBalancesRequest();
  query.setAddress(address);
  return [query, pbs.bank_query_pb.QueryAllBalancesResponse];
};

export const querySupplyOfRequest = (denom: string) => {
  const query = new pbs.bank_query_pb.QuerySupplyOfRequest();
  query.setDenom(denom);
  return [query, pbs.bank_query_pb.QuerySupplyOfResponse];
};

export const queryParamsRequest = () => {
  const query = new pbs.bank_query_pb.QueryParamsRequest();
  return [query, pbs.bank_query_pb.QueryParamsResponse];
};

export class MsgSend {
  value: MsgSendValue;
  type: MsgType;
  private static _protoBuffType: ProtoBufType = pbs.bank_tx_pb.MsgSend;
  constructor(message: MsgSendValue) {
    this.type = MsgType.MsgSend;
    this.value = message;
  }
  static getProtoBuffType(): ProtoBufType {
    return this._protoBuffType;
  }
  protoBuffObject(): ProtoBufObject {
    let protoMsg = new pbs.bank_tx_pb.MsgSend();
    protoMsg.setFromAddress(this.value.fromAddress);
    protoMsg.setToAddress(this.value.toAddress);
    this.value.amount.forEach(el => {
      protoMsg.addAmount(GeneralTxTools.createCoin(el));
    });
    return protoMsg;
  }
}

export class MsgMultiSend {
  value: MsgMultiSendValue;
  type: MsgType;
  private static _protoBuffType: ProtoBufType = pbs.bank_tx_pb.MsgMultiSend;
  constructor(message: MsgMultiSendValue) {
    this.type = MsgType.MsgMultiSend;
    this.value = message;
  }
  static getProtoBuffType(): ProtoBufType {
    return this._protoBuffType;
  }
  protoBuffObject(): ProtoBufObject {
    let protoMsg = new pbs.bank_tx_pb.MsgMultiSend();
    this.value.inputs.forEach(el => {
      let input = new pbs.bank_tx_pb.Input();
      input.setAddress(el.address);
      el.coins.forEach(coin => {
        input.addCoins(GeneralTxTools.createCoin(coin));
      });
      protoMsg.addOutputs(input);
    });
    this.value.outputs.forEach(el => {
      let output = new pbs.bank_tx_pb.Output();
      output.setAddress(el.address);
      el.coins.forEach(coin => {
        output.addCoins(GeneralTxTools.createCoin(coin));
      });
      protoMsg.addOutputs(output);
    });
    return protoMsg;
  }
}

export interface InputOrOutput {
  address: Bech32Address;
  coins: Coin[];
}

export interface MsgSendValue {
  fromAddress: Bech32Address;
  toAddress: Bech32Address;
  amount: Coin[];
}

export interface MsgMultiSendValue {
  inputs: InputOrOutput[];
  outputs: InputOrOutput[];
}
