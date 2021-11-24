export class Auth {
  client: any;
  defaultFee: any;

  constructor(client: any) {
    this.client = client;
    this.defaultFee = { ...this.client.configuration.fee };
  }
  async checkAccountInfo(address: string): Promise<AccountInfo> {
    const result: AccountInfo = await this.client.queryClient.requestData(
      'cosmos/auth/v1beta1/accounts/',
      address
    );
    return result;
  }
  async checkAuthParams(): Promise<AuthParams> {
    const result: AuthParams = await this.client.queryClient.requestData(
      'cosmos/auth/v1beta1/params'
    );
    return result;
  }

  async loadAccountData(walletData): Promise<AccountInfo> {
    const { public_key, account_number } = walletData;
    const accountInfo: AccountInfo = await this.checkAccountInfo(
      account_number
    );
    if (!accountInfo.account.pub_key) {
      accountInfo.account.pub_key = public_key;
    }
    return accountInfo;
  }
}

type AccountInfo = {
  account: {
    '@type': string;
    address: string;
    pub_key: string | null;
    account_number: string;
    sequence: string;
  };
};

type AuthParams = {
  params: {
    max_memo_characters: string;
    tx_sig_limit: string;
    tx_size_cost_per_byte: string;
    sig_verify_cost_ed25519: string;
    sig_verify_cost_secp256k1: string;
  };
};
