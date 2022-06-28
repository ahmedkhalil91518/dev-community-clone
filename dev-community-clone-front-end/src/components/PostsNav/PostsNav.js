import React from "react";
import { NavLink } from "react-router-dom";
import PostsNavCSS from "./PostsNav.module.css"
const PostsNav = () => {
  return (
    <div className="PostsNav">
      <NavLink to="relative" className={PostsNavCSS.navButton} role="button">
      relative
      </NavLink>
      <NavLink  to="latest" className={PostsNavCSS.navButton} role="button">
      latest
      </NavLink>
      <NavLink  to="top" className={PostsNavCSS.navButton} role="button">
      top
      </NavLink>
    </div>
  );
};

export default PostsNav;
