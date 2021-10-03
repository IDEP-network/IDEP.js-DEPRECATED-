import * as bech32 from 'bech32';
import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import * as ripemd160 from 'crypto-js/ripemd160';
import * as secp256k1 from 'secp256k1';
import * as sha256 from 'sha256';

import config from '../config';

const getRandomBytes = (length: number) => {
	return new Promise((resolve, reject) => {
			randomBytes(length, (err, bytes) => {
				if err reject(err);
				else resolve(bytes);
			})
	})
}

const encodeIntoBech32Format = (hashedAddress: string, prefix: config.Bech32Prefix): string => {
	const words = bech32.toWords(hashedContent);
	return bech32.encode(prefix, words);
}

export const generateMnemonic = async (): string => {
	const randomBytes = await getRandomBytes(32);

	return bip39.entropyToMnemonic(randomBytes.toString(`hex`))
}

export const generatePrivateKeyFromMnemonic = (mnemonic: string): string => {
	// throws if mnemonic is invalid
	if (!bip39.validateMnemonic(mnemonic)){
		throw new Error('Invalid mnemonic format'); // TO-DO custom error type
	}

	const seed = await bip39.mnemonicToSeed(mnemonic);
	const node = bip32.fromSeed(seed);
	const child = node.derivePath(config.hdPath); // not sure about this line yet
	return child.privateKey;
}

export const derivePublicKeyFromPrivateKey = (privateKey: Buffer | string) => {
		if (typeof privateKey === 'string') {
			privateKey = Buffer.from(privateKey);
		}
		const publicKey = secp256k1.publicKeyCreate(privateKey, true);
	}

	export const getAddressFromPublicKey = (key: string, prefix: string = config.Bech32Prefix): string => {
		const hash = ripemd160(sha256(key));

		return encodeIntoBech32Format(hash, prefix);
	}

export	const getAddressFromPrivateKey = (key: string, prefix: string = config.Bech32Prefix): string => {
		return getAddressFromPublicKey(derivePublicKeyFromPrivateKey(key), prefix);
	}

	export const createMessageSignature = (messageSignFormat: any, privateKey: Buffer | string){
		if (typeof privateKey === 'string') {
			privateKey = Buffer.from(privateKey);
		}
		const hashedMessage = Buffer.from(sha256(message).toString(), 'hex');

		const { signature } = secp256k1.sign(hashedMessage, Buffer.from(privateKey, `hex`))
		return signature
	}


	// TO-DO keystore, signature, generate hash for tx