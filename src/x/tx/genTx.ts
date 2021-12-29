import Long from 'long';

import * as pbs from '../../types/proto';
import {HexEncoded, ProtoBuffObject} from '../types/aliases';

interface Coin {
  denom: string;
  amount: string;
}

export class GeneralTxTools {
  static createAny(type: string, value: any): ProtoBuffObject {
    let anyPb = new pbs.any_pb.Any();
    anyPb.setTypeUrl(`/${type}`);
    anyPb.setValue(value); //.serializeBinary());
    console.log(anyPb.serializeBinary());
    return anyPb;
  }
  static createCoin({ denom, amount }: Coin) {
    let coin = new pbs.base_coin_pb.Coin();
    coin.setDenom(denom);
    coin.setAmount(amount);
    return coin;
  }

  static createFee(amounts: Coin[], gas: any): ProtoBuffObject {
    let fee = new pbs.tx_tx_pb.Fee();
    fee.setGasLimit(Long.fromString(gas));

    amounts.forEach(el => {
      const coin = GeneralTxTools.createCoin(el);
      fee.addAmount(coin);
    });

    return fee;
  }
  static populatePubKey(pubKey: HexEncoded): ProtoBuffObject {
    // TODO support other types of keys
    const pbech = GeneralTxTools.getHexPubkey(pubKey);
    const pubKeyProto: ProtoBuffObject = new pbs.crypto_secp256k1_keys_pb.PubKey();
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
