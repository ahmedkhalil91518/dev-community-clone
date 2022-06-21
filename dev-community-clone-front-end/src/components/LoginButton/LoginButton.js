import React from "react";
import Button from "@mui/material/Button";
import LoginButtonCSS from "./LoginButton.module.css";
import {  Link } from"react-router-dom";

function LoginButton() {
  return <Link to="/login" className={LoginButtonCSS.loginButton}>login</Link>;
}

export default LoginButton;
