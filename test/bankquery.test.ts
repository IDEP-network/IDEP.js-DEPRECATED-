import {BaseQuery} from '../src/communication/querying/BaseQuery';
import {RestClient} from '../src/communication/querying/RestClient';
import {Bank} from '../src/x/bank';

class Client {
  queryClient;
  constructor(queryClient) {
    this.queryClient = queryClient;
  }
}

const readyAddress = 'idep19hv30xxwzk3q04h9jh4ct7z09tutuhst5jewev';

describe('Client', () => {
  let client: Client;
  let queryClient: BaseQuery;
  let bank: Bank;
  beforeAll(() => {
    queryClient = new BaseQuery(RestClient);
    client = new Client(queryClient);
    bank = new Bank(client);
  });
  it('query balances', async () => {
    const res = await bank.checkALlBalances(readyAddress);
    console.log(res);
  });
});

