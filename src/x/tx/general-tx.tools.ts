import Long from 'long';

import {HexEncoded, ProtoBufObject} from '../../types/aliases';
import * as pbs from '../../types/proto';

if (process.envType === 'browser') {
  var Buffer = require('buffer/').Buffer;
} else {
  var Buffer = require('buffer').Buffer;
}
interface Coin {
  denom: string;
  amount: string;
}

export class GeneralTxTools {
  static createAny(type: string, value: any): ProtoBufObject {
    let anyPb = new pbs.any_pb.Any();
    anyPb.setTypeUrl(`/${type}`);
    anyPb.setValue(value);
    return anyPb;
  }
  static createCoin({ denom, amount }: Coin) {
    let coin = new pbs.base_coin_pb.Coin();
    coin.setDenom(denom);
    coin.setAmount(amount);
    return coin;
  }

  static createFee(amounts: Coin[], gas: any): ProtoBufObject {
    let fee = new pbs.tx_tx_pb.Fee();
    fee.setGasLimit(Long.fromString(gas));
    amounts.forEach(el => {
      const coin = GeneralTxTools.createCoin(el);
      fee.addAmount(coin);
    });
    return fee;
  }
  static populatePubKey(pubKey: HexEncoded): ProtoBufObject {
    // TODO support other types of keys
    const pbech = GeneralTxTools.getHexPubkey(pubKey);
    const pubKeyProto: ProtoBufObject = new pbs.crypto_secp256k1_keys_pb.PubKey();
    pubKeyProto.setKey(new Uint8Array(pbech));
    return GeneralTxTools.createAny(
      'cosmos.crypto.secp256k1.PubKey',
      pubKeyProto.serializeBinary()
    );
  }
  static getHexPubkey(pubKey: HexEncoded): Buffer {
    const pubk = Buffer.from(pubKey, 'hex');
    return pubk;
  }
}
