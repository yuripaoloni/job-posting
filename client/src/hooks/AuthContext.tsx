import { createContext, useCallback, useContext, useState, memo } from "react";
import { UserType } from "../typings";

type AuthContextValue = {
  isAuth: boolean;
  userType: UserType;
  user: string;
  toggleAuth: (
    isAuth: boolean,
    userType: UserType,
    user: string | undefined
  ) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = { children: React.ReactNode };

const AuthProvider = memo(({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userType, setUserType] = useState<UserType>(0);
  const [user, setUser] = useState("");

  const toggleAuth = useCallback(
    (isAuth: boolean, userType: UserType, user: string | undefined) => {
      setIsAuth(isAuth);
      setUserType(userType);
      setUser(user ? user : "");
    },
    []
  );

  const value = {
    isAuth,
    userType,
    user,
    toggleAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
});
const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
