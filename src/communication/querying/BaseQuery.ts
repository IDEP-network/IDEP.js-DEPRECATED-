import {RestClient} from './RestClient';

export class BaseQuery {
  httpUrl: string;
  q: RestClient;
  constructor(restCli, httpUrl: string = 'http://142.93.65.220:1317/') {
    this.httpUrl = httpUrl;
    this.q = new restCli(this.httpUrl);
  }
  requestData(endpoint: string, pathParams: string): Promise<any> {
    return this.q.get(`${endpoint}/${pathParams}`);
  }
}
