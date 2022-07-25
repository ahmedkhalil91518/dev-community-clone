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
import Profile from "components/Profile/Profile";
import Dashboard from "components/Dashboard/Dashboard";
import RequireAuth from "components/RequireAuth";
import NotRequiredAuth from "components/NotRequiredAuth";
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector } from "react-redux";
import NewPost from "components/NewPost/NewPost";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { SinglePost } from "components/SinglePost/SinglePost";
import { TagPosts } from "components/TagPosts/TagPosts";
import NavigatorTag from "./components/NavigatorTag";

library.add(fab);

function App() {
  // @ts-ignore
  const loading = useSelector((state) => state.loading);
  return (
    <>
      {loading && (
        <div className="loaderContainer">
          <BeatLoader loading={loading} color="blue" />
        </div>
      )}
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
        <Route
          path="/login"
          element={
            <NotRequiredAuth>
              <LoginPage />
            </NotRequiredAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <NotRequiredAuth>
              <SignupPage />
            </NotRequiredAuth>
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/notifications"
          element={
            <RequireAuth>
              <Notifications />
            </RequireAuth>
          }
        />
        <Route
          path="/:emailName"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/newPost"
          element={
            <RequireAuth>
              <NewPost />
            </RequireAuth>
          }
        />
        <Route path="/posts/:id" element={<SinglePost />} />
        <Route path="/tags/:tag" element={<TagPosts />} />
        <Route path="/navigate/:tag" element={<NavigatorTag />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
