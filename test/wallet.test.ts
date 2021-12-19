import Client, {ClientInterface} from '../src/client';

describe('Examples and tests of wallet usage', () => {
  let client: ClientInterface;
  beforeAll(() => {
    client = Client;
  });
  it('Create and persist new wallet', async () => {
    const mnemo = await client.wallet.createNew('encryptionPassword');
    console.log(
      `This is wallet's mnemonic phrase ${mnemo}. Make sure to let the  usere know it has to be seeecurely stored  and that theree is  no way to show it second time`
    );
    console.log(client.wallet);
    await client.wallet.persistWallet('walletName');
  });
  it('Read names of all stored wallets', async () => {
    const storedWalletNames = await client.wallet.listSavedWallets();
    console.log(storedWalletNames);
  });
  describe('Load  and  then decrypt wallet', () => {
    it('Load  wallet', async () => {
      await client.wallet.retrieveSavedWallet('walletName');
      //console.log(client.wallet);
    });
    it('Decrypt the private key; list wallet contents', async () => {
      const privateKey = await client.wallet.getPrivateKey(
        'encryptionPassword'
      );
      console.log(privateKey);
      console.log(client.wallet.publicKey);
      console.log(client.wallet.address);
    });
  });
});
