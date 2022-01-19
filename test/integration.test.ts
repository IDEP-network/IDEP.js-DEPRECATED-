import {ClientInterface, createNewClient} from '../src/client/client';

/**
 * @jest-environment jsdom
 */
describe('Client', () => {
  let client: ClientInterface;
  beforeAll(() => {
    client = createNewClient();
  });
  describe('Wallet tests', () => {
    describe('Wallet can be createed, persisted, and retrieved', () => {
      it('Create and persist wallet', async () => {
        await client.wallet.createNew('encryptionPwd', 'name');
        console.log(client.wallet);
        await client.wallet.persistWallet();
        // wallete name can bee provided wheen persisting one
        //await client.wallet.persistWallet('walletName');
      });
      it('Retrieve that wallet', async () => {
        await client.wallet.retrieveSavedWallet('name');
        console.log(client.wallet);
      });
      it('Decrypt the private key', async () => {
        const key = await client.wallet.getPrivateKey('encryptionPwd');
        console.log(key);
      });
    });
  });
  describe('Querying works', () => {
    it('query bank balance', async () => {
      const res = await client.bank.checkBalance(
        'idep126dfeu0d6awmdjy29e4f04eg0g3kvcpz9dazru',
        'idep'
      );
      console.log(res);
    });
    it('query auth info', async () => {
      const res = await client.auth.checkAccountInfo(
        'idep1myqd7rayy58s4qj0x57jlwggvx529turcaxc7g'
      );
      console.log(res);
    });
    it('test rest auth info query', async () => {
      const accountInfo = await client.auth.restRequest(
        'idep126dfeu0d6awmdjy29e4f04eg0g3kvcpz9dazru'
      );
      console.log(accountInfo);
    });
  });

  describe('Restore from  mnemonic phrase and send MsgSend tx', () => {
    it('Restore from mnemonic phrase', async () => {
      await client.wallet.restoreWithSeed(
        'power thing inmate obscure rubber frequent grit hair below museum notable reopen spoon prize family caught axis host',
        'password'
      );
      console.log(client.wallet);
    });
    it('Send MsgSend tx', async () => {
      const txResult = await client.bank.msgSend(
        {
          recipient: 'idep126dfeu0d6awmdjy29e4f04eg0g3kvcpz9dazru',
          amount: [{ denom: 'idep', amount: '25' }],
        },
        {
          from: client.wallet.address,
          publicKey: client.wallet.publicKey,
          fee: {
            gas: '7000',
            amount: [{ denom: 'idep', amount: '700' }],
          },
          password: 'password',
        }
      );
      console.log(txResult);
    });
  });
});
