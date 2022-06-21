import React from 'react'
import Button from "@mui/material/Button";
import CreateAccountButtonCSS from "./CreateAccountButton.module.css"

function CreateAccountButton() {
  return (
    <Button color="primary" variant="outlined" className={CreateAccountButtonCSS.createAccountButton}>create account</Button>
  )
}

export default CreateAccountButton