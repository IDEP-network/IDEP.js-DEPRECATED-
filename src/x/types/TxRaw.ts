import * as pbs from '../../types/proto';
import {StdFee} from '../../types/types';
import {sha256} from '../../utils/hashing';
import {GeneralTxTools} from '../tx/genTx';
import {HexEncoded} from './aliases';

type ProtoBuffBytes = any;

interface TxBody {
  messages: any[];
  memo?: string;
  timeout_height?: number;
  extension_options?: any[]; // adr-20 recommendation
}

class TxBody {
  messages: any[];
  memo?: string;
  timeout_height?: number;
  extension_options?: any[]; // adr-20 recommendation
  constructor(
    messages: any[],
    memo?: string,
    timeout_height?: number,
    extension_options?: any[]
  ) {
    this.messages = messages;
    this.memo = memo;
    this.timeout_height = timeout_height;
    this.extension_options = extension_options;
  }
  protobuffEncoded() {
    let body = new pbs.tx_tx_pb.TxBody();
    this.messages.forEach(msg => {
      body.addMessages(
        GeneralTxTools.createAny(msg.type, msg.protoBuffObject())
      );
    });
    body.setMemo(this.memo || 'Default memo');
    body.setTimeoutHeight(this.timeout_height ?? 0);
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
  protobuffEncoded() {
    let singleSigner = new pbs.tx_tx_pb.ModeInfo.Single();
    singleSigner.setMode(pbs.signing_signing_pb.SignMode.SIGN_MODE_DIRECT);
    let modeInfo = new pbs.tx_tx_pb.ModeInfo();
    modeInfo.setSingle(singleSigner);
    let signerInfo = new pbs.tx_tx_pb.SignerInfo();
    signerInfo.setModeInfo(modeInfo);
    signerInfo.setSequence(this.sequence);
    const proto_public_key = GeneralTxTools.populatePubKey(this.public_key);
    signerInfo.setPublicKey(proto_public_key);
    return signerInfo;
  }
}
class AuthInfo {
  signer_info: SignerInfo; // add multiple SignerInfo
  fee: StdFee;
  constructor(public_key: HexEncoded, sequence: number, fee: StdFee) {
    this.signer_info = new SignerInfo(public_key, sequence);
    this.fee = fee;
  }
  protobuffEncoded() {
    let feeModel = GeneralTxTools.createFee(this.fee.amount, this.fee.gas);
    let authInfo = new pbs.tx_tx_pb.AuthInfo();
    authInfo.setFee(feeModel);
    authInfo.addSignerInfos(this.signer_info.protobuffEncoded());
    return authInfo;
  }
}

export class TxRaw {
  body: TxBody;
  auth_info: AuthInfo;
  signatures: ProtoBuffBytes[] = [];
  chainId: 'SanfordNetwork';
  account_number: number;
  constructor(body: TxBody, auth_info: AuthInfo, account_number: number) {
    this.body = body;
    this.auth_info = auth_info;
    this.account_number = account_number;
    this.signatures = [];
  }
  getSignDoc() {
    let signDoc = new pbs.tx_tx_pb.SignDoc();
    signDoc.setBodyBytes(this.body.protobuffEncoded().serializeBinary());
    signDoc.setAuthInfoBytes(
      this.auth_info.protobuffEncoded().serializeBinary()
    );
    signDoc.setAccountNumber(this.account_number);
    signDoc.setChainId(this.chainId);
    return signDoc;
  }
  sign(signature) {
    this.signatures = this.signatures.concat(signature);
  }
  getRaw() {
    let txRaw = new pbs.tx_tx_pb.TxRaw();
    txRaw.setBodyBytes(this.body.protobuffEncoded().serializeBinary());
    txRaw.setAuthInfoBytes(this.auth_info.protobuffEncoded().serializeBinary());
    this.signatures.forEach(el => {
      txRaw.addSignatures(el);
    });
    return txRaw;
  }
  getData = (): Uint8Array => {
    let tx = new pbs.tx_tx_pb.Tx();
    tx.setBody(this.body.protobuffEncoded());
    tx.setAuthInfo(this.auth_info.protobuffEncoded());
    this.signatures.forEach(signature => {
      tx.addSignatures(signature);
    });
    console.log(JSON.parse(tx));
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
  addBody(
    messages: any[],
    memo: string = 'Default',
    timeout_height: number = 0,
    extension_options?: any
  ) {
    this.body = new TxBody(messages, memo, timeout_height, extension_options);
  }
  addAuthInfo(
    public_key: HexEncoded,
    sequence: number = 0,
    fee: StdFee = { gas: '100000', amount: [{ denom: 'idep', amount: '500' }] }
  ) {
    this.auth_info = new AuthInfo(public_key, sequence, fee);
  }
  buildTx(account_number) {
    return new TxRaw(this.body, this.auth_info, account_number);
  }
}

/*

export class TxRaw {
  baseTransaction: any;
  txBody: TxBody;
  authInfo: AuthInfo;
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

  // https://github.com/cosmos/cosmos-sdk/blob/v0.40.0-rc6/docs/architecture/adr-020-protobuf-transaction-encoding.md
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
*/
