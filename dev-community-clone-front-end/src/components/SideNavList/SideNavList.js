import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IntroCard from "../IntroCard/IntroCard";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import SideNavListCSS from "./SideNavList.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function SideNavList({toggleDrawer}) {
  const user = useSelector((state) => {
    // @ts-ignore
    return state.auth;
  });

  return (
    <Box 
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <h3 className={SideNavListCSS.h3Header}>DEV Community</h3>
        <HighlightOffIcon
          className={SideNavListCSS.cancelIcon}
          onClick={toggleDrawer(false)}
        />
        {!user && <IntroCard />}
        <div className={SideNavListCSS.listContainer}>
          <Link to="/" className={SideNavListCSS.listItem}>
            <HomeIcon className={SideNavListCSS.listItemPart} />{" "}
            <span className={SideNavListCSS.listItem}>Home</span>
          </Link>
          <Link to="about" className={SideNavListCSS.listItem}>
            <InfoIcon className={SideNavListCSS.listItemPart} />{" "}
            <span className={SideNavListCSS.listItem}>About</span>
          </Link>
          <div className={SideNavListCSS.listSocial}>
            <FacebookIcon className={SideNavListCSS.social} />
            <TwitterIcon className={SideNavListCSS.social} />
            <GitHubIcon className={SideNavListCSS.social} />
            <InstagramIcon className={SideNavListCSS.social} />
          </div>
        </div>
      </List>
    </Box>
  );
}

export default SideNavList;
