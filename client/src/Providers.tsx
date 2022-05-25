import { BrowserRouter } from "react-router-dom";

import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ConfirmProvider } from "./contexts/ConfirmContext";
import { FetchProvider } from "./contexts/FetchContext";

type ProvidersProps = { children: React.ReactNode };

const Providers = ({ children }: ProvidersProps) => {
  return (
    <AlertProvider>
      <ConfirmProvider>
        <AuthProvider>
          <FetchProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </FetchProvider>
        </AuthProvider>
      </ConfirmProvider>
    </AlertProvider>
  );
};

export default Providers;
