import { combineReducers } from "redux";
import { roomReducer } from "./roomReducer";

export const reducers = combineReducers({
  rooms: roomReducer,
});
