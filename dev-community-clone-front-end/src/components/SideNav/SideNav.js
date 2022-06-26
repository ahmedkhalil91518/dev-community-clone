import React, { useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import SideNavCSS from "./SideNav.module.css";
import SideNavList from "../SideNavList/SideNavList";

export default function SideNav() {
  const [state, setState] = useState(false);

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
      <div className={SideNavCSS.burgerButtonContainer}>
        <MenuIcon
          onClick={toggleDrawer(true)}
          className={SideNavCSS.burgerButton}
        />
        <SwipeableDrawer
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <SideNavList toggleDrawer={toggleDrawer} />
        </SwipeableDrawer>
      </div>
    </div>
  );
}
