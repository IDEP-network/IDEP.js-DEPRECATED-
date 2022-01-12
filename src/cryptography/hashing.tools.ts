import RIPEMD160 from 'ripemd160';
import shajs from 'sha.js';

const Buffer = require('buffer/');

export const sha256 = (bytes: Uint8Array | Buffer): Buffer => {
  const buffer = bytes instanceof Buffer ? bytes : Buffer.from(bytes);
  const hash: Buffer = shajs('sha256')
    .update(buffer)
    .digest();
  return hash;
};

export const ripemd160 = (bytes: Uint8Array | Buffer): Buffer => {
  const buffer = bytes instanceof Buffer ? bytes : Buffer.from(bytes);
  const hash = new RIPEMD160().update(buffer).digest();
  return hash;
};
