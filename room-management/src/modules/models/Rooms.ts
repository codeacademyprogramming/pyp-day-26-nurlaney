export interface IReservation {
  _id: string;
  roomId: number;
  reservedBy: string;
  from: string;
  to: string;
  note: string;
}

export interface IRoom {
  _id: string;
  reservations: IReservation[];
}
