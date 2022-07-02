import React from "react";
import ImageMenuCSS from "./ImageMenu.module.css";
import { useSelector } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "reducers/authReducer";
const ImageMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    navigate("/");
  };
  const user = useSelector((state) => {
    // @ts-ignore
    return state.auth;
  });
  const emailName = user.email.split("@")[0];
  return (
    <div>
      <img
        src={user.photo || "https://via.placeholder.com/500"}
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
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to={emailName} className={ImageMenuCSS.link}>
            <span>{user.name}</span>{" "}
            <span className={ImageMenuCSS.span}>@{emailName}</span>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Link to="dashboard" className={ImageMenuCSS.link}>
            Dashboard
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <Link to="newPost" className={ImageMenuCSS.link}>Create Post</Link></MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ImageMenu;
