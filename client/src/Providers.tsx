import { BrowserRouter } from "react-router-dom";

import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";

type ProvidersProps = { children: React.ReactNode };

const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <AlertProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </AlertProvider>
    </AuthProvider>
  );
};

export default Providers;
