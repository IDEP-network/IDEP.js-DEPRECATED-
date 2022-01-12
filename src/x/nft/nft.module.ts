import {ClientInterface} from '../../client/client';
import {Bech32Address, HexEncoded} from '../../types/aliases';
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
} from '../../types/nft-proto.types';
import {StdFee, TxDetails} from '../../types/types';

export class Nft {
  client: ClientInterface;
  constructor(client: ClientInterface) {
    this.client = client;
  }
  async msgIssueDenom(
    msgValue: MsgIssueDenomValue,
    txDetails: TxDetails
  ) {
    const msgs: any[] = [new MsgIssueDenom(msgValue)];
    return this.client.tx.buildSignSend(msgs, txDetails);
  }
  async msgMintNFT(
    msgValue: NFTParams,
    txDetails: {
      from: Bech32Address;
      pub_key: HexEncoded;
      fee?: StdFee | undefined;
      memo?: string | 'No memes for you';
    } // TODO note
  ) {
    const msgs: any[] = [new MsgMintNFT(msgValue)];
    return this.client.tx.buildSignSend(msgs, txDetails);
  }
  async msgEditNFT(
    msgValue: MsgEditNFTValue,
    txDetails: TxDetails
  ) {
    const msgs: any[] = [new MsgEditNFT(msgValue)];
    return this.client.tx.buildSignSend(msgs, txDetails);
  }

  async msgTransferNFT(
    msgValue: TransferNftValue,
    txDetails: TxDetails
  ) {
    const msgs: any[] = [new MsgTransferNFT(msgValue)];
    return this.client.tx.buildSignSend(msgs, txDetails);
  }
  async msgBurnNFT(
    msgValue: MsgBurnNFTValue,
    txDetails: TxDetails
  ) {
    const msgs: any[] = [new MsgBurnNFT(msgValue)];
    return this.client.tx.buildSignSend(msgs, txDetails);
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
