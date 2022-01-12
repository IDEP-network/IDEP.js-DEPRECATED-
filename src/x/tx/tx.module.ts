import {Buffer} from 'buffer/';

import {ClientInterface} from '../../client/client';
import {SigningTools} from '../../cryptography/signing.tools';
import {HexEncoded, ProtoBufObject} from '../../types/aliases';
import {StdFee, TxDetails} from '../../types/types';
import {TxFactory} from './tx-raw';

export class Tx {
  private client: ClientInterface;
  constructor(client: ClientInterface) {
    this.client = client;
  }

  async createTxRaw(msgs: any[], txDetails: TxDetails) {
    const accountInfo = await this.client.auth.getAccountData(txDetails.from);
    const txFactory = new TxFactory();
    txFactory.addBody(msgs, txDetails.memo);
    const publicKey = txDetails.pub_key || this.client.wallet.publicKey;
    const fee = isObjectEmpty(txDetails.fee) ? this.client.fee : txDetails.fee;
    console.log(fee);
    txFactory.addAuthInfo(publicKey, accountInfo.sequence, fee);
    const txRaw = txFactory.buildTx(accountInfo.accountNumber);
    return txRaw;
  }

  buildSignSend = async (msgs: any[], txDetails: any) => {
    const unsignedTxRaw = await this.createTxRaw(msgs, txDetails);
    const privateKey = await this.client.wallet.getPrivateKey(txDetails.password);
    const signature = await this.sign(
      unsignedTxRaw.getSignDoc(),
      new Uint8Array(Buffer.from(privateKey, 'hex'))
    );
    unsignedTxRaw.sign(signature);
    const readyForSending = unsignedTxRaw.getRaw();
    return this.client.rpc.simulate(readyForSending.serializeBinary());
  };

  async sign(signDoc: ProtoBufObject, priv_key: Uint8Array) {
    // add checks and throws
    return await SigningTools.signatureForSignDoc(
      Buffer.from(signDoc.serializeBinary(), 'binary'),
      priv_key
    );
  }
}
export interface StdSignMsg {
  accountNumber: string;
  sequence?: string;
  chainId?: string;
  fee?: StdFee;
  memo?: string;
  signatures?: any[];
  msgs?: any[];
  pub_key: HexEncoded;
}

const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}
