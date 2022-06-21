import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SwipeableTemporaryDrawer from "../SwipeableTemporaryDrawer";
import SearchIcon from "@mui/icons-material/Search";
import CreateAccountButton from "../CreateAccountButton";
import ButtonAppBarCSS from "./ButtonAppBar.module.css";

export default function ButtonAppBar() {
  return (
    <AppBar position="sticky">
      <Toolbar className={ButtonAppBarCSS.appbar}>
        <IconButton>
          <SwipeableTemporaryDrawer />
        </IconButton>
        <h1 className={ButtonAppBarCSS.appTitle}>
          News
        </h1>
        <Button className={ButtonAppBarCSS.searchButton}>
          <SearchIcon />
        </Button>
        <CreateAccountButton />
      </Toolbar>
    </AppBar>
  );
}
