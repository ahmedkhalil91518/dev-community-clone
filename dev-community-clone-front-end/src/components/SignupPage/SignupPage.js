import React, { useEffect, useState } from "react";
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
  signInWithRedirect,
  GoogleAuthProvider,
  GithubAuthProvider,
  getRedirectResult,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authorizeUser } from "../../reducers/authReducer";

function SignupPage() {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignup = () => {
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

  const handleGithubSignup = () => {
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
      console.log(result);
      dispatch(
        authorizeUser({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          uid: result.user.uid,
          provider: result.user.providerData,
        })
      );
      navigate("/");
    });
  }, []);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "the minimum characters for the name is 3")
      .required("Required"),
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
      .then((result) => {
        // Signed in
        const user = result.user;
        console.log(user);
        updateProfile(auth.currentUser, {
          displayName: values.name,
        }).then(() => {
          dispatch(
            authorizeUser({
              name: values.name,
              email: result.user.email,
              photo: null,
              uid: result.user.uid,
              provider: result.user.providerData,
            })
          );
          navigate("/");
          sendEmailVerification(auth.currentUser).then(() => {
            // Email verification sent!
            console.log(auth.currentUser);
          });
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
          <GoogleButton onClick={handleGoogleSignup} />
        </CardActions>
        <CardActions>
          <GithubButton onClick={handleGithubSignup} />
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
              htmlFor="exampleFormControlInput0"
              className={SignupPageCSS.label + " form-label"}
            >
              Name
            </label>
            <Field
              type="text"
              name="name"
              className={SignupPageCSS.input + " form-control"}
              id="exampleFormControlInput0"
            />
            <div className={SignupPageCSS.ErrorMessage}>
              <ErrorMessage name="name" />
            </div>
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
