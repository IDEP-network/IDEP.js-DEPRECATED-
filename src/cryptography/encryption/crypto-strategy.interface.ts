export interface CryptoStrategy {
	getRandomBytes(length: number): Promise<Buffer | Uint8Array>;
	kdfMethod(
			password: string,
			salt: string | any
	): Promise<Buffer | ArrayBuffer>;
	encrypt(message: string, password: string): Promise<any>;
	decrypt(encryptedphrase: any, password: string): Promise<string>;
}