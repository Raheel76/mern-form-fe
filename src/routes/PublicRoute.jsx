import React from "react";
import { Navigate } from "react-router";

const PublicRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PublicRoute;
