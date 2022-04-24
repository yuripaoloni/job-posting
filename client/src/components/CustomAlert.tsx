import { Alert } from "design-react-kit";
import { useAlert } from "../contexts/AlertContext";

const CustomAlert = () => {
  const { showAlert, alertMessage, alertVariant } = useAlert();

  return (
    <Alert
      isOpen={showAlert}
      color={alertVariant}
      fade
      style={{
        zIndex: 1000,
        position: "fixed",
        top: 0,
        right: 0,
        marginTop: 55,
        marginRight: 10,
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
