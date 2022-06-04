import { roomsService } from "../service";
import { ActionTypes } from "./ActionTypes";
import { Dispatch } from "redux";
import { IReservation } from "../../../models/Rooms";

export function getRooms(dispatch: Dispatch) {
  dispatch({ type: ActionTypes.LOAD_ROOMS });
  roomsService
    .getRooms()
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.LOAD_ROOMS_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.LOAD_ROOMS_ERROR,
        error: err,
      });
    });
}
export function addReservations(dispatch: Dispatch) {
  dispatch({ type: ActionTypes.ADD_RESERVATIONS });
  return function (data: IReservation) {
    roomsService
      .addReservations(data)
      .then(({ data }) => {
        dispatch({
          type: ActionTypes.ADD_RESERVATIONS_SUCCESS,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.ADD_RESERVATIONS_ERROR,
          error: err,
        });
      });
  };
}
