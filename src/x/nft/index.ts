import {ClientInterface} from '../../client';
import {
  MsgBurnNFT,
  MsgBurnNFTValue,
  MsgEditNFT,
  MsgEditNFTValue,
  MsgIssueDenom,
  MsgIssueDenomValue,
  MsgMintNFT,
  MsgTransferNFT,
  NFTParams,
  queryCollectionRequest,
  queryDenomRequest,
  queryMultipleDenomsRequest,
  queryNFTRequest,
  queryOwnerRequest,
  querySupplyRequest,
  TransferNftValue
} from '../../types/nft';
import {StdFee} from '../../types/types';
import {Bech32Address, HexEncoded} from '../types/aliases';

export class Nft {
  client: ClientInterface;
  constructor(client: ClientInterface) {
    this.client = client;
  }
  async msgIssueDenom(
    msgValue: MsgIssueDenomValue,
    baseTx: {
      from: Bech32Address;
      pub_key: HexEncoded;
      gas?: string | undefined;
      fee?: StdFee | undefined;
      memo?: string | 'No memes for you';
    } // TODO note
  ) {
    const msgs: any[] = [new MsgIssueDenom(msgValue)];
    return this.client.tx.buildSignSend(msgs, baseTx);
  }
  async msgMintNFT(
    msgValue: NFTParams,
    baseTx: {
      from: Bech32Address;
      pub_key: HexEncoded;
      gas?: string | undefined;
      fee?: StdFee | undefined;
      memo?: string | 'No memes for you';
    } // TODO note
  ) {
    const msgs: any[] = [new MsgMintNFT(msgValue)];
    return this.client.tx.buildSignSend(msgs, baseTx);
  }
  async msgEditNFT(
    msgValue: MsgEditNFTValue,
    baseTx: {
      from: Bech32Address;
      pub_key: HexEncoded;
      gas?: string | undefined;
      fee?: StdFee | undefined;
      memo?: string | 'No memes for you';
    } // TODO note
  ) {
    const msgs: any[] = [new MsgEditNFT(msgValue)];
    return this.client.tx.buildSignSend(msgs, baseTx);
  }

  async msgTransferNFT(
    msgValue: TransferNftValue,
    baseTx: {
      from: Bech32Address;
      pub_key: HexEncoded;
      gas?: string | undefined;
      fee?: StdFee | undefined;
      memo?: string | 'No memes for you';
    } // TODO note
  ) {
    const msgs: any[] = [new MsgTransferNFT(msgValue)];
    return this.client.tx.buildSignSend(msgs, baseTx);
  }
  async msgBurnNFT(
    msgValue: MsgBurnNFTValue,
    baseTx: {
      from: Bech32Address;
      pub_key: HexEncoded;
      gas?: string | undefined;
      fee?: StdFee | undefined;
      memo?: string | 'No memes for you';
    } // TODO note
  ) {
    const msgs: any[] = [new MsgBurnNFT(msgValue)];
    return this.client.tx.buildSignSend(msgs, baseTx);
  }

  async checkSupply(denomId?: string, owner?: string) {
    const [query, protoResponse] = querySupplyRequest(denomId, owner);
    const params = await this.client.rpc.abciQuery(
      '/idep.ion.uptake.Query/Supply', // remove emagic strings
      query,
      protoResponse
    );
    return params;
  }

  async checkOwner(owner: string, denomId?: string) {
    const [query, protoResponse] = queryOwnerRequest(owner, denomId);
    const params = await this.client.rpc.abciQuery(
      '/idep.ion.uptake.Query/Owner', // remove emagic strings
      query,
      protoResponse
    );
    return params;
  }
  async checkCollection(denomId: string) {
    const [query, protoResponse] = queryCollectionRequest(denomId);
    const params = await this.client.rpc.abciQuery(
      '/idep.ion.uptake.Query/Collection', // remove emagic strings
      query,
      protoResponse
    );
    return params;
  }

  async checkDenom(denomId: string) {
    const [query, protoResponse] = queryDenomRequest(denomId);
    const params = await this.client.rpc.abciQuery(
      '/idep.ion.uptake.Query/Denom', // remove emagic strings
      query,
      protoResponse
    );
    return params;
  }

  async checkMultipleDenoms() {
    const [query, protoResponse] = queryMultipleDenomsRequest();
    const params = await this.client.rpc.abciQuery(
      '/idep.ion.uptake.Query/Denoms', // remove emagic strings
      query,
      protoResponse
    );
    return params;
  }

  async checkNft(denomId: string, tokenId: string) {
    const [query, protoResponse] = queryNFTRequest(denomId, tokenId);
    const params = await this.client.rpc.abciQuery(
      '/idep.ion.uptake.Query/NFT', // remove emagic strings
      query,
      protoResponse
    );
    return params;
  }
}
