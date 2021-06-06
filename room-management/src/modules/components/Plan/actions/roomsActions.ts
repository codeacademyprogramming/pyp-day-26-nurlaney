import { roomsService } from "../service";
import { ActionTypes } from "./ActionTypes";
import { Dispatch } from "redux";

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
