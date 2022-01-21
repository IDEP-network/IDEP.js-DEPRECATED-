//import {Buffer} from 'buffer/';
import {ripemd160, sha256} from '../cryptography/hashing.tools';


if (process.envType !== 'browser') {
  const { createHmac } = require('crypto') as typeof import('crypto');;
  var calculateHmac = async (key, data) => {
    const hmac = createHmac('sha512', key);
    hmac.update(data);
    return Buffer.from(hmac.digest());
  };
} else {
  var importSecretKey = (rawKey) => {
    return window.crypto.subtle.importKey(
      "raw",
      rawKey,
      { name: "HMAC", hash: 'SHA-512' },
      true,
      ["sign", "verify"]
    );
  };
  var calculateHmac = async (key, data) => {
    const importedKey = await importSecretKey(key);
    const hmac = await window.crypto.subtle.sign('HMAC', importedKey, data);
    return Buffer.from(hmac);
  };
}
export const hash160 = (buffer) => {
  return Buffer.from(ripemd160(sha256(buffer)));
};

export const hmacSHA512 = async (key, data) => {
  const authCode = await calculateHmac(key, data);
  return authCode;
};
