import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { UserType } from "../typings";

type RequireAuthProps = {
  children: React.ReactNode;
  requiredUserType: UserType;
};

const RequireAuth = ({ children, requiredUserType }: RequireAuthProps) => {
  let location = useLocation();

  const { authToken, userType } = useAuth();

  if (!authToken && userType !== requiredUserType) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
