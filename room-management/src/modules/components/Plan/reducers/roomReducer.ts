import { ASYNC_STATUS } from "../../../../redux/AsyncStatus";
import { ActionTypes } from "../actions/ActionTypes";
import { Action } from "../../../../redux/Types/RoomAction";
import { IRoom } from "../../../models/Rooms";

export interface IInitial {
  data: IRoom[];
  error: null;
  status: ASYNC_STATUS;
}

const initialValue: IInitial = {
  data: [],
  error: null,
  status: ASYNC_STATUS.IDLE,
};

export const roomReducer = (state = initialValue, action: Action): IInitial => {
  switch (action.type) {
    case ActionTypes.LOAD_ROOMS:
      return {
        ...state,
        status: ASYNC_STATUS.LOADING,
        data: [],
        error: null,
      };
    case ActionTypes.LOAD_ROOMS_SUCCESS:
      return {
        ...state,
        status: ASYNC_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };
    case ActionTypes.LOAD_ROOMS_ERROR:
      return {
        ...state,
        status: ASYNC_STATUS.ERROR,
        data: action.payload,
        error: action.error,
      };
    case ActionTypes.ADD_RESERVATIONS as ActionTypes:
      return {
        ...state,
        status: ASYNC_STATUS.LOADING,
        data: [],
        error: null,
      };
    case ActionTypes.ADD_RESERVATIONS_SUCCESS as ActionTypes:
      return {
        ...state,
        status: ASYNC_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };
    case ActionTypes.ADD_RESERVATIONS_ERROR as ActionTypes:
      return {
        ...state,
        status: ASYNC_STATUS.ERROR,
        data: action.payload,
        error: action.error,
      };
    default:
      return state;
  }
};
