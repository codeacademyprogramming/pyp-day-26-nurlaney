import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import "./header.scss";

export const Header = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            <b>Room availability management</b>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
