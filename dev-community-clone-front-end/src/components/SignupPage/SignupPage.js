import React from "react";
import SignupPageCSS from "./SignupPage.module.css";
import GithubButton from "../ReactSocialLoginButtons/GithubSignup";
import GoogleButton from "../ReactSocialLoginButtons/GoogleSignup";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

function SignupPage() {
  return (
    <div className={SignupPageCSS.container}>
      <Card className={SignupPageCSS.page}>
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
        <CardContent className={SignupPageCSS.dividerContainer}>
          <Divider className={SignupPageCSS.divider} />
          <div className={SignupPageCSS.dividerText}>
            already have an account? <Link to="/login">login</Link>
          </div>
        </CardContent>
        <div>
          <label
            for="exampleFormControlInput1"
            className={SignupPageCSS.label + " form-label"}
          >
            Email address
          </label>
          <input
            type="email"
            className={SignupPageCSS.input + " form-control"}
            id="exampleFormControlInput1"
          />
          <label
            for="exampleFormControlInput2"
            className={SignupPageCSS.label + " form-label"}
          >
            Password
          </label>
          <input
            type="password"
            className={SignupPageCSS.input + " form-control"}
            id="exampleFormControlInput2"
          />
          <button
            className={SignupPageCSS.loginButton + " btn btn-primary"}
            type="submit"
          >
            submit
          </button>
        </div>
      </Card>
    </div>
  );
}

export default SignupPage;
