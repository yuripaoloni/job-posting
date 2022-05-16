import { useLocation, Navigate } from "react-router-dom";

import { useAuth } from "../hooks/AuthContext";

type RequireAuthProps = {
  children: JSX.Element;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  let location = useLocation();
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
