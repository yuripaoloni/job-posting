import { createContext, useCallback, useContext, useState } from "react";

type ConfirmContextValue = {
  showConfirm: boolean;
  confirmMessage: string;
  toggleConfirm: (confirmMessage: string, onConfirm: () => void) => void;
  closeConfirm: () => void;
  onConfirm: () => void;
};

type ConfirmProviderProps = { children: React.ReactNode };

const ConfirmContext = createContext<ConfirmContextValue | undefined>(
  undefined
);

const ConfirmProvider = ({ children }: ConfirmProviderProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

  const closeConfirm = useCallback(() => {
    setShowConfirm(false);
  }, []);

  const toggleConfirm = useCallback(
    (confirmMessage: string, onConfirm: () => void) => {
      setShowConfirm(true);
      setConfirmMessage(confirmMessage);
      setOnConfirm(() => () => {
        onConfirm();
        closeConfirm();
      });
    },
    [closeConfirm]
  );

  const value = {
    showConfirm,
    confirmMessage,
    toggleConfirm,
    closeConfirm,
    onConfirm,
  };

  return (
    <ConfirmContext.Provider value={value}>{children}</ConfirmContext.Provider>
  );
};

const useConfirm = () => {
  const context = useContext(ConfirmContext);

  if (context === undefined) {
    throw new Error("useAlert must be used within ConfirmProvider");
  }

  return context;
};

export { ConfirmProvider, useConfirm };
