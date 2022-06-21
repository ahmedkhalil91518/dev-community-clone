import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SwipeableTemporaryDrawer from "../SwipeableTemporaryDrawer";
import SearchIcon from '@mui/icons-material/Search';
import CreateAccountButton from "../CreateAccountButton";
import ButtonAppBarCSS from "./ButtonAppBar.module.css"

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={ButtonAppBarCSS.appbar}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <SwipeableTemporaryDrawer />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button className={ButtonAppBarCSS.searchButton}><SearchIcon/></Button>
          <CreateAccountButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
