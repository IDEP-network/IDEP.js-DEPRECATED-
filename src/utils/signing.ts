import {sha256} from 'js-sha256';

import {StdSignature} from '../types/types';
import {StdSignMsg} from '../x/tx';
import {HexEncoded} from '../x/types/aliases';

const secp256k1 = require('secp256k1') as typeof import('secp256k1');

const tendermintBelt = require('@tendermint/belt') as typeof import('@tendermint/belt');

interface KeyPair {
  pub_key: string;
  priv_key: string;
}

export class SigningTool {
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
      account_number: tx.account_number,
      chain_id: tx.chain_id,
      fee: tx.fee,
      memo: tx.memo,
      msg: tx.msg,
      sequence: tx.sequence,
    };
  };
  generateSignature = (signMsg, keys: KeyPair): StdSignature => {
    const { priv_key, pub_key } = keys;
    const signedMsgBytes = this.createSignedMessageBytes(
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
  createSignedMessageBytes = (signMsg, privateKey: Uint8Array): Uint8Array => {
    const msgInBytesFormat = tendermintBelt.toCanonicalJSONBytes(signMsg);
    return this.hashAndSignBytesWithPrivateKey(msgInBytesFormat, privateKey);
  };
  hashAndSignBytesWithPrivateKey = (
    bytes: Uint8Array,
    key: Uint8Array
  ): Uint8Array => {
    const hash = sha256.array(bytes);
    const uintArr = new Uint8Array(hash);
    const { signature } = secp256k1.ecdsaSign(uintArr, key);
    return signature;
  };
  verifySignedBytes = (signMsg, signature, pubKey): boolean => {
    const bytes = tendermintBelt.toCanonicalJSONBytes(signMsg);
    const hash = sha256.array(bytes);
    const uintArr = new Uint8Array(hash);

    return secp256k1.ecdsaVerify(signature, uintArr, pubKey);
  };
  verifySingleSignature = (signMsg, signature): boolean => {
    const signedBytes = tendermintBelt.base64ToBytes(signature.signature);
    const pubKey = tendermintBelt.base64ToBytes(
      signature.pub_key?.value || signature.pub_key
    );

    return this.verifySignedBytes(signMsg, signedBytes, pubKey);
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
  const tool = new SigningTool(hexToBuffer);
  return tool;
};

export default signingToolFactory();
