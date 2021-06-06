import axios from "axios";

export class HttpClient {
  baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async get(url: string) {
    return await axios.get(`${this.baseUrl}/${url}`);
  }

  async post(url: string, body: object) {
    return await axios.post(`${this.baseUrl}/${url}`, body);
  }
}
