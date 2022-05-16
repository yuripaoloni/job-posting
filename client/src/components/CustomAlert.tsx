import { Alert } from "design-react-kit";
import { useAlert } from "../hooks/AlertContext";

const CustomAlert = () => {
  const { showAlert, alertMessage, alertVariant } = useAlert();

  return (
    <Alert
      isOpen={showAlert}
      color={alertVariant}
      fade
      style={{
        zIndex: 999999,
        position: "fixed",
        top: 0,
        right: 0,
        marginTop: 85,
        marginRight: 20,
        minWidth: 200,
        maxWidth: 300,
        backgroundColor: "white",
        borderRadius: 10,
      }}
    >
      {alertMessage}
    </Alert>
  );
};

export default CustomAlert;
