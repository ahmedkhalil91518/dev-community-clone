/* import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const NotRequiredAuth = ({ children }) => {
  const user = useSelector((state) => {
    // @ts-ignore
    return state.auth;
  });
  if (!user) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default NotRequiredAuth; */