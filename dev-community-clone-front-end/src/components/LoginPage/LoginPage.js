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
          <Divider className={LoginPageCSS.divider} />
          <div className={LoginPageCSS.dividerText}>
            Have a password? Continue with your email address
          </div>
        </CardContent>
        <div class="mb-3">
          <label
            for="exampleFormControlInput1"
            className={LoginPageCSS.label + " form-label"}
          >
            Email address
          </label>
          <input
            type="email"
            className={LoginPageCSS.input + " form-control"}
            id="exampleFormControlInput1"
          />
          <label
            for="exampleFormControlInput2"
            className={LoginPageCSS.label + " form-label"}
          >
            Password
          </label>
          <input
            type="password"
            className={LoginPageCSS.input + " form-control"}
            id="exampleFormControlInput2"
          />
          <div className={LoginPageCSS.checkContainer}>
            <input
              className={LoginPageCSS.check + " form-check-input"}
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label
              className={LoginPageCSS.labelCheck + " form-check-label"}
              for="flexCheckDefault"
            >
              Remember me
            </label>
          </div>
          <button className={LoginPageCSS.loginButton + " btn btn-primary"} type="submit">Button</button>
          <a className={LoginPageCSS.forgotPassword}>I forgot my password</a>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
