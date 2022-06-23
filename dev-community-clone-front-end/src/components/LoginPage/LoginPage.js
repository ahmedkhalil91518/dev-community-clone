import React from "react";
import LoginPageCSS from "./LoginPage.module.css";
import GithubButton from "../ReactSocialLoginButtons/GithubLoginButton";
import GoogleButton from "../ReactSocialLoginButtons/GoogleLoginButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function LoginPage() {
  return (
    <div className={LoginPageCSS.page}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div">
            DEV Community is a community of 863,727 amazing developers
          </Typography>
        </CardContent>
        <CardActions>
          <GoogleButton />
        </CardActions>
        <CardActions>
          <GithubButton />
        </CardActions>
        <CardContent className={LoginPageCSS.dividerContainer}>
          <Divider className={LoginPageCSS.divider}/>
          <div className={LoginPageCSS.dividerText}>Have a password? Continue with your email address</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
