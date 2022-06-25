import React from "react";
import Button from "@mui/material/Button";
import CreateAccountButtonCSS from "./CreateAccountButton.module.css";
import { Link } from "react-router-dom";

function CreateAccountButton() {
  return (
    <Link to="/signup" className={CreateAccountButtonCSS.link}>
      <Button
        color="primary"
        variant="outlined"
        className={CreateAccountButtonCSS.createAccountButton}
      >
        create account
      </Button>
    </Link>
  );
}

export default CreateAccountButton;
