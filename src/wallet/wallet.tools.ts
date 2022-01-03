import * as walletCreationTool from './wallet.helper';



export class WalletTools {
	static async generateWallet() {
			const mnemonic = await walletCreationTool.generateMnemonic();
			const {
					privateKey,
					publicKey,
					address,
			} = await WalletTools.generateFromSeed(mnemonic);
			return { mnemonic, privateKey, publicKey, address };
	}
	static async recoverFromMnemonics(mnemonic: string) {
			return WalletTools.generateFromSeed(mnemonic);
	}
	static async generateFromSeed(mnemonic: string) {
			const privateKey = await walletCreationTool.generatePrivateKeyFromMnemonic(
					mnemonic
			);
			const publicKey = walletCreationTool.derivePublicKeyFromPrivateKey(
					privateKey
			);
			const address = await walletCreationTool.getAddressFromPublicKey(publicKey);
			return { privateKey, publicKey, address };
	}
	static async recoverFromPrivateKey(privateKey: string) {
			const publicKey = walletCreationTool.derivePublicKeyFromPrivateKey(
					Buffer.from(privateKey, 'hex')
			);
			const address = await walletCreationTool.getAddressFromPublicKey(publicKey);
			return { privateKey, publicKey, address };
	}
}
