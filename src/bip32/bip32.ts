// credit to https://github.com/bitcoinjs/bip32
//import {Buffer} from 'buffer/';
import typeforce from 'typeforce';

import * as crypto from './crypto';
import * as ecc from './tiny-secp256k1/code';

interface Network {
	wif: number;
	bip32: {
		public: number;
		private: number;
	};
	messagePrefix?: string;
	bech32?: string;
	pubKeyHash?: number;
	scriptHash?: number;
}

const UINT256_TYPE = typeforce.BufferN(32);
const NETWORK_TYPE = typeforce.compile({
	wif: typeforce.UInt8,
	bip32: {
		public: typeforce.UInt32,
		private: typeforce.UInt32,
	},
});

const BITCOIN: Network = {
	messagePrefix: '\x18Bitcoin Signed Message:\n',
	bech32: 'bc',
	bip32: {
		public: 0x0488b21e,
		private: 0x0488ade4,
	},
	pubKeyHash: 0x00,
	scriptHash: 0x05,
	wif: 0x80,
};

const HIGHEST_BIT = 0x80000000;
const UINT31_MAX = Math.pow(2, 31) - 1;

function BIP32Path(value: string): boolean {
	return (
		typeforce.String(value) && value.match(/^(m\/)?(\d+'?\/)*\d+'?$/) !== null
	);
}

function UInt31(value: number): boolean {
	return typeforce.UInt32(value) && value <= UINT31_MAX;
}

export interface BIP32Interface {
	chainCode: Buffer;
	network: Network;
	lowR: boolean;
	depth: number;
	index: number;
	parentFingerprint: number;
	publicKey: Buffer;
	privateKey?: Buffer;
	identifier: Buffer;
	fingerprint: Buffer;
	isNeutered(): boolean;
	neutered(): BIP32Interface;
	derive(index: number): Promise<BIP32Interface>;
	deriveHardened(index: number): Promise<BIP32Interface>;
	derivePath(path: string): Promise<BIP32Interface>;
}

class BIP32 implements BIP32Interface {
	lowR: boolean;
	constructor(
		private __D: Buffer | undefined,
		private __Q: Buffer | undefined,
		public chainCode: Buffer,
		public network: Network,
		private __DEPTH = 0,
		private __INDEX = 0,
		private __PARENT_FINGERPRINT = 0x00000000,
	) {
		typeforce(NETWORK_TYPE, network);
		this.lowR = false;
	}

	get depth(): number {
		return this.__DEPTH;
	}

	get index(): number {
		return this.__INDEX;
	}

	get parentFingerprint(): number {
		return this.__PARENT_FINGERPRINT;
	}

	get publicKey(): Buffer {
		if (this.__Q === undefined) this.__Q = Buffer.from(ecc.pointFromScalar(this.__D, true));
		return this.__Q!;
	}

	get privateKey(): Buffer | undefined {
		return Buffer.from(this.__D);
	}

	get identifier(): Buffer {
		return crypto.hash160(this.publicKey);
	}

	get fingerprint(): Buffer {
		return this.identifier.slice(0, 4);
	}

	get compressed(): boolean {
		return true;
	}

	// Private === not neutered
	// Public === neutered
	isNeutered(): boolean {
		return this.__D === undefined;
	}

	neutered(): BIP32Interface {
		return fromPublicKeyLocal(
			this.publicKey,
			this.chainCode,
			this.network,
			this.depth,
			this.index,
			this.parentFingerprint,
		);
	}


	// https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#child-key-derivation-ckd-functions
	async derive(index: number): Promise<BIP32Interface> {
		typeforce(typeforce.UInt32, index);

		const isHardened = index >= HIGHEST_BIT;
		const data = Buffer.allocUnsafe(37);

		// Hardened child
		if (isHardened) {
			if (this.isNeutered())
				throw new TypeError('Missing private key for hardened child key');

			// data = 0x00 || ser256(kpar) || ser32(index)
			data[0] = 0x00;
			this.privateKey!.copy(data, 1);
			data.writeUInt32BE(index, 33);

			// Normal child
		} else {
			// data = serP(point(kpar)) || ser32(index)
			//      = serP(Kpar) || ser32(index)
			this.publicKey.copy(data, 0);
			data.writeUInt32BE(index, 33);
		}

		const I = await crypto.hmacSHA512(this.chainCode, data);
		const IL = I.slice(0, 32);
		const IR = I.slice(32);

		// if parse256(IL) >= n, proceed with the next value for i
		if (!ecc.isPrivate(IL)) return this.derive(index + 1);

		// Private parent key -> private child key
		let hd: BIP32Interface;
		if (!this.isNeutered()) {
			// ki = parse256(IL) + kpar (mod n)
			const ki = Buffer.from(ecc.privateAdd(this.privateKey, IL));

			// In case ki == 0, proceed with the next value for i
			if (ki == null) return this.derive(index + 1);

			hd = fromPrivateKeyLocal(
				ki,
				IR,
				this.network,
				this.depth + 1,
				index,
				this.fingerprint.readUInt32BE(0),
			);

			// Public parent key -> public child key
		} else {
			// Ki = point(parse256(IL)) + Kpar
			//    = G*IL + Kpar
			const Ki = Buffer.from(ecc.pointAddScalar(this.publicKey, IL, true));

			// In case Ki is the point at infinity, proceed with the next value for i
			if (Ki === null) return this.derive(index + 1);

			hd = fromPublicKeyLocal(
				Ki,
				IR,
				this.network,
				this.depth + 1,
				index,
				this.fingerprint.readUInt32BE(0),
			);
		}

		return hd;
	}

	deriveHardened(index: number): Promise<BIP32Interface> {
		typeforce(UInt31, index);

		// Only derives hardened private keys by default
		return this.derive(index + HIGHEST_BIT);
	}

	async derivePath(path: string): Promise<BIP32Interface> {
		typeforce(BIP32Path, path);

		let splitPath = path.split('/');
		if (splitPath[0] === 'm') {
			if (this.parentFingerprint)
				throw new TypeError('Expected master, got child');

			splitPath = splitPath.slice(1);
		}

		return splitPath.reduce(
			async (prevHd, indexStr) => {
				let index;
				if (indexStr.slice(-1) === `'`) {
					index = parseInt(indexStr.slice(0, -1), 10);
					return (await prevHd).deriveHardened(index);
				} else {
					index = parseInt(indexStr, 10);
					return (await prevHd).derive(index);
				}
			},
			this as unknown as Promise<BIP32Interface>,
		);
	}
}

export function fromPrivateKey(
	privateKey: Buffer,
	chainCode: Buffer,
	network?: Network,
): BIP32Interface {
	return fromPrivateKeyLocal(privateKey, chainCode, network);
}

function fromPrivateKeyLocal(
	privateKey: Buffer,
	chainCode: Buffer,
	network?: Network,
	depth?: number,
	index?: number,
	parentFingerprint?: number,
): BIP32Interface {
	typeforce(
		{
			privateKey: UINT256_TYPE,
			chainCode: UINT256_TYPE,
		},
		{ privateKey, chainCode },
	);
	network = network || BITCOIN;

	if (!ecc.isPrivate(privateKey))
		throw new TypeError('Private key not in range [1, n)');
	return new BIP32(
		privateKey,
		undefined,
		chainCode,
		network,
		depth,
		index,
		parentFingerprint,
	);
}

export function fromPublicKey(
	publicKey: Buffer,
	chainCode: Buffer,
	network?: Network,
): BIP32Interface {
	return fromPublicKeyLocal(publicKey, chainCode, network);
}

function fromPublicKeyLocal(
	publicKey: Buffer,
	chainCode: Buffer,
	network?: Network,
	depth?: number,
	index?: number,
	parentFingerprint?: number,
): BIP32Interface {
	typeforce(
		{
			publicKey: typeforce.BufferN(33),
			chainCode: UINT256_TYPE,
		},
		{ publicKey, chainCode },
	);
	network = network || BITCOIN;

	// verify the X coordinate is a point on the curve
	if (!ecc.isPoint(publicKey)) throw new TypeError('Point is not on the curve');
	return new BIP32(
		undefined,
		publicKey,
		chainCode,
		network,
		depth,
		index,
		parentFingerprint,
	);
}

export async function fromSeed(seed: Buffer, network?: Network): Promise<BIP32Interface> {
	typeforce(typeforce.Buffer, seed);
	if (seed.length < 16) throw new TypeError('Seed should be at least 128 bits');
	if (seed.length > 64) throw new TypeError('Seed should be at most 512 bits');
	network = network || BITCOIN;

	const I = await crypto.hmacSHA512(Buffer.from('Bitcoin seed', 'utf8'), seed);
	const IL = I.slice(0, 32);
	const IR = I.slice(32);

	return fromPrivateKey(IL, IR, network);
}