import {HttpClient} from './querying/HttpClient';

export class JsonRpc {
  httpUrl: string;
  http: HttpClient;
  constructor(httpClient, httpUrl: string = 'http://159.89.84.111:26657') {
    this.httpUrl = httpUrl;
    this.http = new httpClient(this.httpUrl);
  }
  // meethod - enum
  async request(method: string, params: object = {}) {
    const data = {
      jsonrpc: '2.0',
      id: 'SanfordNetwork', // i think so?
      method,
      params,
    };
    const response: any = await this.http.post(data);
    console.log(response);
    return response; //Buffer.from(response.result.response.value, 'base64').toString();
  }
  async abciQuery(path: string, query: any, protoResponse?: any) {
    const params = {
      path, // remove emagic strings
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
  async send(
    txBytes,
    method: string = 'broadcast_tx_sync',
    protoResponse?: any
  ) {
    console.log(txBytes);
    const data = {
      method,
      tx: Buffer.from(txBytes).toString('base64'),
    };
    const response = await this.request(method, data);
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
