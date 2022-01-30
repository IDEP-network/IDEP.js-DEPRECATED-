import {Base64Encoded, HexEncoded, ProtoBufObject, ProtoBufType} from '../types/aliases';
import {HttpClient, HttpClientInterface} from './http.client';

if (process.envType === 'browser') {
  var Buffer = require('buffer/').Buffer;
} else {
  var Buffer = require('buffer').Buffer;
}
export class JsonRpc {
  url: string;
  http: HttpClientInterface;
  constructor(httpClient: typeof HttpClient, httpUrl: string) {
    this.url = httpUrl;
    this.http = new httpClient(this.url);
  }
  // meethod - enum
  async request(method: string, params: QueryParams | TxParams) {
    const data = {
      jsonrpc: '2.0',
      id: 'jsonrpc-client', // i think so?
      method,
      params,
    };
    const response: any = await this.http.post(data);
    return response;
  }
  async abciQuery(
    path: string,
    query: ProtoBufObject,
    protoResponse?: ProtoBufType
  ) {
    const params: QueryParams = {
      path,
      data: Buffer.from(query.serializeBinary()).toString('hex'),
    };
    const response = await this.request('abci_query', params);
    const {
      result: {
        response: { value },
      },
    } = response;
    const decoded = protoResponse
      ? protoResponse.deserializeBinary(value).toObject()
      : JSON.parse(Buffer.from(value, 'base64').toString());
    return decoded;
  }
  async send(txBytes: ProtoBufObject, method: string = 'broadcast_tx_sync') {
    // TODO normalize return type
    const params: TxParams = {
      tx: Buffer.from(txBytes, 'binary').toString('base64'),
    };
    const response = await this.request(method, params);
    if (method !== 'broadcast_tx_commit') {
      const {
        result: { hash },
      } = response;
      return `Tx hash ${hash}`;
    }
    const {
      result: {
        deliver_tx: { log },
      },
    } = response;
    return log;
  }
  async checkTx(txHash: HexEncoded) {
    // TODO improve
    const fetchedTx = await this.http.get(`/tx?hash=0x${txHash.toUpperCase()}`);
    const { result } = fetchedTx;
    return result;
  }
  async simulate(txBytes, protoResponse?: any, method: string = 'abci_query') {
    const params: QueryParams = {
      path: '/app/simulate',
      data: `${Buffer.from(txBytes, 'binary').toString('hex')}`,
    };
    const response = await this.request(method, params);
    console.log(response);
    const {
      result: {
        response: { value },
      },
    } = response;
    const decoded = protoResponse
      ? protoResponse.deserializeBinary(value).toObject()
      : JSON.parse(Buffer.from(value, 'base64').toString());
    return decoded;
  }
}

interface QueryParams {
  path: string;
  data: HexEncoded;
}

interface TxParams {
  tx: Base64Encoded;
}
