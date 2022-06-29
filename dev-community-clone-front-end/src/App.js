import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import MainBar from "./components/MainBar/MainBar";
import Main from "./components/Main/Main";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import LoginPage from "./components/LoginPage/LoginPage";
import Posts from "./components/Posts/Posts";
import SignupPage from "./components/SignupPage/SignupPage";
import React from "react";
import Relative from "components/Relative/Relative";
import Latest from "components/Latest/Latest";
import Top from "components/Top/Top";
import Week from "components/Week/Week";
import Month from "components/Month/Month";
import Year from "components/Year/Year";
import Infinity from "components/Infinity/Infinity";
import About from "components/About/About";
import Notifications from "components/Notifications/Notifications";

function App() {
  return (
    <>
      <MainBar />
      <Main />
      <Routes>
        <Route path="/" element={<Posts />}>
          <Route index element={<Relative />} />
          <Route path="relative" element={<Relative />} />
          <Route path="latest" element={<Latest />} />
          <Route path="top" element={<Top />}>
            <Route index element={<Week />} />
            <Route path="week" element={<Week />} />
            <Route path="month" element={<Month />} />
            <Route path="year" element={<Year />} />
            <Route path="infinity" element={<Infinity />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/notifications" element={<Notifications />} />
        Notifications
      </Routes>
      <Footer />
    </>
  );
}

export default App;
