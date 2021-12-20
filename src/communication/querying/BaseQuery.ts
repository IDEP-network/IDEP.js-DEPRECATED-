import {HttpClient} from './HttpClient';

export class BaseQuery {
  httpUrl: string;
  q: HttpClient;
  constructor(restCli, httpUrl: string = 'http://159.89.84.111:1317/') {
    this.httpUrl = httpUrl;
    this.q = new restCli(this.httpUrl);
  }
  requestData(endpoint: string, pathParams: string): Promise<any> {
    return this.q.get(`${endpoint}/${pathParams}`);
  }
}

const querierFactory = () => {
  return new BaseQuery(HttpClient);
};

export const restClient = querierFactory();
