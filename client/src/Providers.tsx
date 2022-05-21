import { BrowserRouter } from "react-router-dom";

import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import { FetchProvider } from "./contexts/FetchContext";

type ProvidersProps = { children: React.ReactNode };

const Providers = ({ children }: ProvidersProps) => {
  return (
    <AlertProvider>
      <AuthProvider>
        <FetchProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </FetchProvider>
      </AuthProvider>
    </AlertProvider>
  );
};

export default Providers;
