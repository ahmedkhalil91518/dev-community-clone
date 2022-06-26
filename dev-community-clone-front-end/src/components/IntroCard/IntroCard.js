import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CreateAccountButton from "../CreateAccountButton/CreateAccountButton";
import LoginButton from "../LoginButton/LoginButton";
import IntroCardCSS from "./IntroCard.module.css"

export default function IntroCard() {
  return (
    <Card className={IntroCardCSS.loginCard}>
      <CardContent>
        <h3>
          DEV Community is a community of 863,727 amazing developers
        </h3>
        <div>
          We're a place where coders share, stay up-to-date and grow their
          careers.
        </div>
      </CardContent>
      <CardActions className={IntroCardCSS.createAccountContainer}>
        <CreateAccountButton />
      </CardActions>
      <CardActions>
        <LoginButton />
      </CardActions>
    </Card>
  );
}
