import {Base64Encoded, HexEncoded} from '../types/aliases';
import {StdSignature} from '../types/types';
import {StdSignMsg} from '../x/tx/tx.module';
import {sha256} from './hashing.tools';

const secp256k1 = require('secp256k1') as typeof import('secp256k1');

const tendermintBelt = require('@tendermint/belt') as typeof import('@tendermint/belt');

interface KeyPair {
  pub_key: string;
  priv_key: string;
}

export class SigningTools {
  hexToBytes;
  constructor(hexToBytes) {
    this.hexToBytes = hexToBytes;
  }

  signTx = (tx: StdSignMsg, keys: KeyPair): StdSignMsg => {
    const signMsg = this.createSignMsg(tx);
    const signature = this.generateSignature(signMsg, keys);
    const signatures = tx.signatures?.length
      ? [...tx.signatures, signature]
      : [signature];
    return { ...signMsg, signatures };
  };

  verifyTx = (tx: StdSignMsg): boolean => {
    const signMsg = this.createSignMsg(tx);
    return this.verifyTxSignatures(signMsg, tx.signatures);
  };

  createSignMsg = (tx: StdSignMsg) => {
    return {
      msgs: tx.msgs,
      pub_key: tx.pub_key,
      fee: tx.fee,
      memo: tx.memo,
      chainId: tx.chainId,
      accountNumber: tx.accountNumber,
      sequence: tx.sequence,
    };
  };
  static signatureForSignDoc = async (
    signDoc: Buffer,
    priv_key: Uint8Array
  ): Promise<Base64Encoded> => {
    // TODO standardize the params
    const msgHashed = await sha256(signDoc);
    const msgHasheedUintArr = new Uint8Array(msgHashed);
    const { signature } = secp256k1.ecdsaSign(msgHasheedUintArr, priv_key);
    return Buffer.from(signature).toString('base64');
  };
  generateSignature = async (signMsg, keys: KeyPair): Promise<StdSignature> => {
    const { priv_key, pub_key } = keys;
    const signedMsgBytes = await this.createSignedMessageBytes(
      signMsg,
      this.hexToBytes(priv_key)
    );

    return {
      signature: tendermintBelt.bytesToBase64(signedMsgBytes),
      pub_key: {
        type: 'tendermint/PubKeySecp256k1',
        value: tendermintBelt.bytesToBase64(this.hexToBytes(pub_key)),
      },
    };
  };
  createSignedMessageBytes = async (
    signMsg,
    privateKey: Uint8Array
  ): Promise<Uint8Array> => {
    const msgInBytesFormat = tendermintBelt.toCanonicalJSONBytes(signMsg);
    return await this.hashAndSignBytesWithPrivateKey(
      msgInBytesFormat,
      privateKey
    );
  };
  hashAndSignBytesWithPrivateKey = async (
    bytes: Uint8Array,
    key: Uint8Array
  ): Promise<Uint8Array> => {
    const hash = await sha256(bytes);
    const uintArr = new Uint8Array(hash);
    const { signature } = secp256k1.ecdsaSign(uintArr, key);
    return signature;
  };
  verifySignedBytes = async (signMsg, signature, pub_key): Promise<boolean> => {
    const bytes = tendermintBelt.toCanonicalJSONBytes(signMsg);
    const hash = await sha256(bytes);
    const uintArr = new Uint8Array(hash);

    return secp256k1.ecdsaVerify(signature, uintArr, pub_key);
  };
  verifySingleSignature = async (signMsg, signature): Promise<boolean> => {
    const signedBytes = tendermintBelt.base64ToBytes(signature.signature);
    const pub_key = tendermintBelt.base64ToBytes(
      signature.pub_key?.value || signature.pub_key
    );

    return await this.verifySignedBytes(signMsg, signedBytes, pub_key);
  };

  verifyTxSignatures = (signMsg, signatures): boolean => {
    if (!signatures.length) {
      return false;
    }
    for (let i = 0; i < signatures.length; i++) {
      if (!this.verifySingleSignature(signMsg, signatures[i])) {
        return false;
      }
    }

    return true;
  };
}

const hexToBuffer = (hex: HexEncoded): ArrayBuffer => {
  const hexString = hex.replace(/^0x/, '');
  if (hexString.length % 2 != 0) {
    throw new Error('Invalid hex. Length must be a multiple of 2.');
  }
  const nonHexChars = hexString.match(/[G-Zg-z\s]/i);
  if (nonHexChars) {
    throw new Error('Invalid hex. Contains invalid characters.');
  }

  const octets = hexString.match(/[\dA-Fa-f]{2}/gi);
  const decimalNumbers = octets.map(s => {
    return parseInt(s, 16);
  });

  const array = new Uint8Array(decimalNumbers);

  return array.buffer;
};

const signingToolFactory = () => {
  const tool = new SigningTools(hexToBuffer);
  return tool;
};

export default signingToolFactory();
