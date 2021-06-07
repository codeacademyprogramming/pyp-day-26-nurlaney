import { AxiosResponse } from "axios";
import { HttpClient } from "../../httpClient/index";
import { IRoom } from "../../models/Rooms";

class RoomsService extends HttpClient {
  constructor() {
    super("http://localhost:8000");
  }

  getRooms(): Promise<AxiosResponse<IRoom>> {
    return this.get("rooms");
  }
}

export const roomsService = new RoomsService();
