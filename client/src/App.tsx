import { useEffect } from "react";
import { Container } from "design-react-kit";
import axios from "axios";

import { useAuth } from "./contexts/AuthContext";

import CustomAlert from "./components/layout/CustomAlert";
import CustomNavbar from "./components/header/CustomHeader";
import Footer from "./components/layout/Footer";

import Routes from "./Routes";

function App() {
  const { toggleAuth } = useAuth();

  useEffect(() => {
    async function onValidateCookie() {
      const res = await axios.get("/auth/validate");

      if (res?.data.tipoUtenteId) {
        toggleAuth(true, res?.data.tipoUtenteId, res?.data.username);
      }
    }

    onValidateCookie();
  }, [toggleAuth]);

  return (
    <Container fluid className="p-0">
      <CustomAlert />
      <CustomNavbar />
      <Routes />
      <Footer />
    </Container>
  );
}

export default App;
