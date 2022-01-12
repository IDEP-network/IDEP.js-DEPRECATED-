import {HttpClient} from './http.client';

export class RestClient {
  restApiUrl: string;
  q: HttpClient;
  constructor(restCli, restApiUrl: string = 'http://159.89.84.111:1317/') {
    this.restApiUrl = restApiUrl;
    this.q = new restCli(this.restApiUrl);
  }
  requestData(endpoint: string, pathParams: string): Promise<any> {
    return this.q.get(`${endpoint}/${pathParams}`);
  }
}

export const restClientFactory = (restApiUrl: string) => {
  return new RestClient(HttpClient, restApiUrl);
};
