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

export default function MainBar() {
  return (
    <AppBar position="sticky">
      <Toolbar className={MainBarCSS.appBar}>
        <IconButton>
          <SideNav />
        </IconButton>
        <Link to="/" className={MainBarCSS.appTitle}>Home</Link>
        <Button className={MainBarCSS.searchButton}>
          <SearchIcon />
        </Button>
        <CreateAccountButton />
      </Toolbar>
    </AppBar>
  );
}
