import React from "react";
import PostsCSS from "./Posts.module.css";
import { Outlet } from "react-router-dom";
function Posts() {
  return <div><Outlet /></div>;
}

export default Posts;
