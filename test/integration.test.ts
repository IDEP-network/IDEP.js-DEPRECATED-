import {ClientInterface, createNewClient} from '../src/client/client';

describe('Client', () => {
  let client: ClientInterface;
  beforeAll(() => {
    client = createNewClient({ nodeUrl: 'http://143.110.246.141:26657' });
  });
  describe('Wallet tests', () => {
    describe('Wallet can be createed, persisted, and retrieved', () => {
      it('Create and persist wallet', async () => {
        const wallet = await client.wallet.createNew('encryptionPwd', 'name');
        console.log(wallet);
        expect(client.wallet.name).toEqual('name');
        expect(wallet.mnemonic.split(' ').length).toEqual(18);
        // wallete name can bee provided wheen persisting one
        //await client.wallet.persistWallet('walletName');
      });
      it('Retrieve that wallet', async () => {
        const wallet = await client.wallet.retrieveSavedWallet('name');
        console.log(wallet);
        expect(client.wallet.name).toEqual('name');
      });
      it('Check bip32, bip39, wallet generation', async () => {
        const w = await client.wallet.restoreWithSeed(
          'disorder suffer swing screen copy calm fork legal strategy until home ancient moment bench wet present sure vote match pluck peanut odor shoe monster',
          'pindi'
        );
        console.log(w);
        expect(w.publicKey).toBe('ideppub1addwnpepqwdf3jg3u3j4y5nqj3qzx0y4fc3cccglql59sl7guc280fehntftct03e9c');
        expect(w.address).toBe('idep1w574qn3yqgt0vsae3mut2upm9wjs5rzvw2y2h4');
      });
    });
    describe('Restoree with seed, check private keey decryption', () => {
      it('Restoree', async () => {
        const w = await client.wallet.restoreWithSeed(
          'power thing inmate obscure rubber frequent grit hair below museum notable reopen spoon prize family caught axis host',
          'password'
        );
        console.log(w);
        expect(w.publicKey).toBe('ideppub1addwnpepqftm06dn5ndkvccz645a0t7y2rz34qgqjea4xsn37wzdl40u4t3n2j6l8sj');
        expect(w.address).toBe('idep1kt2kuzzn7nm3zr8qnmnh7qez55tc67hzhkjn9z');
      });

      it('Decrypt the private key', async () => {
        const key = await client.wallet.getPrivateKey('password');
        console.log(key);
        expect(key).toEqual('4c63f44a4d5f1d51d40b029438e231abe409d1b8bbd6ba988420a4054718e48c');
      });
    });
  });
  describe('Querying works', () => {
    it('query bank balance', async () => {
      const res = await client.bank.checkBalance(
        'idep1kt2kuzzn7nm3zr8qnmnh7qez55tc67hzhkjn9z',
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
