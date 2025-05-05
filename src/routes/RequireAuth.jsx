import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); 
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;