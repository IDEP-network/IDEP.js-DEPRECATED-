import Long from 'long';

import {sha256} from '../../cryptography/hashing.tools';
import {HexEncoded, ProtoBufBytes} from '../../types/aliases';
import * as pbs from '../../types/proto';
import {StdFee} from '../../types/types';
import {GeneralTxTools} from './general-tx.tools';

interface TxBody {
  messages: any[];
  memo?: string;
  timeout_height?: number;
  // extension_options?: any[]; // adr-20 recommendation
}

class TxBody {
  messages: any[];
  memo?: string;
  timeout_height?: number;
  //extension_options?: any[]; // adr-20 recommendation
  constructor(
    messages: any[],
    memo?: string,
    timeout_height?: number
    // extension_options?: any[]
  ) {
    this.messages = messages;
    this.memo = memo;
    this.timeout_height = timeout_height;
    //this.extension_options = extension_options;
  }
  protobufEncoded() {
    let body = new pbs.tx_tx_pb.TxBody();
    const msgs = this.messages.map(msg => {
      return GeneralTxTools.createAny(
        msg.type,
        msg.protoBuffObject().serializeBinary()
      );
    });
    body.setMessagesList(msgs);
    body.setMemo(this.memo || null);
    body.setTimeoutHeight(this.timeout_height || null);
    return body;
  }
}

class SignerInfo {
  public_key: any;
  mode_info: {
    mode: 'SIGN_MODE_DIRECT';
    type: 'single';
  };
  sequence: number;
  constructor(public_key: HexEncoded, sequence: number) {
    this.public_key = public_key;
    this.sequence = sequence;
  }
  protobufEncoded() {
    let singleSigner = new pbs.tx_tx_pb.ModeInfo.Single();
    singleSigner.setMode(pbs.signing_signing_pb.SignMode.SIGN_MODE_DIRECT);
    let modeInfo = new pbs.tx_tx_pb.ModeInfo();
    modeInfo.setSingle(singleSigner);
    let signerInfo = new pbs.tx_tx_pb.SignerInfo();
    const proto_public_key = GeneralTxTools.populatePubKey(this.public_key);
    signerInfo.setPublicKey(proto_public_key);
    signerInfo.setModeInfo(modeInfo);
    signerInfo.setSequence(Long.fromNumber(this.sequence ?? 0));

    return signerInfo;
  }
}
class AuthInfo {
  signer_info: SignerInfo; // add multiple SignerInfos
  fee: StdFee;
  constructor(public_key: HexEncoded, sequence: number, fee: StdFee) {
    this.signer_info = new SignerInfo(public_key, sequence);
    this.fee = fee;
  }
  protobufEncoded() {
    let feeModel = GeneralTxTools.createFee(this.fee.amount, this.fee.gas);
    let authInfo = new pbs.tx_tx_pb.AuthInfo();
    authInfo.addSignerInfos(this.signer_info.protobufEncoded());
    authInfo.setFee(feeModel);
    console.log(authInfo);
    return authInfo;
  }
}

export class TxRaw {
  body: TxBody;
  auth_info: AuthInfo;
  signatures: ProtoBufBytes[];
  chainId: string = 'SanfordNetwork';
  account_number: number;
  constructor(body: TxBody, auth_info: AuthInfo, account_number: number) {
    this.body = body;
    this.auth_info = auth_info;
    this.account_number = account_number;
    this.signatures = [];
  }
  getSignDoc = () => {
    let signDoc = new pbs.tx_tx_pb.SignDoc();
    signDoc.setBodyBytes(this.body.protobufEncoded().serializeBinary());
    signDoc.setAuthInfoBytes(
      this.auth_info.protobufEncoded().serializeBinary()
    );
    signDoc.setChainId(this.chainId);
    signDoc.setAccountNumber(Long.fromNumber(this.account_number) ?? null);
    return signDoc;
  };
  sign = signature => {
    this.signatures = this.signatures.concat(signature);
  };
  getRaw = () => {
    let txRaw = new pbs.tx_tx_pb.TxRaw();
    txRaw.setBodyBytes(this.body.protobufEncoded().serializeBinary());
    txRaw.setAuthInfoBytes(this.auth_info.protobufEncoded().serializeBinary());
    this.signatures.forEach(el => {
      txRaw.addSignatures(new Uint8Array(Buffer.from(el, 'base64')));
    });
    return txRaw;
  };
  getData = (): Uint8Array => {
    let tx = new pbs.tx_tx_pb.Tx();
    tx.setBody(this.body.protobufEncoded());
    tx.setAuthInfo(this.auth_info.protobufEncoded());
    this.signatures.forEach(signature => {
      tx.addSignatures(new Uint8Array(Buffer.from(signature, 'base64')));
    });
    return tx.serializeBinary();
  };
  async calculateTxHash(): Promise<HexEncoded> {
    const txRaw = this.getRaw();
    const hashed = await sha256(txRaw.serializeBinary());
    const hashedUpperCase = hashed.toString('hex').toUpperCase();
    return hashedUpperCase;
  }
}
export class TxFactory {
  body: TxBody;
  auth_info: AuthInfo;
  addBody(messages: any[], memo?: string, timeout_height?: number) {
    this.body = new TxBody(messages, memo, timeout_height);
  }
  addAuthInfo(
    public_key: HexEncoded,
    sequence: number,
    fee: StdFee,
  ) {
    this.auth_info = new AuthInfo(public_key, sequence, fee);
  }
  buildTx(account_number) {
    return new TxRaw(this.body, this.auth_info, account_number);
  }
}
