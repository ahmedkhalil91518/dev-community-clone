import React from "react";
import TopCSS from "./Top.module.css";
import { Outlet } from "react-router-dom";
import TopNav from "components/TopNav/TopNav";
const Top = () => {
  return (
    <div>
      <TopNav />
      <Outlet />
    </div>
  );
};

export default Top;
