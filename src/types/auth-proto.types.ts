import * as pbs from './proto';

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

export const queryAuthParamsRequest = () => {
  const query = new pbs.auth_query_pb.QueryParamsRequest();
  return [query, pbs.auth_query_pb.QueryParamsResponse];
};
