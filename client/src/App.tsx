import { useEffect } from "react";
import { Container } from "design-react-kit";
import axios from "axios";

import { useAuth } from "./contexts/AuthContext";

import CustomAlert from "./components/layout/CustomAlert";
import CustomNavbar from "./components/header/CustomHeader";
import Footer from "./components/layout/Footer";

import Routes from "./Routes";
import ConfirmModal from "./components/layout/ConfirmModal";
import { isUserType } from "./utils/isUserType";

function App() {
  const { toggleAuth } = useAuth();

  useEffect(() => {
    async function onValidateCookie() {
      const res = await axios.get("/auth/validate");

      if (isUserType(res?.data.tipoUtenteId)) {
        toggleAuth(true, res?.data.tipoUtenteId, res?.data.username);
      }
    }

    onValidateCookie();
  }, [toggleAuth]);

  return (
    <Container fluid className="p-0">
      <ConfirmModal />
      <CustomAlert />
      <CustomNavbar />
      <Routes />
      <Footer />
    </Container>
  );
}

export default App;
