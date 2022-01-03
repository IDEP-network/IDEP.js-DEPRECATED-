import * as pbs from './proto';

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

export const queryAccountRequest = (address: string) => {
  const query = new pbs.auth_query_pb.QueryAccountRequest();
  query.setAddress(address);
  return [
    query,
    pbs.auth_query_pb.QueryAccountResponse,
    pbs.auth_auth_pb.BaseAccount,
    pbs.crypto_secp256k1_keys_pb.PubKey,
  ];
};

export const queryParamsRequest = () => {
  const query = new pbs.auth_query_pb.QueryParamsRequest();
  return [query, pbs.auth_query_pb.QueryParamsResponse];
};
