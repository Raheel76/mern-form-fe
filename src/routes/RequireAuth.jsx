import React from "react";
import { Navigate, useLocation } from "react-router";

const RequireAuth = ({ children }) => {
  const authToken = localStorage.getItem("authToken");
  const location = useLocation();
  if (!authToken) {
    return <Navigate to="/auth/signup" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;