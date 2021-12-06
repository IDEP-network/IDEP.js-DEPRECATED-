import {ClientInterfce} from '../../client';
import {
  queryCollectionRequest,
  queryDenomRequest,
  queryMultipleDenomsRequest,
  queryNFTRequest,
  queryOwnerRequest,
  querySupplyRequest
} from '../../types/nft';

export class Nft {
  client: ClientInterfce;
  constructor(client: ClientInterfce) {
    this.client = client;
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
