import React from "react";
import PostsCSS from "./Posts.module.css";
import { Outlet } from "react-router-dom";
import PostsNav from "components/PostsNav/PostsNav";
import { useMediaQuery } from "react-responsive";
import { SideNavListBig } from "components/SideNavListBig/SideNavListBig";
function Posts() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <div className={isDesktopOrLaptop ? PostsCSS.page : PostsCSS.smallPage}>
      {isDesktopOrLaptop && <SideNavListBig />}
      <div>
        <PostsNav />
        <Outlet />
      </div>
    </div>
  );
}

export default Posts;
