import React from "react";
import ImageMenuCSS from "./ImageMenu.module.css";
import { useSelector } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Divider from '@mui/material/Divider';

const ImageMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useSelector((state) => {
    // @ts-ignore
    return state.auth;
  });
  const emailName = user.email.split("@")[0];
  return (
    <div>
      <img
        src={user.photo}
        alt=""
        className={ImageMenuCSS.photo}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to={emailName} className={ImageMenuCSS.link}>
            <span>{user.name}</span>{" "}
            <span className={ImageMenuCSS.span}>@{emailName}</span>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}><Link to="dashboard" className={ImageMenuCSS.link}>Dashboard</Link></MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ImageMenu;
