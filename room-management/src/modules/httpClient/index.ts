import axios from "axios";
import { IReservation } from "../models/Rooms";

export class HttpClient {
  baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async get(url: string) {
    return await axios.get(`${this.baseUrl}/${url}`);
  }

  async post(url: string, body: IReservation) {
    return await axios.post(`${this.baseUrl}/${url}/${body._id}`, body);
  }
}
