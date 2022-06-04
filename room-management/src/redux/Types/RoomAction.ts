import { ActionTypes } from "../../modules/components/Plan/actions/ActionTypes";
import { IRoom } from "../../modules/models/Rooms";
import { ASYNC_STATUS } from "../AsyncStatus";

interface LoadAction {
  type: ActionTypes.LOAD_ROOMS;
  payload: IRoom[];
  error: null;
}

interface ErrorAction {
  type: ActionTypes.LOAD_ROOMS_ERROR;
  error: any;
  payload: IRoom[];
}

interface SuccessAction {
  type: ActionTypes.LOAD_ROOMS_SUCCESS;
  error: null;
  payload: IRoom[];
}

export type Action = LoadAction | ErrorAction | SuccessAction;
