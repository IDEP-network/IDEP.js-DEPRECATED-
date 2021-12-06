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
