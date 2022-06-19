import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CreateAccountButton from "./CreateAccountButton";
import LoginButton from "./LoginButton";

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 235 }} className="login-card">
      <CardContent>
        <Typography variant="h6" component="div">
          DEV Community is a community of 863,727 amazing developers
        </Typography>
        <Typography variant="body2">
          We're a place where coders share, stay up-to-date and grow their
          careers.
        </Typography>
      </CardContent>
      <CardActions>
        <CreateAccountButton />
      </CardActions>
      <CardActions>
        <LoginButton />
      </CardActions>
    </Card>
  );
}
