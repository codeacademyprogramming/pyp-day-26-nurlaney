interface IReservation {
  id: number;
  roomId: number;
  reservedBy: string;
  from: string;
  to: string;
  notes: string;
}

export interface IRoom {
  id: number;
  reservations: IReservation[];
}
