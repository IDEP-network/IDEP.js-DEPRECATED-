import * as crypto from '../src/utils/crypto';

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
    const mnemonic = await crypto.generateMnemonic();
    const privateKey = await crypto.generatePrivateKeyFromMnemonic(mnemonic);
    expect(privateKey).toBeTruthy();
  });
  it('Generates public key as well', async () => {
    const mnemonic = await crypto.generateMnemonic();
    const privateKey = await crypto.generatePrivateKeyFromMnemonic(mnemonic);
    const publicKey = crypto.derivePublicKeyFromPrivateKey(privateKey);
    expect(publicKey).toBeTruthy();
  });
  it('Gets an address', async () => {
    const mnemonic = await crypto.generateMnemonic();
    const privateKey = await crypto.generatePrivateKeyFromMnemonic(mnemonic);
    const publicKey = crypto.derivePublicKeyFromPrivateKey(privateKey);
    const address = crypto.getAddressFromPublicKey(publicKey);
    expect(address).toBeTruthy();

    const addressFromPrivate = crypto.getAddressFromPrivateKey(privateKey);
    expect(addressFromPrivate).toBeTruthy();
  });
  it('String to buffer and buffer to string both work', () => {
    const buffer = crypto.stringToBuffer('test string', 'utf8');
    const stringAgain = crypto.bufferToString(buffer, 'utf8');
    expect(stringAgain).toEqual('test string');
  });
  it('PBKDF2 works fine', async () => {
    const pwd = 'randompwd';
    const salt = cryptoJs.lib.WordArray.random(128 / 8);
    const key = await crypto.pbkdf2(pwd, salt);
    console.log(key);
    console.log(key.toString(cryptoJs.enc.Hex));
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
  });
});
