import RIPEMD160 from 'ripemd160';
import shajs from 'sha.js';

export const sha256 = (bytes: Uint8Array | Buffer): Buffer => {
  const hash = shajs('sha256')
    .update(bytes)
    .digest();
  return hash;
};

export const ripemd160 = (bytes: Uint8Array | Buffer): Buffer => {
  const buffer = Buffer.from(bytes);
  const hash = new RIPEMD160().update(buffer).digest();
  return hash;
};
