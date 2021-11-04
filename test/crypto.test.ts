import * as crypto from '../src/utils/crypto';

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
  'a80835778e547212e690b24e88471cc6d58c158eaba7301352ea73669d85a5f7';

const readyEncrypted = {
  ciphertext: 'a7a2ddb3c965274a7772c5b5',
  iv: '9ae2ba46aa3c30afc74efe9900000000',
  salt: 'b0477184762087f04b7e204cc35429f0',
};

const secondReadyEncrypted = {
  ciphertext: '25b97f011c87d0697c233f08',
  cipherparams: { iv: '66e6388b6eb5d39896bd440f00000000' },
  cipher: 'aes-256-ctr',
  kdf: 'scrypt',
  kdfparams: {
    keylen: 32,
    N: 16384,
    r: 8,
    p: 1,
    salt: 'd056ce33c3697320abbcc0fed01f64dc',
  },
  mac: 'ee122b55ed8b207a7956bcc29e398d148164ee1834727abd9c9b0c88ec0b6909',
};

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
    const key = await crypto.pbkdf2(pwd, Buffer.from(pbkdfSalt, 'hex'));
    expect(key.toString('hex')).toBe(readyPbkdfHex);
  });
  it('Aes  encrypt works', async () => {
    const pwd = 'randompwd';
    const msg = 'test message';
    const encrypted = await crypto.aesEncryptPbkdf2(msg, pwd);
    const decrypted = await crypto.aesDecryptPbkdf2(encrypted, pwd);
    expect(decrypted).toEqual('test message');
  });
  it('Decrypt works  too', async () => {
    const pwd = 'randompwd';
    const decrypted = await crypto.aesDecryptPbkdf2(readyEncrypted, pwd);
    expect(decrypted).toEqual('test message');
  });
  it('Aes  encrypt works with  scrypt', async () => {
    const pwd = 'randompwd';
    const msg = 'test message';
    const encrypted = await crypto.aesEncryptScrypt(msg, pwd);
    const decrypted = await crypto.aesDecryptScrypt(encrypted, pwd);
    expect(decrypted).toEqual('test message');
  });
  it('Decrypt works  too with scrypt', async () => {
    const pwd = 'randompwd';
    const decrypted = await crypto.aesDecryptScrypt(secondReadyEncrypted, pwd);
    expect(decrypted).toEqual('test message');
  });
});
