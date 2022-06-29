import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const user = useSelector((state) => {
    // @ts-ignore
    return state.auth;
  });
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default RequireAuth;
