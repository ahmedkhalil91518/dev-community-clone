import React from "react";
import LoginPageCSS from "./LoginPage.module.css";
import GithubButton from "../ReactSocialLoginButtons/GithubLoginButton";
import GoogleButton from "../ReactSocialLoginButtons/GoogleLoginButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import createButton from "../ReactSocialLoginButtons/create-button";
import createSvgIcon from "../ReactSocialLoginButtons/createSvgIcon";
import EmailIcon from "@mui/icons-material/Email";
import Divider from "@mui/material/Divider";

function Icon({ width, height, color }) {
  return <EmailIcon />;
}

const config = {
  activeStyle: { background: "#EFF0EE" },
  icon: createSvgIcon(Icon),
  style: { background: "white", color: "black" },
  text: "Log in with Email",
};

const EmailLoginButton = createButton(config);
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
        <CardActions>
          <EmailLoginButton />
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
