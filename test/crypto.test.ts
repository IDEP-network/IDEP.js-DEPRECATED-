import * as crypto from '../src/utils/crypto';

const CryptoJS = require('crypto-js') as typeof import('crypto-js');

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

const readyAddress = 'idep19hv30xxwzk3q04h9jh4ct7z09tutuhst5jewev';

const pbkdfSalt = '733f6f81592b8f53c3134bec4556a55d';

const readyPbkdfHex =
  'e20d02b49224af62afce8b544d1e785b390cc34cb1aec85997487f85ccdbe9f7ca674049c3e3f747409166c1a5e66d6550762a3bd88a30137024cce3b4f6912a72b71d72722975e5b7fb9b22726a548dcb34bc9172b53751c06763757a98b13582defbda57b3f8926ba9db3a1a0bb2fc806c25c0cd57d0e7b12d40d40af09c38';

describe('Crypto module', () => {
  it('getRandomBytes returns correct number of bytes', async () => {
    const randomBytes = await crypto.getRandomBytes(4);
    expect(randomBytes).toHaveLength(4);
  });
  it('encoding into bech32 format works', () => {
    const encoded = crypto.encodeIntoBech32Format(
      Buffer.from('foobar', 'utf8'),
      'foo'
    );
    expect(encoded).toEqual('foo1vehk7cnpwgry9h96');
  });
  it('Generates random mnemonic', async () => {
    const mnemonic = await crypto.generateMnemonic();
    expect(mnemonic.split(' ').length).toEqual(24);
  });
  it('Generates private key', async () => {
    const privateKey = await crypto.generatePrivateKeyFromMnemonic(readyMnemo);
    expect(privateKey.toString('hex')).toBe(readyPrivateKey.toString('hex'));
  });
  it('Generates public key as well', async () => {
    const publicKey = crypto.derivePublicKeyFromPrivateKey(readyPrivateKey);
    expect(publicKey.toString('hex')).toBe(readyPublicKey.toString('hex'));
  });
  it('Gets an address', async () => {
    const address = crypto.getAddressFromPublicKey(readyPublicKey);
    expect(address).toBe(readyAddress);

    const addressFromPrivate = crypto.getAddressFromPrivateKey(readyPrivateKey);
    expect(addressFromPrivate).toBe(readyAddress);
  });
  it('String to buffer and buffer to string both work', () => {
    const buffer = crypto.stringToBuffer('test string', 'utf8');
    const stringAgain = crypto.bufferToString(buffer, 'utf8');
    expect(stringAgain).toEqual('test string');
  });
  it('PBKDF2 works fine', async () => {
    const pwd = 'randompwd';
    const salt = CryptoJS.enc.Hex.parse(pbkdfSalt);
    const key = crypto.pbkdf2(pwd, salt);
    expect(key.toString(CryptoJS.enc.Hex)).toBe(readyPbkdfHex);
  });
  it('Aes  encrypt works', async () => {
    const pwd = 'randompwd';
    const msg = 'test message';
    const encrypted = await crypto.aesEncrypt(msg, pwd);
    console.log(encrypted);
  });
  it('Decrypt works  too', async () => {
    const pwd = 'randompwd';
    const msg = 'test message';
    const encrypted = await crypto.aesEncrypt(msg, pwd);
    const decrypted = await crypto.aesDecrypt(encrypted, pwd);
    console.log(decrypted);
    expect(decrypted).toEqual('test message');
  });
});
