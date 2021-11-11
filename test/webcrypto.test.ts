import {WebCrypto} from '../src/utils/crypto_strategy/browser_strategy';

const readyScryptSaltHex = 'f2768715d022337d2b0a64463d166205';
const readyScryptKeyHex =
  '1cfefe8cebc1c2d16c37fe5f12ca7966c67928e4e1c7a4866d196fe89e19d5f1';

type CryptoKey = {
  type: string;
  extractable: boolean;
  algorithm: {
    name: string;
    length: number;
  };
  usages: string[];
};

const importedKey: CryptoKey = {
  type: 'secret',
  extractable: true,
  algorithm: { name: 'AES-CTR', length: 256 },
  usages: ['encrypt', 'decrypt'],
};
describe('Crypto module', () => {
  let webCrypto: WebCrypto;
  console.log('desc');
  beforeAll(() => {
    console.log('befire inst');
    webCrypto = new WebCrypto();
    console.log('inst  ok');
  });
  it('browser getRandomBytes returns correct number of bytes', async () => {
    const randomBytes = await webCrypto.getRandomBytes(4);
    expect(randomBytes).toHaveLength(4);
  });
  it('webcrypto hex -> bytes and the other way works', () => {
    const buffer = webCrypto.hexToBuffer(readyScryptSaltHex);
    const stringAgain = webCrypto.bufferToHex(buffer);
    expect(stringAgain).toEqual(readyScryptSaltHex);
  });
  it('scrypt works fine', async () => {
    const pwd = 'randompwd';
    const salt = new Uint8Array(webCrypto.hexToBuffer(readyScryptSaltHex));
    const key = await webCrypto.kdfMethod(pwd, salt);
    expect(webCrypto.bufferToHex(key)).toBe(readyScryptKeyHex);
  });
  it('import key works', async () => {
    const pwd = 'randompwd';
    const randomBytes = await webCrypto.getRandomBytes(16);
    const key = await webCrypto.kdfMethod(pwd, randomBytes);
    const imported = await webCrypto.importKey(key);
    expect(imported).toMatchObject<CryptoKey>(importedKey);
  });
  it('Browser aes encryption works', async () => {
    const pwd = 'randompwd';
    const msg = 'test message';
    const encrypted = await webCrypto.encrypt(msg, pwd);
    console.log(encrypted);
    const decrypted = await webCrypto.decrypt(encrypted, pwd);
    expect(decrypted).toEqual('test message');
  });
});
