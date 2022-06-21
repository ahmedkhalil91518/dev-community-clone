import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableTemporaryDrawerCSS from "./SwipeableTemporaryDrawer.module.css";
import DarwerList from "../DarwerList/DarwerList";

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  return (
    <div>
      <div
        className={
          SwipeableTemporaryDrawerCSS.burgerButtonContainer
        }
      >
        <MenuIcon
          onClick={toggleDrawer(true)}
          className={SwipeableTemporaryDrawerCSS.burgerButton}
        />
        <SwipeableDrawer
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <DarwerList toggleDrawer={toggleDrawer} />
        </SwipeableDrawer>
      </div>
    </div>
  );
}
