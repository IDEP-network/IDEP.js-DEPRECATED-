// credit to https://github.com/bitcoinjs/tiny-secp256k1
import {Buffer} from 'buffer/';

const BN = require('bn.js');
const EC = require('elliptic').ec;
//var Buffer=require('buffer/').Buffer;
const secp256k1 = new EC('secp256k1');
var isBuffer = require('is-buffer');

const ZERO32 = Buffer.alloc(32, 0);
const EC_GROUP_ORDER = Buffer.from('fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 'hex');
const EC_P = Buffer.from('fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f', 'hex');

const n = secp256k1.curve.n;
const G = secp256k1.curve.g;

const THROW_BAD_PRIVATE = 'Expected Private';
const THROW_BAD_POINT = 'Expected Point';
const THROW_BAD_TWEAK = 'Expected Tweak';

function isScalar(x) {
  return isBuffer(x) && x.length === 32;
}

function isOrderScalar(x) {
  if (!isScalar(x)) return false;
  return x.compare(EC_GROUP_ORDER) < 0; // < G
}

export function isPoint(p) {
  if (!Buffer.isBuffer(p)) return false;
  if (p.length < 33) return false;

  const t = p[0];
  const x = p.slice(1, 33);
  if (x.compare(ZERO32) === 0) return false;
  if (x.compare(EC_P) >= 0) return false;
  if ((t === 0x02 || t === 0x03) && p.length === 33) {
    try { decodeFrom(p); } catch (e) { return false; } // TODO: temporary
    return true;
  }

  const y = p.slice(33);
  if (y.compare(ZERO32) === 0) return false;
  if (y.compare(EC_P) >= 0) return false;
  if (t === 0x04 && p.length === 65) return true;
  return false;
}

function __isPointCompressed(p) {
  return p[0] !== 0x04;
}

export function isPointCompressed(p) {
  if (!isPoint(p)) return false;
  return __isPointCompressed(p);
}

export function isPrivate(x) {
  if (!isScalar(x)) return false;
  return x.compare(ZERO32) > 0 && // > 0
    x.compare(EC_GROUP_ORDER) < 0; // < G
}


function assumeCompression(value?: any, pubkey?: any) {
  if (value === undefined && pubkey !== undefined) return __isPointCompressed(pubkey);
  if (value === undefined) return true;
  return value;
}

function fromBuffer(d) { return new BN(d); }
function toBuffer(d) { return d.toArrayLike(Buffer, 'be', 32); }
function decodeFrom(P) { return secp256k1.curve.decodePoint(P); }
function getEncoded(P, compressed) { return Buffer.from(P._encode(compressed)); }

export function pointAdd(pA, pB, __compressed) {
  if (!isPoint(pA)) throw new TypeError(THROW_BAD_POINT);
  if (!isPoint(pB)) throw new TypeError(THROW_BAD_POINT);

  const a = decodeFrom(pA);
  const b = decodeFrom(pB);
  const pp = a.add(b);
  if (pp.isInfinity()) return null;

  const compressed = assumeCompression(__compressed, pA);
  return getEncoded(pp, compressed);
}

export function pointAddScalar(p, tweak, __compressed) {
  if (!isPoint(p)) throw new TypeError(THROW_BAD_POINT);
  if (!isOrderScalar(tweak)) throw new TypeError(THROW_BAD_TWEAK);

  const compressed = assumeCompression(__compressed, p);
  const pp = decodeFrom(p);
  if (tweak.compare(ZERO32) === 0) return getEncoded(pp, compressed);

  const tt = fromBuffer(tweak);
  const qq = G.mul(tt);
  const uu = pp.add(qq);
  if (uu.isInfinity()) return null;

  return getEncoded(uu, compressed);
}


export function pointFromScalar(d, __compressed) {
  if (!isPrivate(d)) throw new TypeError(THROW_BAD_PRIVATE);

  const dd = fromBuffer(d);
  const pp = G.mul(dd);
  if (pp.isInfinity()) return null;

  const compressed = assumeCompression(__compressed);
  return getEncoded(pp, compressed);
}


export function privateAdd(d, tweak) {
  if (!isPrivate(d)) throw new TypeError(THROW_BAD_PRIVATE);
  if (!isOrderScalar(tweak)) throw new TypeError(THROW_BAD_TWEAK);

  const dd = fromBuffer(d);
  const tt = fromBuffer(tweak);
  const dt = toBuffer(dd.add(tt).umod(n));
  if (!isPrivate(dt)) return null;

  return dt;
}
