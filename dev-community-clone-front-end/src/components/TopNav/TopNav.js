import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TopNavCSS from "./TopNav.module.css";

const TopNav = () => {
const [active, setActive] = useState(" active ")

  return (
    <div className="TopNav">
      <NavLink to="week" className={TopNavCSS.navButton  + " " + active} role="button">
        week
      </NavLink>
      <NavLink to="month" className={TopNavCSS.navButton} role="button" onClick={() => setActive("")}>
        month
      </NavLink>
      <NavLink to="year" className={TopNavCSS.navButton} role="button" onClick={() => setActive("")}>
        year
      </NavLink>
      <NavLink to="infinity" className={TopNavCSS.navButton} role="button" onClick={() => setActive("")}>
        infinity
      </NavLink>
    </div>
  );
};

export default TopNav;
