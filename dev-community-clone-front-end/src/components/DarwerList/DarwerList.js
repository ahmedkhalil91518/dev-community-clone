import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import BasicCard from "../BasicCard/BasicCard";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import DarwerListCSS from "../DarwerList/DarwerList.module.css";

function DarwerList({toggleDrawer}) {
  return (
    <Box 
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <h3 className={DarwerListCSS.h3Header}>DEV Community</h3>
        <HighlightOffIcon
          className={DarwerListCSS.cancelIcon}
          onClick={toggleDrawer(false)}
        />
        <BasicCard />
        <div className={DarwerListCSS.listContainer}>
          <div className={DarwerListCSS.listItem}>
            <HomeIcon className={DarwerListCSS.listItemPart} />{" "}
            <span className={DarwerListCSS.listItem}>Home</span>
          </div>
          <div className={DarwerListCSS.listItem}>
            <InfoIcon className={DarwerListCSS.listItem} />{" "}
            <span className={DarwerListCSS.listItem}>About</span>
          </div>
          <div className={DarwerListCSS.listSocial}>
            <FacebookIcon className={DarwerListCSS.social} />
            <TwitterIcon className={DarwerListCSS.social} />
            <GitHubIcon className={DarwerListCSS.social} />
            <InstagramIcon className={DarwerListCSS.social} />
          </div>
        </div>
      </List>
    </Box>
  );
}

export default DarwerList;
