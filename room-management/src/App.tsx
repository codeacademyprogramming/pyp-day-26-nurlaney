import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import { Header } from "./modules/components/Header";
import { Plan } from "./modules/components/Plan";
import { getRooms } from "./modules/components/Plan/actions/roomsActions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getRooms(dispatch);
  }, [dispatch]);
  return (
    <>
      <Header />
      <Plan />
    </>
  );
}

export default App;
