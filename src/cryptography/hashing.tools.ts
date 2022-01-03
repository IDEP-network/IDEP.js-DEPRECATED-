import cryptoAsync from '@ronomon/crypto-async';

import isNode from '../utils/is-node';

if (isNode) {
  var Buffer = require('buffer').Buffer;
} else {
  var Buffer = require('buffer/').Buffer;
}
export const sha256 = (bytes: Uint8Array | Buffer): Promise<Buffer> => {
  const buffer = bytes instanceof Buffer ? bytes : Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cryptoAsync.hash('sha256', buffer, (err: Error, hash: Buffer) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
};

export const ripemd160 = (bytes: Uint8Array | Buffer): Promise<Buffer> => {
  const buffer = bytes instanceof Buffer ? bytes : Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cryptoAsync.hash('ripemd160', buffer, (err: Error, hash: Buffer) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
};
