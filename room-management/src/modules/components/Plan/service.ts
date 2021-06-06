import { AxiosResponse } from "axios";
import { HttpClient } from "../../httpClient/index";
import { IRoom } from "../../models/Rooms";

class RoomsService extends HttpClient {
  constructor() {
    super("https://60baffde42e1d0001762031a.mockapi.io");
  }

  getRooms(): Promise<AxiosResponse<IRoom>> {
    return this.get("rooms");
  }
}

export const roomsService = new RoomsService();
