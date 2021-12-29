import {ProtoBuffObject, ProtoBuffType} from '../x/types/aliases';
import {MsgType} from './msg-types';
import * as pbs from './proto';

export const querySupplyRequest = (denomId?: string, owner?: string) => {
  if (!denomId && !owner)
    throw new Error('You must provide at least one param');
  const query = new pbs.nft_query_pb.QuerySupplyRequest();
  denomId ?? query.setDenomId(denomId);
  owner ?? query.setOwner(owner);
  return [query, pbs.nft_query_pb.QuerySupplyResponse];
};

export const queryOwnerRequest = (owner: string, denomId?: string) => {
  const query = new pbs.nft_query_pb.QueryOwnerRequest();
  query.setOwner(owner);
  denomId ?? query.setDenomId(denomId);
  return [query, pbs.nft_query_pb.QueryOwnerResponse];
};

export const queryCollectionRequest = (denomId: string) => {
  const query = new pbs.nft_query_pb.QueryCollectionRequest();
  query.setDenomId(denomId);
  return [query, pbs.nft_query_pb.QueryCollectionResponse];
};

export const queryDenomRequest = (denomId: string) => {
  const query = new pbs.nft_query_pb.QueryDenomRequest();
  query.setDenomId(denomId);
  return [query, pbs.nft_query_pb.QueryDenomResponse];
};

export const queryMultipleDenomsRequest = () => {
  const query = new pbs.nft_query_pb.QueryDenomsRequest();
  return [query, pbs.nft_query_pb.QueryDenomsResponse];
};

export const queryNFTRequest = (denomId: string, tokenId: string) => {
  const query = new pbs.nft_query_pb.QueryNFTRequest();
  query.setDenomId(denomId);
  query.setTokenId(tokenId);
  return [query, pbs.nft_query_pb.QueryNFTResponse];
};

export class MsgIssueDenom {
  value: MsgIssueDenomValue;
  type: MsgType;
  private static _protoBuffType: ProtoBuffType = pbs.nft_tx_pb.MsgIssueDenom;
  constructor(message: MsgIssueDenomValue) {
    this.type = MsgType.MsgIssueDenom;
    this.value = message;
  }
  static getProtoBuffType(): ProtoBuffType {
    return this._protoBuffType;
  }
  protoBuffObject(): ProtoBuffObject {
    let protoMsg = new pbs.nft_tx_pb.MsgIssueDenom();
    protoMsg.setId(this.value.id);
    protoMsg.setName(this.value.name);
    protoMsg.setSchema(this.value.schema);
    protoMsg.setSender(this.value.sender);
    return protoMsg;
  }
}

export class MsgMintNFT {
  value: NFTParams;
  type: MsgType;
  private static _protoBuffType: ProtoBuffType = pbs.nft_tx_pb.MsgMintNFT;
  constructor(message: NFTParams) {
    this.type = MsgType.MsgMintNFT;
    this.value = message;
  }
  static getProtoBuffType(): ProtoBuffType {
    return this._protoBuffType;
  }
  protoBuffObject(): ProtoBuffObject {
    let protoMsg = new pbs.nft_tx_pb.MsgMintNFT();
    protoMsg.setId(this.value.id);
    protoMsg.setDenomId(this.value.denomId);
    protoMsg.setName(this.value.name);
    protoMsg.setUri(this.value.uri);
    protoMsg.setData(this.value.data);
    protoMsg.setSender(this.value.sender);
    protoMsg.setRecipient(this.value.recipient);
    return protoMsg;
  }
}

export class MsgEditNFT {
  value: MsgEditNFTValue;
  type: MsgType;
  private static _protoBuffType: ProtoBuffType = pbs.nft_tx_pb.MsgEditNFT;
  private doNotModifyFlag: string = '[do-not-modify]';
  defaults: NFTDefaultBlankFieldValues = {
    name: this.doNotModifyFlag,
    uri: this.doNotModifyFlag,
    data: this.doNotModifyFlag,
  };
  constructor(message: MsgEditNFTValue) {
    this.type = MsgType.MsgEditNFT;
    this.value = { ...this.defaults, ...message };
  }
  static getProtoBuffType(): ProtoBuffType {
    return this._protoBuffType;
  }
  protoBuffObject(): ProtoBuffObject {
    let protoMsg = new pbs.nft_tx_pb.MsgEditNFT();
    protoMsg.setId(this.value.id);
    protoMsg.setDenomId(this.value.denomId);
    protoMsg.setSender(this.value.sender);
    protoMsg.setName(this.value.name);
    protoMsg.setUri(this.value.uri);
    protoMsg.setData(this.value.data);
    return protoMsg;
  }
}

export class MsgTransferNFT {
  value: TransferNftValue;
  type: MsgType;
  private static _protoBuffType: ProtoBuffType = pbs.nft_tx_pb.MsgTransferNFT;
  private doNotModifyFlag: string = '[do-not-modify]';
  defaults: NFTDefaultBlankFieldValues = {
    name: this.doNotModifyFlag,
    uri: this.doNotModifyFlag,
    data: this.doNotModifyFlag,
  };
  constructor(message: TransferNftValue) {
    this.type = MsgType.MsgTransferNFT;
    this.value = { ...this.defaults, ...message };
  }
  static getProtoBuffType(): ProtoBuffType {
    return this._protoBuffType;
  }
  protoBuffObject(): ProtoBuffObject {
    let protoMsg = new pbs.nft_tx_pb.MsgTransferNFT();
    protoMsg.setId(this.value.id);
    protoMsg.setDenomId(this.value.denomId);
    protoMsg.setName(this.value.name);
    protoMsg.setUri(this.value.uri);
    protoMsg.setData(this.value.data);
    protoMsg.setSender(this.value.sender);
    protoMsg.setRecipient(this.value.recipient);
    return protoMsg;
  }
}

export class MsgBurnNFT {
  value: MsgBurnNFTValue;
  type: MsgType;
  private static _protoBuffType: ProtoBuffType = pbs.nft_tx_pb.MsgBurnNFT;
  constructor(message: MsgBurnNFTValue) {
    this.type = MsgType.MsgBurnNFT;
    this.value = message;
  }
  static getProtoBuffType(): ProtoBuffType {
    return this._protoBuffType;
  }
  protoBuffObject(): ProtoBuffObject {
    let protoMsg = new pbs.nft_tx_pb.MsgBurnNFT();
    protoMsg.setId(this.value.id);
    protoMsg.setDenomId(this.value.denomId);
    protoMsg.setSender(this.value.sender);
    return protoMsg;
  }
}

export interface MsgIssueDenomValue {
  id: string;
  name: string;
  schema: string;
  sender: string;
}

export interface NFTParams {
  id: string;
  name: string;
  denomId: string;
  uri: string;
  data: string;
  sender: string;
  recipient: string;
}

export interface MsgEditNFTValue
  extends Omit<NFTParams, 'recipient' | 'name' | 'uri' | 'data'> {
  name?: string;
  uri?: string;
  data?: string;
}

export interface NFTDefaultBlankFieldValues {
  name: string;
  uri: string;
  data: string;
}

export interface TransferNftValue
  extends Omit<NFTParams, 'name' | 'uri' | 'data'> {
  name?: string;
  uri?: string;
  data?: string;
}

export interface MsgBurnNFTValue {
  id: string;
  denomId: string;
  sender: string;
}
