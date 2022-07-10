// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2K363SPWfX8C3siEGKYpm1zadECM5B4I",
  authDomain: "dev-community-clone.firebaseapp.com",
  projectId: "dev-community-clone",
  storageBucket: "dev-community-clone.appspot.com",
  messagingSenderId: "201714803419",
  appId: "1:201714803419:web:db948e238a8772085662fe",
  measurementId: "G-CJ263Z0LMN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


