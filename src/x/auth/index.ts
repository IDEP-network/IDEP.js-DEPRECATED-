import {ClientInterfce} from '../../client';
import {queryAccountRequest, queryParamsRequest} from '../../types/auth';

export class Auth {
  client: ClientInterfce;

  constructor(client: ClientInterfce) {
    this.client = client;
  }

  async baseTx(address: string, definedParams: any) {
    const accountInfo: AccountInfo = await this.checkAccountInfo(address);
    const baseTx = {
      memo: definedParams.memo || 'Standard memo',
      chain_id: definedParams.chainId || 'Test-Denali', // magic string
      account_number: accountInfo.accountNumber,
      sequence: accountInfo.sequence,
    };
    return baseTx;
  }
  async checkAccountInfo(address: string): Promise<AccountInfo> {
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
      if (result.pubKey && result.pubKey.value) {
        result = {
          ...result,
          pubKey: protoPubKey.deserializeBinary(result.pubKey.value).toObject()
            .key,
        };
      }
      return result;
    } else {
      throw new Error('Sometghin wrong');
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
