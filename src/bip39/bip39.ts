// credit to https://github.com/bitcoinjs/bip39
import {sha256} from '../cryptography/hashing.tools';
import {_default as _DEFAULT_WORDLIST, wordlists} from './_wordlists';

let DEFAULT_WORDLIST: string[] | undefined = _DEFAULT_WORDLIST;

const INVALID_ENTROPY = 'Invalid entropy';
const WORDLIST_REQUIRED =
	'A wordlist is required but a default could not be found.\n' +
	'Please pass a 2048 word array explicitly.';

if (process.envType !== 'browser') {
	var Buffer = require('buffer/').Buffer;
	const { pbkdf2: nodepbkdf2 } = require('crypto');
	var pbkdf2 = (
		password: Buffer,
		saltMixin: Buffer,
		iterations: number,
		keylen: number,
	): Promise<Buffer> => {
		return new Promise((resolve, reject) => {
			nodepbkdf2(
				password,
				saltMixin,
				iterations,
				keylen,
				'sha512',
				(err, derivedKey) => {
					if (err) reject(err);
					return resolve(derivedKey);
				}
			);
		});
	};
} else {
	var Buffer = require('buffer/').Buffer;
	const convertToImportedKey = async (raw: Buffer): Promise<CryptoKey> => {
		return window.crypto.subtle.importKey(
			'raw',
			raw,
			{ name: 'PBKDF2' },
			false,
			['deriveBits', 'deriveKey']
		);
	};
	var pbkdf2 = async (
		password: Buffer,
		saltMixin: Buffer,
		iterations: number,
		keylen: number,
	): Promise<Buffer> => {
		const key = await convertToImportedKey(password);
		const derivedBits = await window.crypto.subtle.deriveBits(
			{
				name: 'PBKDF2',
				salt: new Uint8Array(saltMixin),
				iterations,
				hash: 'SHA-512',
			},
			key,
			keylen << 3
		);
		return Buffer.from(derivedBits);
	};
}

function normalize(str?: string): string {
	return (str || '').normalize('NFKD');
}

function lpad(str: string, padString: string, length: number): string {
	while (str.length < length) {
		str = padString + str;
	}
	return str;
}

function binaryToByte(bin: string): number {
	return parseInt(bin, 2);
}

function bytesToBinary(bytes: number[]): string {
	return bytes.map((x: number): string => lpad(x.toString(2), '0', 8)).join('');
}

function deriveChecksumBits(entropyBuffer: Buffer): string {
	const ENT = entropyBuffer.length * 8;
	const CS = ENT / 32;
	const hash = sha256(entropyBuffer);

	return bytesToBinary(Array.from(hash)).slice(0, CS);
}

function salt(password?: string): string {
	return 'mnemonic' + (password || '');
}


export function mnemonicToSeed(
	mnemonic: string,
	password?: string
): Promise<Buffer> {
	const mnemonicBuffer = Buffer.from(normalize(mnemonic), 'utf8');
	const saltBuffer = Buffer.from(salt(normalize(password)), 'utf8');
	return pbkdf2(mnemonicBuffer, saltBuffer, 2048, 64);
}

export function entropyToMnemonic(
	entropy: Buffer,
	wordlist?: string[]
): string {
	if (!Buffer.isBuffer(entropy)) {
		entropy = Buffer.from(entropy, 'hex');
	}
	wordlist = wordlist || DEFAULT_WORDLIST;
	if (!wordlist) {
		throw new Error(WORDLIST_REQUIRED);
	}

	// 128 <= ENT <= 256
	if (entropy.length < 16) {
		throw new TypeError(INVALID_ENTROPY);
	}
	if (entropy.length > 32) {
		throw new TypeError(INVALID_ENTROPY);
	}
	if (entropy.length % 4 !== 0) {
		throw new TypeError(INVALID_ENTROPY);
	}

	const entropyBits = bytesToBinary([...entropy]);
	const checksumBits = deriveChecksumBits(entropy);

	const bits = entropyBits + checksumBits;
	const chunks = bits.match(/(.{1,11})/g)!;
	const words = chunks.map((binary: string): string => {
		const index = binaryToByte(binary);
		return wordlist![index];
	});

	return words.join(' ');
}

export function setDefaultWordlist(language: string): void {
	const result = wordlists[language];
	if (result) {
		DEFAULT_WORDLIST = result;
	} else {
		throw new Error('Could not find wordlist for language "' + language + '"');
	}
}

export function getDefaultWordlist(): string {
	if (!DEFAULT_WORDLIST) {
		throw new Error('No Default Wordlist set');
	}
	return Object.keys(wordlists).filter((lang: string): boolean => {
		if (lang === 'JA' || lang === 'EN') {
			return false;
		}
		return wordlists[lang].every(
			(word: string, index: number): boolean =>
				word === DEFAULT_WORDLIST![index]
		);
	})[0];
}

export { wordlists } from './_wordlists';
