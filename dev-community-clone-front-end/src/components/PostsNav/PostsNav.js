import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PostsNavCSS from "./PostsNav.module.css";
const PostsNav = () => {
  const [active, setActive] = useState(" active ");

  return (
    <div className="PostsNav">
      <NavLink
        to="relative"
        className={PostsNavCSS.navButton + " " + active}
        role="button"
      >
        relative
      </NavLink>
      <NavLink
        to="latest"
        className={PostsNavCSS.navButton}
        role="button"
        onClick={() => setActive("")}
      >
        latest
      </NavLink>
      <NavLink
        to="top"
        className={PostsNavCSS.navButton}
        role="button"
        onClick={() => setActive("")}
      >
        top
      </NavLink>
    </div>
  );
};

export default PostsNav;
