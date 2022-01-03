import {ClientInterface} from '../../client';
import {queryAccountRequest, queryParamsRequest} from '../../types/auth-proto.types';

export class Auth {
  client: ClientInterface;

  constructor(client: ClientInterface) {
    this.client = client;
  }

  async getAccountData(address: string): Promise<any> {
    const accountInfo = await this.checkAccountInfo(address);
    const txMeta = {
      accountNumber: accountInfo.accountNumber,
      sequence: accountInfo.sequence,
    };
    return txMeta;
  }
  async restRequest(address: string): Promise<any> {
    try {
      const response = await this.client.restClient.requestData('auth/accounts', address);
      console.log(response);
      const accountNumber = response.result.value.account_number;
      const sequence = response.result.value?.sequence || 0;
      const newAccountInfo = {
        accountNumber,
        sequence,
      };
      return newAccountInfo;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async checkAccountInfo(address: string): Promise<AccountInfo | any> {
    const [
      query,
      protoResponse,
      protoBaseAccount,
      protoPubKey,
    ] = queryAccountRequest(address);
    const params = await this.client.rpc.abciQuery(
      '/cosmos.auth.v1beta1.Query/Account', // remove emagic strings
      query,
      protoResponse
    );
    if (params.account && params.account.value) {
      let result = protoBaseAccount
        .deserializeBinary(params.account.value)
        .toObject();
      if (result.pub_key && result.pub_key.key) {
        result = {
          ...result,
          pubKey: protoPubKey.deserializeBinary(result.pub_key.value).toObject()
            .key,
        };
      }
      return result;
    } else {
      return this.restRequest(address);
    }
  }
  async checkAuthParams(): Promise<AuthParams> {
    const [query, protoResponse] = queryParamsRequest();
    const params = await this.client.rpc.abciQuery(
      '/cosmos.auth.v1beta1.Query/Params', // remove emagic strings
      query,
      protoResponse
    );
    return params;
  }

  async loadAccountData(walletData): Promise<AccountInfo> {
    const { public_key, address } = walletData;
    const accountInfo: AccountInfo = await this.checkAccountInfo(address);
    if (!accountInfo.pubKey) {
      accountInfo.pubKey = public_key;
    }
    return accountInfo;
  }
}

type AccountInfo = {
  address: string;
  pubKey?: string | undefined;
  accountNumber: number;
  sequence: number;
};

type AuthParams = {
  params: {
    maxMemoCharacters: number;
    txSigLimit: number;
    txSizeCostPerByte: number;
    sigVerifyCostEd25519: number;
    sigVerifyCostSecp256k1: number;
  };
};
