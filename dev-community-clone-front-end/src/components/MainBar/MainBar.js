import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SideNav from "../SideNav/SideNav";
import SearchIcon from "@mui/icons-material/Search";
import CreateAccountButton from "../CreateAccountButton/CreateAccountButton";
import MainBarCSS from "./MainBar.module.css";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import LoginButton from "components/LoginButton/LoginButton";
import { useSelector } from "react-redux";

export default function MainBar() {
  const user = useSelector((state) => {
    // @ts-ignore
    return state.auth});

  console.log(user);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <AppBar position="sticky">
      <Toolbar
        className={
          isTabletOrMobile ? MainBarCSS.appBar : MainBarCSS.appBarLarge
        }
      >
        {isTabletOrMobile && (
          <IconButton>
            <SideNav />
          </IconButton>
        )}
        <Link to="/" className={MainBarCSS.appTitle}>
          Home
        </Link>
        {isDesktopOrLaptop  && !user && <LoginButton />}
        {isTabletOrMobile && (
          <Button className={MainBarCSS.searchButton}>
            <SearchIcon />
          </Button>
        )}
        {!user && <CreateAccountButton />}
        {user && <img src={user.photo} alt=""/>}
      </Toolbar>
    </AppBar>
  );
}
