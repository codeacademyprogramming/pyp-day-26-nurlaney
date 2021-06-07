import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Sketch } from "./Sketch";
import Loader from "react-loader-spinner";
import "./plan.scss";
import { ASYNC_STATUS } from "../../../redux/AsyncStatus";
import { IReservation, IRoom } from "../../models/Rooms";
import { Button, TextField } from "@material-ui/core";
import { addReservations } from "./actions/roomsActions";

const InitialValue = {
  _id: "",
  reservations: [
    {
      _id: "",
      from: "2017-05-24",
      to: "2017-05-24",
      roomId: 0,
      note: "",
      reservedBy: "",
    },
  ],
};

export const Plan = () => {
  const rooms = useSelector((state: RootState) => state.rooms);
  const [roomDetails, setRoomDetails] = useState<IRoom>(InitialValue);
  const [showForm, setShowForm] = useState(false);
  const [formState, setformState] = useState<IReservation>({
    roomId: 0,
    _id: "",
    from: "",
    to: "",
    note: "",
    reservedBy: "",
  });
  const dispatch = useDispatch();

  const addReservation = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.preventDefault();
    const payload = {
      ...formState,
    };
    const dispatchAddReservation = addReservations(dispatch);
    dispatchAddReservation(payload);
  };

  function handleChange(
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const { value, name } = evt.currentTarget;
    setformState((prewState) => {
      return {
        ...prewState,
        [name]: value,
      };
    });
  }

  const findReservationsById = useCallback(
    (_id: string) => {
      const room = rooms.data.find((room) => room._id === _id);
      setRoomDetails(room ? room : roomDetails);
    },
    [roomDetails, rooms.data]
  );

  const closeHelper = () => {
    setRoomDetails(InitialValue);
  };

  const openForm = () => {
    setShowForm((prewState) => !prewState);
  };

  const closeForm = () => {
    setShowForm(false);
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
                openForm={openForm}
              />
            </div>
            {showForm ? (
              <div className="col-md-5">
                <form noValidate autoComplete="off" onSubmit={addReservation}>
                  <TextField
                    id="date"
                    label="From"
                    type="date"
                    defaultValue="2017-05-24"
                    name="from"
                    value={formState.from}
                    onChange={handleChange}
                  />
                  <TextField
                    id="date"
                    label="To"
                    type="date"
                    name="to"
                    defaultValue="2017-05-24"
                    value={formState.to}
                    onChange={handleChange}
                  />
                  <TextField
                    id="standard-basic"
                    label="Note"
                    name="note"
                    value={formState.note}
                    onChange={handleChange}
                  />
                  <TextField
                    id="standard-basic"
                    label="Reserved by"
                    name="reservedBy"
                    value={formState.reservedBy}
                    onChange={handleChange}
                  />
                  <Button onClick={closeForm} variant="contained">
                    Close
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </form>
              </div>
            ) : (
              <div className="col-md-5">
                {roomDetails.reservations.length && roomDetails._id !== "" ? (
                  <div className="res-wrapper">
                    {roomDetails.reservations.map((reservation) => (
                      <div className="reservation" key={reservation._id}>
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
                ) : roomDetails._id === "" ? (
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
            )}
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
