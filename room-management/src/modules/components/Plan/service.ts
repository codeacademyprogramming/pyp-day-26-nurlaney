import { AxiosResponse } from "axios";
import { HttpClient } from "../../httpClient/index";
import { IReservation, IRoom } from "../../models/Rooms";

class RoomsService extends HttpClient {
  constructor() {
    super("http://localhost:8000");
  }

  getRooms(): Promise<AxiosResponse<IRoom>> {
    return this.get("rooms");
  }

  addReservations(body: IReservation): Promise<AxiosResponse<IRoom>> {
    return this.post("rooms", body);
  }
}

export const roomsService = new RoomsService();
