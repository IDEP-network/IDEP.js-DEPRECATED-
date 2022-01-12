import {HttpClient, HttpClientInterface} from './http.client';

export class RestClient {
  restApiUrl: string;
  q: HttpClientInterface;
  constructor(restCli: typeof HttpClient, restApiUrl: string) {
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
