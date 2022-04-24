import { BrowserRouter } from "react-router-dom";

import { AlertProvider } from "./contexts/AlertContext";

type ProvidersProps = { children: React.ReactNode };

const Providers = ({ children }: ProvidersProps) => {
  return (
    <AlertProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </AlertProvider>
  );
};

export default Providers;
