import {HttpClient} from './HttpClient';

export class BaseQuery {
  httpUrl: string;
  q: HttpClient;
  constructor(restCli, httpUrl: string = 'http://142.93.65.220:1317/') {
    this.httpUrl = httpUrl;
    this.q = new restCli(this.httpUrl);
  }
  requestData(endpoint: string, pathParams: string): Promise<any> {
    return this.q.get(`${endpoint}/${pathParams}`);
  }
}
