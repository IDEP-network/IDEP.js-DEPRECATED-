import Axios, {AxiosInstance} from 'axios';

export type APIParams = Record<string, string | number | null | undefined>;

export class HttpClient {
  axios: AxiosInstance;
  constructor(baseURL: string = '') {
    this.axios = Axios.create({
      baseURL,
      headers: {
        Accept: 'application/json',
      },
      timeout: 30000,
    });
    this.axios.defaults.adapter = require('axios/lib/adapters/http');
  }

  public async get(endpoint: string): Promise<any> {
    return this.axios.get(endpoint).then(d => d.data);
  }

  public async post<T>(data: any): Promise<T> {
    return this.axios.post('/', data).then(d => d.data);
  }
}
