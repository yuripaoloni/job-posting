import axios from "axios";
import { useEffect } from "react";
import { Container, Progress } from "design-react-kit";

import { useAuth } from "./hooks/AuthContext";
import { useFetch } from "./hooks/FetchContext";

import CustomAlert from "./components/CustomAlert";
import CustomNavbar from "./components/header/CustomHeader";
import Footer from "./components/Footer";

import Routes from "./Routes";

function App() {
  const { loading } = useFetch();
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
      {loading && (
        <Progress
          indeterminate
          label="In elaborazione..."
          color="danger"
          style={{ zIndex: 999999 }}
        />
      )}
      <CustomNavbar />
      <CustomAlert />
      <Routes />
      <Footer />
    </Container>
  );
}

export default App;
