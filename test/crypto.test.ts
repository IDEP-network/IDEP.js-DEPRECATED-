import * as accountUtils from '../src/utils/account';

const readyMnemo =
  'cost unfold manage group pen cradle agree library rose lizard proof supply canvas assault orchard patch zebra absurd useful upset south glide miracle ostrich';

const readyPrivateKey = Buffer.from([
  16, 171, 177, 40, 42, 136, 102, 206, 82, 141, 58, 122, 219, 214, 78, 231, 38,
  220, 107, 247, 13, 131, 252, 158, 169, 74, 85, 210, 171, 181, 37, 0,
]);

const readyPublicKey = Buffer.from([
  2, 33, 241, 210, 142, 181, 241, 226, 119, 100, 254, 82, 152, 7, 164, 138, 117,
  167, 36, 218, 57, 126, 157, 196, 55, 67, 78, 105, 13, 142, 89, 36, 110,
]);

const readyAddress = 'idep19hv30 xxwzk3q04h9jh4ct7z09tutuhst5jewev';

describe('Crypto module', () => {
  it('getRandomBytes returns correct number of bytes', async () => {
    const randomBytes = await accountUtils.getRandomBytes(4);
    expect(randomBytes).toHaveLength(4);
  });
  it('encoding into bech32 format works', () => {
    const accEncoded = accountUtils.encodeIntoBech32Format(
      Buffer.from('foobar', 'utf8'),
      'foo'
    );
    expect(accEncoded).toEqual('foo1vehk7cnpwgry9h96');
  });
  it('Generates random mnemonic', async () => {
    const mnemonic = await accountUtils.generateMnemonic();
    expect(mnemonic.split(' ').length).toEqual(24);
  });
  it('Generates private key', async () => {
    const privateKey = await accountUtils.generatePrivateKeyFromMnemonic(
      readyMnemo
    );
    expect(privateKey.toString('hex')).toBe(readyPrivateKey.toString('hex'));
  });
  it('Generates public key as well', async () => {
    const publicKey =
      accountUtils.derivePublicKeyFromPrivateKey(readyPrivateKey);
    expect(publicKey.toString('hex')).toBe(readyPublicKey.toString('hex'));
  });
  it('Gets an address', async () => {
    const address = accountUtils.getAddressFromPublicKey(readyPublicKey);
    expect(address).toBe(readyAddress);

    const addressFromPrivate =
      accountUtils.getAddressFromPrivateKey(readyPrivateKey);
    expect(addressFromPrivate).toBe(readyAddress);
  });
});
