import { KeyPair } from '../src/types/account';
import * as crypto from '../src/utils/crypto';

const readyPrivateKey = Buffer.from([
  16, 171, 177, 40, 42, 136, 102, 206, 82, 141, 58, 122, 219, 214, 78, 231, 38,
  220, 107, 247, 13, 131, 252, 158, 169, 74, 85, 210, 171, 181, 37, 0,
]);

const readyPublicKey = Buffer.from([
  2, 33, 241, 210, 142, 181, 241, 226, 119, 100, 254, 82, 152, 7, 164, 138, 117,
  167, 36, 218, 57, 126, 157, 196, 55, 67, 78, 105, 13, 142, 89, 36, 110,
]);

const readyAddress = 'idep19hv30xxwzk3q04h9jh4ct7z09tutuhst5jewev';

const keys: KeyPair = {
  public: readyPublicKey,
  private: readyPrivateKey,
};

const tx = {
  message: [
    {
      type: 'cosmos-sdk/MsgSend',
      value: {
        from_address: readyAddress,
        to_address: readyAddress,
        amount: [
          {
            denom: 'stake',
            amount: '1000000',
          },
        ],
      },
    },
  ],
  fee: {
    amount: [
      {
        denom: 'stake',
        amount: '1',
      },
    ],
    gas: '100',
  },
  memo: 'This is a test.',
};

const signMeta = {
  accountNumber: '1',
  chainId: 'idep',
  sequence: '0',
};

const knownSignMsg = {
  account_number: signMeta['accountNumber'],
  chain_id: signMeta['chainId'],
  fee: tx['fee'],
  memo: tx['memo'],
  msgs: tx['message'],
  sequence: signMeta['sequence'],
};

const knownStdSignature = {
  signature:
    'Xjgzv+0rShN0jYKvBnQbVFbTYWvyqNWZ8X9d4rZXvbcPJ1kVBNDPSNkFRMYdPA60of8SEaMeEx/5EJXD/LpM7g==',
  publicKey: {
    type: 'tendermint/PubKeySecp256k1',
    value: 'AiHx0o618eJ3ZP5SmAekinWnJNo5fp3EN0NOaQ2OWSRu',
  },
};

const knownStdTx = {
  ...tx,
  signatures: [knownStdSignature],
};

const readyMsgBytes = Buffer.from([
  123, 34, 97, 99, 99, 111, 117, 110, 116, 95, 110, 117, 109, 98, 101, 114, 34,
  58, 34, 49, 34, 44, 34, 99, 104, 97, 105, 110, 95, 105, 100, 34, 58, 34, 105,
  100, 101, 112, 34, 44, 34, 102, 101, 101, 34, 58, 123, 34, 97, 109, 111, 117,
  110, 116, 34, 58, 91, 123, 34, 97, 109, 111, 117, 110, 116, 34, 58, 34, 49,
  34, 44, 34, 100, 101, 110, 111, 109, 34, 58, 34, 115, 116, 97, 107, 101, 34,
  125, 93, 44, 34, 103, 97, 115, 34, 58, 34, 49, 48, 48, 34, 125, 44, 34, 109,
  101, 109, 111, 34, 58, 34, 84, 104, 105, 115, 32, 105, 115, 32, 97, 32, 116,
  101, 115, 116, 46, 34, 44, 34, 109, 115, 103, 115, 34, 58, 91, 123, 34, 116,
  121, 112, 101, 34, 58, 34, 99, 111, 115, 109, 111, 115, 45, 115, 100, 107, 47,
  77, 115, 103, 83, 101, 110, 100, 34, 44, 34, 118, 97, 108, 117, 101, 34, 58,
  123, 34, 97, 109, 111, 117, 110, 116, 34, 58, 91, 123, 34, 97, 109, 111, 117,
  110, 116, 34, 58, 34, 49, 48, 48, 48, 48, 48, 48, 34, 44, 34, 100, 101, 110,
  111, 109, 34, 58, 34, 115, 116, 97, 107, 101, 34, 125, 93, 44, 34, 102, 114,
  111, 109, 95, 97, 100, 100, 114, 101, 115, 115, 34, 58, 34, 105, 100, 101,
  112, 49, 57, 104, 118, 51, 48, 120, 120, 119, 122, 107, 51, 113, 48, 52, 104,
  57, 106, 104, 52, 99, 116, 55, 122, 48, 57, 116, 117, 116, 117, 104, 115, 116,
  53, 106, 101, 119, 101, 118, 34, 44, 34, 116, 111, 95, 97, 100, 100, 114, 101,
  115, 115, 34, 58, 34, 105, 100, 101, 112, 49, 57, 104, 118, 51, 48, 120, 120,
  119, 122, 107, 51, 113, 48, 52, 104, 57, 106, 104, 52, 99, 116, 55, 122, 48,
  57, 116, 117, 116, 117, 104, 115, 116, 53, 106, 101, 119, 101, 118, 34, 125,
  125, 93, 44, 34, 115, 101, 113, 117, 101, 110, 99, 101, 34, 58, 34, 48, 34,
  125,
]);

const readyMsgSignature = Buffer.from([
  94, 56, 51, 191, 237, 43, 74, 19, 116, 141, 130, 175, 6, 116, 27, 84, 86, 211,
  97, 107, 242, 168, 213, 153, 241, 127, 93, 226, 182, 87, 189, 183, 15, 39, 89,
  21, 4, 208, 207, 72, 217, 5, 68, 198, 29, 60, 14, 180, 161, 255, 18, 17, 163,
  30, 19, 31, 249, 16, 149, 195, 252, 186, 76, 238,
]);

describe('Signatures', () => {
  describe('signTx works', () => {
    it('with tx, signMeta, and keyPair', () => {
      const stdTx = crypto.signTx(tx, signMeta, keys);
      expect(stdTx).toEqual(knownStdTx);
    });
  });

  describe('create signMsg', () => {
    it('with tx and signMeta', () => {
      const signMsg = crypto.createSignMsg(tx, signMeta);
      expect(signMsg).toEqual(knownSignMsg);
    });
  });

  describe('generating signature  works', () => {
    it('with signMsg and keys', () => {
      const stdSignature = crypto.generateSignature(knownSignMsg, keys);
      expect(stdSignature).toEqual(knownStdSignature);
    });
  });

  describe('createSignedMessageBytes', () => {
    it('with signMsg and privateKey', () => {
      const signature = crypto.createSignedMessageBytes(
        knownSignMsg,
        readyPrivateKey
      );
      expect(Buffer.from(signature).toString('hex')).toBe(
        readyMsgSignature.toString('hex')
      );
    });
  });

  describe('sign', () => {
    it('with bytes and privateKey', () => {
      const signature = crypto.hashAndSignBytesWithPrivateKey(
        readyMsgBytes,
        readyPrivateKey
      );
      expect(Buffer.from(signature).toString('hex')).toBe(
        readyMsgSignature.toString('hex')
      );
    });
  });

  describe('verify signatures', () => {
    it('with stdTx and signMeta', () => {
      const valid = crypto.verifyTx(knownStdTx, signMeta);
      expect(valid).toBe(true);
    });

    // TODO

    it.skip('with invalid signatures', () => {});

    it.skip('with non-matching signatures', () => {});
  });

  describe('verify signatures', () => {
    it('with signMsg and signatures', () => {
      const valid = crypto.verifyTxSignatures(knownSignMsg, [
        knownStdSignature,
      ]);
      expect(valid).toBe(true);
    });

    it('with signMsg and empty signatures', () => {
      const valid = crypto.verifyTxSignatures(knownSignMsg, []);
      expect(valid).toBe(false);
    });
  });

  describe('verify  signature', () => {
    it('with signMsg and signature', () => {
      const valid = crypto.verifyTxSignatures(knownSignMsg, [
        knownStdSignature,
      ]);
      expect(valid).toBe(true);
    });
    it('with signMsg, signature, and publicKey', () => {
      const valid = crypto.verifySingleSignature(knownSignMsg, {
        signature: readyMsgSignature,
        publicKey: readyPublicKey,
      });
      expect(valid).toBe(true);
    });

    // TODO
    it.skip('with signMsg and invalid signature', () => {});

    it.skip('with signMsg and non-matching signature', () => {});
  });
});
