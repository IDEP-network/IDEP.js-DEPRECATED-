import {WebCrypto} from '../src/utils/crypto_strategy/browser_strategy';
import {NodeCrypto} from '../src/utils/crypto_strategy/node_strategy';

const { subtle, getRandomValues } = require('crypto').webcrypto;

const crypto = require('crypto') as typeof import('crypto');

const readyScryptSaltHex = 'f2768715d022337d2b0a64463d166205';
const readyScryptKeyHex =
  '1cfefe8cebc1c2d16c37fe5f12ca7966c67928e4e1c7a4866d196fe89e19d5f1';

const readyCiphertextForMacCalculations = '5d286062083bb811e4e50a1d';
const readyMac =
  '398826c57920ff3bdf71af0497567876034480065acf9c503c6eccb0f035cc82';
const readyRandomBytes = [
  227,
  79,
  158,
  196,
  27,
  39,
  211,
  166,
  226,
  95,
  231,
  222,
  21,
  12,
  55,
  16,
];
const readyRandomBytesHex = 'e34f9ec41b27d3a6e25fe7de150c3710';

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
  let nodeCrypto: NodeCrypto;
  beforeAll(() => {
    webCrypto = new WebCrypto(subtle, getRandomValues);
    nodeCrypto = new NodeCrypto(crypto);
  });
  it('test bfr', async () => {
    const randomBytes = new Uint8Array(readyRandomBytes);
    const hex = webCrypto.bufferToHex(randomBytes);
    expect(hex).toBe(readyRandomBytesHex);
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
  it('web scrypt works fine', async () => {
    const pwd = 'randompwd';
    const salt = new Uint8Array(webCrypto.hexToBuffer(readyScryptSaltHex));
    const key = await webCrypto.kdfMethod(pwd, salt);
    expect(webCrypto.bufferToHex(key)).toBe(readyScryptKeyHex);
  });
  it('node scrypt works fine', async () => {
    const pwd = 'randompwd';
    const salt = Buffer.from(readyScryptSaltHex, 'hex');
    const key = await nodeCrypto.kdfMethod(pwd, salt);
    expect(key.toString('hex')).toBe(readyScryptKeyHex);
  });
  it('import key works', async () => {
    const pwd = 'randompwd';
    const randomBytes = await webCrypto.getRandomBytes(16);
    const key = await webCrypto.kdfMethod(pwd, randomBytes);
    const imported = await webCrypto.importKey(key);
    expect(imported).toMatchObject<CryptoKey>(importedKey);
  });
  it('Mac calculation  works in node', () => {
    const mac = nodeCrypto.getKeccak(
      Buffer.from(readyScryptKeyHex, 'hex'),
      readyCiphertextForMacCalculations
    );
    expect(mac).toBe(readyMac);
  });
  it('Mac calculation  works in web', () => {
    const key = webCrypto.hexToBuffer(readyScryptKeyHex);
    const phrase = webCrypto.hexToBuffer(readyCiphertextForMacCalculations);
    const mac = webCrypto.getKeccak(key, phrase);
    expect(mac).toBe(readyMac);
  });
  it('Browser aes encryption works', async () => {
    const pwd = 'randompwd';
    const msg = 'test message';
    const encrypted = await webCrypto.encrypt(msg, pwd);
    const decrypted = await webCrypto.decrypt(encrypted, pwd);
    const alsoDecrypted = await nodeCrypto.decrypt(encrypted, pwd);
    expect(decrypted).toEqual('test message');
    expect(alsoDecrypted).toEqual('test message');
  });
  it('Encrypt with  browser decrypt with  node', async () => {
    const pwd = 'randompwd';
    const msg = 'test message';
    const encrypted = await webCrypto.encrypt(msg, pwd);
    const decrypted = await nodeCrypto.decrypt(encrypted, pwd);
    expect(decrypted).toEqual('test message');
  });
  it('Encrypt with  node decrypt with  browser', async () => {
    const pwd = 'randompwd';
    const msg = 'test message';
    const encrypted = await nodeCrypto.encrypt(msg, pwd);
    const decrypted = await webCrypto.decrypt(encrypted, pwd);
    expect(decrypted).toEqual('test message');
  });
  it('Node version throws exception when mac is invalid', async () => {
    const pwd = 'randompwd';
    const msg = 'test message';
    const encrypted = await nodeCrypto.encrypt(msg, pwd);
    await expect(
      async () => await nodeCrypto.decrypt({ ...encrypted, mac: 'xxxx' }, pwd)
    ).rejects.toThrow('Message Authentication Code does not match');
  });
  it('Web version throws exception when mac is invalid', async () => {
    const pwd = 'randompwd';
    const msg = 'test message';
    const encrypted = await webCrypto.encrypt(msg, pwd);
    await expect(
      async () => await webCrypto.decrypt({ ...encrypted, mac: 'xxxx' }, pwd)
    ).rejects.toThrow('Message Authentication Code does not match');
  });
});
// check if keys are same
