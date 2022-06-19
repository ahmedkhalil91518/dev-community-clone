import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import BasicCard from "./BasicCard";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="sidenav">
        <h3 className="h3-header">DEV Community</h3>
        <HighlightOffIcon
          className="cancel-icon"
          onClick={toggleDrawer(anchor, false)}
        />
        <BasicCard />
        <div className="list-container">
          <div className="list-item">
            <HomeIcon className="list-item-part" />{" "}
            <span className="list-item-part">Home</span>
          </div>
          <div className="list-item">
            <InfoIcon className="list-item-part" />{" "}
            <span className="list-item-part">About</span>
          </div>
          <div className="list-social">
            <FacebookIcon className="social" />
            <TwitterIcon className="social" />
            <GitHubIcon className="social" />
            <InstagramIcon className="social" />
          </div>
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <div key={anchor} className="burger-button-container">
          <MenuIcon
            onClick={toggleDrawer(anchor, true)}
            className="burger-button"
          />
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </div>
      ))}
    </div>
  );
}
