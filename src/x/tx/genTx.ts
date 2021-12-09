import {bech32} from 'bech32';

import * as pbs from '../../types/proto';
import {HexEncoded, ProtoBuffObject} from '../types/aliases';

interface Coin {
  denom: string;
  amount: string;
}

interface Fee {
  amount: Coin[];
  gas: string;
}

export class GeneralTxTools {
  static createAny(type, value): ProtoBuffObject {
    let anyPb = new pbs.any_pb.Any();
    anyPb.setTypeUrl(`/${type}`);
    anyPb.setValue(value.serializeBinary());
    return anyPb;
  }
  static createCoin({ denom, amount }: Coin) {
    let coin = pbs.base_coin_pb.Coin();
    coin.setDenom(denom);
    coin.setAmount(amount);
    return coin;
  }

  static createFee(amounts: Coin[], gas: string): ProtoBuffObject {
    let fee = new pbs.tx_tx_pb.Fee();
    fee.setGasLimit(gas);
    amounts.forEach(el => {
      const coin = GeneralTxTools.createCoin(el);
      fee.addAmount(coin);
    });
    return fee;
  }
  static populateSignerInfo(sequence: number, pubKey: string): ProtoBuffObject {
    let singleSigner = new pbs.tx_tx_pb.ModeInfo.Single();
    singleSigner.setMode(pbs.signing_signing_pb.SignMode.SIGN_MODE_DIRECT);
    let modeInfo = new pbs.tx_tx_pb.ModeInfo();
    modeInfo.setSingle(singleSigner);
    let signerInfo = new pbs.tx_tx_pb.SignerInfo();
    signerInfo.setModeInfo(modeInfo);
    signerInfo.setSequence(sequence);
    let pubKeyProto = GeneralTxTools.populatePubKey(pubKey);
    signerInfo.setPublicKey(pubKeyProto);

    return signerInfo;
  }
  static populatePubKey(pubKey: HexEncoded): ProtoBuffObject {
    // TODO support other types of keys
    const pbech = GeneralTxTools.getHexPubkey(pubKey);
    const pubKeyProto: ProtoBuffObject = pbs.crypto_secp256k1_keys_pb.PubKey();
    pubKeyProto.setPubKey(Buffer.from(pbech, 'hex'));
    // check key type
    return GeneralTxTools.createAny(
      'cosmos.crypto.secp256k1.PubKey',
      pubKeyProto.serializeBinary()
    );
  }
  static getHexPubkey(pubkey: HexEncoded): HexEncoded {
    try {
      let pk = bech32.decode(pubkey);
      pubkey = Buffer.from(bech32.fromWords(pk.words))
        .toString('hex')
        .toUpperCase();
    } catch (e) {}
    return pubkey.toUpperCase();
  }

  static populateAuthInfo(
    fee: Fee,
    pubKey: HexEncoded,
    sequence?: number
  ): ProtoBuffObject {
    let feeModel = GeneralTxTools.createFee(fee.amount, fee.gas);
    let authInfo = new pbs.tx_tx_pb.AuthInfo();
    authInfo.setFee(feeModel);
    let signerInfo = GeneralTxTools.populateSignerInfo(sequence, pubKey);
    authInfo.addSignerInfos(signerInfo);
    return authInfo;
  }

  static populateTxBody(msgs, memo, timeoutHeight?: number): ProtoBuffObject {
    let body = new pbs.tx_tx_pb.TxBody();
    msgs.forEach(msg => {
      body.addMessages(
        GeneralTxTools.createAny(msg.type, msg.serializeBinary())
      );
    });
    body.setMemo(memo);
    body.setTimeoutHeight(timeoutHeight);
    return body;
  }
}
