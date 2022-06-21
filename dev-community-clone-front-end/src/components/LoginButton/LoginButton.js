import React from "react";
import Button from "@mui/material/Button";
import LoginButtonCSS from "./LoginButton.module.css";

function LoginButton() {
  return <Button className={LoginButtonCSS.loginButton}>login</Button>;
}

export default LoginButton;
