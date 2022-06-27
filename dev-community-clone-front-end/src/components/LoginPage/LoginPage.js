import React, { useState, useEffect } from "react";
import LoginPageCSS from "./LoginPage.module.css";
import GithubButton from "../ReactSocialLoginButtons/GithubLoginButton";
import GoogleButton from "../ReactSocialLoginButtons/GoogleLoginButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  GithubAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "../../firebase";
import SignupService from "../../services/SignupService";

function LoginPage() {
  const [error, setError] = useState("");

  const localToken = localStorage.getItem("token")

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "the password must be 8 characters or longer")
      .required("Required"),
  });

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const onSubmit = (values) => {
    console.log(values);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        SignupService.signup({ uid: user.uid }).then((token) => {
          localStorage.setItem("token", token);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        if (errorMessage.includes("user-not-found")) {
          setError("there is no user with these credentials in our database");
          setTimeout(() => {
            setError("");
          }, 5000);
        }
      });
  };

  const handleGoogleLogin = () => {
    signInWithRedirect(auth, googleProvider).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  };

  const handleGithubLogin = () => {
    signInWithRedirect(auth, githubProvider).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
  };

  useEffect(() => {
    getRedirectResult(auth).then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      let credential = GoogleAuthProvider.credentialFromResult(result);
      let user;
      if (credential) {
        const token = credential.accessToken;
        // The signed-in user info.
        user = result.user;
      } else {
        credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        user = result.user;
      }

      console.log(user);
      SignupService.signup({ uid: user.uid }).then((token) => {
        localStorage.setItem("token", token)
      });
    });
  }, []);

  return (
    <div className={LoginPageCSS.container}>
      <Card className={LoginPageCSS.page}>
        <CardContent>
          <Typography variant="h6" component="div">
            DEV Community is a community of 863,727 amazing developers
          </Typography>
        </CardContent>
        <CardActions>
          <GoogleButton onClick={handleGoogleLogin} />
        </CardActions>
        <CardActions>
          <GithubButton onClick={handleGithubLogin} />
        </CardActions>
        <CardContent className={LoginPageCSS.dividerContainer}>
          <Divider className={LoginPageCSS.divider} />
          <div className={LoginPageCSS.dividerText}>
            Have a password? Continue with your email address
          </div>
        </CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <label
              htmlFor="exampleFormControlInput1"
              className={LoginPageCSS.label + " form-label"}
            >
              Email address
            </label>
            <Field
              type="email"
              className={LoginPageCSS.input + " form-control"}
              id="exampleFormControlInput1"
              name="email"
            />
            <div className={LoginPageCSS.ErrorMessage}>
              <ErrorMessage name="email" />
            </div>
            <label
              htmlFor="exampleFormControlInput2"
              className={LoginPageCSS.label + " form-label"}
            >
              Password
            </label>
            <Field
              type="password"
              className={LoginPageCSS.input + " form-control"}
              id="exampleFormControlInput2"
              name="password"
            />
            <div className={LoginPageCSS.ErrorMessage}>
              <ErrorMessage name="email" />
            </div>
            <div className={LoginPageCSS.checkContainer}>
              <Field
                className={LoginPageCSS.check + " form-check-input"}
                type="checkbox"
                id="flexCheckDefault"
                name="rememberMe"
              />
              <label
                className={LoginPageCSS.labelCheck + " form-check-label"}
                htmlFor="flexCheckDefault"
              >
                Remember me
              </label>
            </div>
            {error && <div className={LoginPageCSS.ErrorMessage}>{error}</div>}
            <button
              className={LoginPageCSS.loginButton + " btn btn-primary"}
              type="submit"
            >
              Submit
            </button>
            <a className={LoginPageCSS.forgotPassword}>I forgot my password</a>
          </Form>
        </Formik>
      </Card>
    </div>
  );
}

export default LoginPage;
