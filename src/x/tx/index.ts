import {ClientInterfce} from '../../client';
import {MsgSend, TxType} from '../../types/Msgs';
import {Coin} from '../../types/types';
import {SigningTool} from '../../utils/signing';
import {HexEncoded} from '../types/aliases';
import {TxRaw} from '../types/TxRaw';

export class Tx {
  private client: ClientInterfce;
  private signingTool: SigningTool;
  constructor(client: ClientInterfce, signingTool: SigningTool) {
    this.client = client;
    this.signingTool = signingTool;
  }

  async wrapTxInMetaData(msgs: any[], baseTx: any) {
    const accountInfo = await this.client.auth.baseTx(baseTx.from, baseTx);
    const txRaw: TxRaw = new TxRaw(
      msgs,
      baseTx.pub_key,
      baseTx.memo,
      baseTx.chainId,
      accountInfo.accountNumber,
      accountInfo.sequence
    );
  }

  buildSignSend(msgs: any[], baseTx: any) {
    const unsignedTx = this.wrapTxInMetaData(msgs, baseTx);
  }

  async sign(txRaw: TxRaw) {
    // add checks and throws
    const {
      privateKey: priv_key,
      publicKey: pub_key,
    } = this.client.wallet.retrieveKeys('asd');
    const signDoc = txRaw.getSignDocForSigning();

    return this.signingTool.signTx(signDoc, { priv_key, pub_key });
  }
}
