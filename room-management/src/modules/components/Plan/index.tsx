import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Sketch } from "./Sketch";
import Loader from "react-loader-spinner";
import "./plan.scss";
import { ASYNC_STATUS } from "../../../redux/AsyncStatus";
import { IRoom } from "../../models/Rooms";

const InitialValue = {
  id: 0,
  reservations: [
    {
      id: 0,
      from: "",
      to: "",
      roomId: 0,
      note: "",
      reservedBy: "",
    },
  ],
};

export const Plan = () => {
  const rooms = useSelector((state: RootState) => state.rooms);
  const [roomDetails, setRoomDetails] = useState<IRoom>(InitialValue);

  const findReservationsById = useCallback(
    (id: number) => {
      const room = rooms.data.find((room) => room.id === id);
      setRoomDetails(room ? room : roomDetails);
    },
    [roomDetails, rooms.data]
  );

  const closeHelper = () => {
    setRoomDetails(InitialValue);
  };

  return (
    <div>
      {rooms.status === ASYNC_STATUS.SUCCESS ? (
        <div className="container mt-5">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="col-md-6">
              <Sketch
                rooms={rooms.data}
                getReservations={findReservationsById}
                disableHelper={closeHelper}
              />
            </div>
            <div className="col-md-5">
              {roomDetails.reservations.length && roomDetails.id !== 0 ? (
                <div className="res-wrapper">
                  {roomDetails.reservations.map((reservation) => (
                    <div className="reservation" key={reservation.id}>
                      <div className="from-res">
                        <span>
                          <b>From:</b>
                        </span>
                        <span>{reservation.from}</span>
                      </div>
                      <div className="to-res">
                        <span>
                          <b> To:</b>
                        </span>
                        <span>{reservation.to}</span>
                      </div>
                      <div className="reservedBy-res">
                        <span>
                          <b> Reserved By: </b>
                        </span>
                        <span>{reservation.reservedBy}</span>
                      </div>
                      <div className="note-res">
                        <span>
                          <b> Note: </b>
                        </span>
                        <span>{reservation.note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : roomDetails.id === 0 ? (
                <div className="res-wrapper">
                  <h5>
                    <i>
                      If you want to see reservations, just hover the rooms!
                    </i>
                  </h5>
                </div>
              ) : (
                <div className="res-wrapper">
                  <h5>
                    <i>Room doesn`t have any reservations!</i>
                  </h5>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="loader">
          <Loader type="Watch" color="#00BFFF" height={100} width={100} />
        </div>
      )}
    </div>
  );
};
