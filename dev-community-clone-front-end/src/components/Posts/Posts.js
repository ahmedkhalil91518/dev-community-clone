import React from "react";
import PostsCSS from "./Posts.module.css";
import { Outlet } from "react-router-dom";
import PostsNav from "components/PostsNav/PostsNav";

function Posts() {
  return (
    <div>
      <PostsNav />
      <Outlet />
    </div>
  );
}

export default Posts;
