import { BrowserRouter } from "react-router-dom";

import { AlertProvider } from "./hooks/AlertContext";
import { AuthProvider } from "./hooks/AuthContext";
import { FetchProvider } from "./hooks/FetchContext";

type ProvidersProps = { children: React.ReactNode };

const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <AlertProvider>
        <FetchProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </FetchProvider>
      </AlertProvider>
    </AuthProvider>
  );
};

export default Providers;
