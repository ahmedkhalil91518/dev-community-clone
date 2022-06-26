import React, { useState } from "react";
import SignupPageCSS from "./SignupPage.module.css";
import GithubButton from "../ReactSocialLoginButtons/GithubSignup";
import GoogleButton from "../ReactSocialLoginButtons/GoogleSignup";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";

function SignupPage() {
  const [error, setError] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "the password must be 8 characters or longer")
      .required("Required"),
  });
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = async (values) => {
    console.log(values);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          console.log(auth.currentUser);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        if (errorMessage.includes("email-already-in-use")) {
          setError("this email is already used");
          setTimeout(() => {
            setError("");
          }, 5000);
        }
      });
  };

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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <label
              htmlFor="exampleFormControlInput1"
              className={SignupPageCSS.label + " form-label"}
            >
              Email address
            </label>
            <Field
              type="email"
              name="email"
              className={SignupPageCSS.input + " form-control"}
              id="exampleFormControlInput1"
            />
            <div className={SignupPageCSS.ErrorMessage}>
              <ErrorMessage name="email" />
            </div>
            <label
              htmlFor="exampleFormControlInput2"
              className={SignupPageCSS.label + " form-label"}
            >
              Password
            </label>

            <Field
              type="password"
              name="password"
              className={SignupPageCSS.input + " form-control"}
              id="exampleFormControlInput2"
            />
            <div className={SignupPageCSS.ErrorMessage}>
              <ErrorMessage name="password" />
            </div>
            {error && <div className={SignupPageCSS.ErrorMessage}>{error}</div>}
            <button
              className={SignupPageCSS.loginButton + " btn btn-primary"}
              type="submit"
            >
              submit
            </button>
          </Form>
        </Formik>
      </Card>
    </div>
  );
}

export default SignupPage;
