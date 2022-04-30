import { createContext, useContext, useState } from "react";
import { UserType } from "../typings";

type AuthContextValue = {
  authToken: string | null;
  userType: UserType;
  toggleAuth: (authToken: string, userType: UserType) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderPropsProps = { children: React.ReactNode };

const AuthProvider = ({ children }: AuthProviderPropsProps) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType>(null);

  const toggleAuth = (authToken: string, userType: UserType) => {
    setAuthToken(authToken);
    setUserType(userType);
  };

  const value = {
    authToken,
    userType,
    toggleAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
