import * as pbs from '../../types/proto';
import {StdFee} from '../../types/types';
import {sha256} from '../../utils/hashing';
import {GeneralTxTools} from '../tx/genTx';
import {HexEncoded} from './aliases';

export class TxRaw {
  baseTransaction: any;
  txBody: any;
  authInfo: any;
  signatures: any;
  constructor(
    msgs: any,
    pub_key: HexEncoded,
    fee: StdFee = { gas: '100000', amount: [{ denom: 'idep', amount: '500' }] },
    memo: string,
    chainId?: string,
    accountNumber?: number,
    sequence?: number
  ) {
    this.baseTransaction = {
      msgs,
      pub_key,
      fee,
      memo,
      chainId,
      accountNumber,
      sequence,
    };
    this.txBody = GeneralTxTools.populateTxBody(msgs, memo, 0);
    this.authInfo = GeneralTxTools.populateAuthInfo(fee, pub_key, sequence);
  }

  getSignDocForSigning(accountNumber?: number, chainId?: string) {
    let signDoc = new pbs.tx_tx_pb.SignDoc();
    signDoc.setBodyBytes(this.txBody.serializeBinary());
    signDoc.setAuthInfoBytes(this.authInfo.serializeBinary());
    signDoc.setAccountNumber(
      accountNumber ?? this.baseTransaction.accountNumber
    );
    signDoc.setChainId(chainId || this.baseTransaction.chainId);
    return signDoc;
  }

  addSignature(signature) {
    this.signatures = this.signatures.concat(signature);
  }

  //  Used for  signing, broadcasting, veereification.
  getRaw() {
    let txRaw = new pbs.tx_tx_pb.TxRaw();
    txRaw.setBodyBytes(this.txBody.serializeBinary());
    txRaw.setAuthInfoBytes(this.authInfo.serializeBinary());
    this.signatures.forEach(el => {
      txRaw.addSignatures(el);
    });
    return txRaw;
  }

  // Used for jswon-rpc.
  getData(): Uint8Array {
    let tx = new pbs.tx_tx_pb.Tx();
    tx.setBody(this.txBody);
    tx.setAuthInfo(this.authInfo);
    this.signatures.forEach(signature => {
      tx.addSignatures(signature);
    });
    return tx.serializeBinary();
  }

  addPubKey(key, sequence?: number) {
    sequence = sequence ?? this.baseTransaction.sequence ?? 0;
    let signerInfo = GeneralTxTools.populateSignerInfo(sequence, key);
    this.authInfo.addSignerInfos(signerInfo);
  }

  async calculateTxHash(): Promise<HexEncoded> {
    const txRaw = this.getRaw();
    const hashed = await sha256(txRaw.serializeBinary());
    const hashedUpperCase = hashed.toString('hex').toUpperCase();
    return hashedUpperCase;
  }
}
