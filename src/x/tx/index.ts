import {ClientInterface} from '../../client';
import {StdFee} from '../../types/types';
import {SigningTool} from '../../utils/signing-tool';
import {HexEncoded, ProtoBuffObject} from '../types/aliases';
import {TxFactory} from '../types/TxRaw';

export class Tx {
  private client: ClientInterface;
  constructor(client: ClientInterface) {
    this.client = client;
  }

  async createTxRaw(msgs: any[], baseTx: any) {
    const accountInfo = await this.client.auth.baseTx(baseTx.from);
    const txFactory = new TxFactory();
    txFactory.addBody(msgs, baseTx.memo);
    const publicKey = baseTx.pub_key || this.client.wallet.publicKey;
    txFactory.addAuthInfo(publicKey, accountInfo.sequence, baseTx.fee);
    const txRaw = txFactory.buildTx(accountInfo.accountNumber);
    return txRaw;
  }

  buildSignSend = async (msgs: any[], baseTx: any) => {
    const unsignedTxRaw = await this.createTxRaw(msgs, baseTx);
    const privateKey = await this.client.wallet.getPrivateKey(baseTx.password);
    const signature = await this.sign(
      unsignedTxRaw.getSignDoc(),
      new Uint8Array(Buffer.from(privateKey, 'hex'))
    );
    unsignedTxRaw.sign(signature);
    const readyForSending = unsignedTxRaw.getRaw();
    return this.client.rpc.send(readyForSending.serializeBinary());
  };

  async sign(signDoc: ProtoBuffObject, priv_key: Uint8Array) {
    // add checks and throws
    // const privateKey = await this.client.wallet.getPrivateKey(
    // this.client.configuration.accountWallet,
    // this.client.configuration.password
    //);

    return await SigningTool.signatureForSignDoc(
      Buffer.from(signDoc.serializeBinary(), 'binary'),
      priv_key
    );
  }
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

  }
}
