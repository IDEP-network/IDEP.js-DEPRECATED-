import Client, {ClientInterfce} from '../src/client';

const readyAddress = 'idep19hv30xxwzk3q04h9jh4ct7z09tutuhst5jewev';

describe('Client', () => {
  let client: ClientInterfce;
  beforeAll(() => {
    client = Client;
  });
  it('query bank balance', async () => {
    const res = await client.bank.checkBalance(readyAddress, 'idep');
    console.log(res);
  });
  it('query bank balances', async () => {
    const res = await client.bank.checkALlBalances(readyAddress);
    console.log(res);
  });
  it('query bank supply', async () => {
    const res = await client.bank.checkSupply('idep');
    console.log(res);
  });
  it('query bank params', async () => {
    const res = await client.bank.checkParams();
    console.log(res);
  });
  it('query bank account', async () => {
    const res = await client.bank.checkParams();
    console.log(res);
  });
  it('query auth info', async () => {
    const res = await client.auth.checkAccountInfo(
      'idep1jg3j2daytay2qgf6d3aftdxjwqzhe655z485c2'
    );
    console.log(res);
  });
  it('query auth params', async () => {
    const res = await client.auth.checkAuthParams();
    console.log(res);
  });
  it('query auth params', async () => {
    const res = await client.nft.checkOwner(
      'idep1jg3j2daytay2qgf6d3aftdxjwqzhe655z485c2'
    );
    console.log(res);
  });
});

