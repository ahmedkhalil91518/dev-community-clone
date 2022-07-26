import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import IntroCard from "../IntroCard/IntroCard";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SideNavListBigCSS from "./SideNavListBig.module.css"

export const SideNavListBig = () => {
    const user = useSelector((state) => {
        // @ts-ignore
        return state.auth;
      });
    
      return (
        <Box 
          role="presentation"
          className={SideNavListBigCSS.box}
        >
          <List>
            <h3 className={SideNavListBigCSS.h3Header}>DEV Community</h3>
            {!user && <IntroCard />}
            <div className={SideNavListBigCSS.listContainer}>
              <Link to="/" className={SideNavListBigCSS.listItem}>
                <HomeIcon className={SideNavListBigCSS.listItemPart} />{" "}
                <span className={SideNavListBigCSS.listItem}>Home</span>
              </Link>
              <Link to="about" className={SideNavListBigCSS.listItem}>
                <InfoIcon className={SideNavListBigCSS.listItemPart} />{" "}
                <span className={SideNavListBigCSS.listItem}>About</span>
              </Link>
              <div className={SideNavListBigCSS.listSocial}>
                <FacebookIcon className={SideNavListBigCSS.social} />
                <TwitterIcon className={SideNavListBigCSS.social} />
                <GitHubIcon className={SideNavListBigCSS.social} />
                <InstagramIcon className={SideNavListBigCSS.social} />
              </div>
            </div>
          </List>
        </Box>
      )
}