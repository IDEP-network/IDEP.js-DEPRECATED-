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

export const querySupplyOfRequest = (denom: string) => {
  const query = new pbs.bank_query_pb.QuerySupplyOfRequest();
  query.setDenom(denom);
  return [query, pbs.bank_query_pb.QuerySupplyOfResponse];
};

export const queryParamsRequest = () => {
  const query = new pbs.bank_query_pb.QueryParamsRequest();
  return [query, pbs.bank_query_pb.QueryParamsResponse];
};
