import { createContext, useContext, useState } from "react";
import { AlertVariant } from "../typings";

type AlertContextValue = {
  showAlert: boolean;
  alertMessage: string;
  alertVariant: AlertVariant;
  toggleAlert: (alertMessage: string, alertVariant: AlertVariant) => void;
};
type AlertProviderProps = { children: React.ReactNode };

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

const AlertProvider = ({ children }: AlertProviderProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState<AlertVariant>("success");

  const toggleAlert = (alertMessage: string, alertVariant: AlertVariant) => {
    setAlertVariant(alertVariant);
    setAlertMessage(alertMessage);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const value = {
    showAlert,
    alertMessage,
    alertVariant,
    toggleAlert,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

const useAlert = () => {
  const context = useContext(AlertContext);

  if (context === undefined) {
    throw new Error("useAlert must be used within AlertProvider");
  }

  return context;
};

export { AlertProvider, useAlert };
