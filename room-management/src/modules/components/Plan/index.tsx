import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Sketch } from "./Sketch";
import Loader from "react-loader-spinner";
import "./plan.scss";
import { ASYNC_STATUS } from "../../../redux/AsyncStatus";

export const Plan = () => {
  const rooms = useSelector((state: RootState) => state.rooms);
  return (
    <div>
      {rooms.status === ASYNC_STATUS.SUCCESS ? (
        <Sketch rooms={rooms.data} />
      ) : (
        <div className="loader">
          <Loader type="Watch" color="#00BFFF" height={100} width={100} />
        </div>
      )}
    </div>
  );
};
