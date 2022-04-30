import { Container } from "design-react-kit";
import { Routes, Route } from "react-router-dom";
import CustomAlert from "./components/CustomAlert";
import CustomNavbar from "./components/header/CustomHeader";
import Landing from "./pages/Landing";

// wrap protected routes with RequireAuth and specify userTypeprops

function App() {
  return (
    <Container fluid className="p-0">
      <CustomNavbar />
      <CustomAlert />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Container>
  );
}

export default App;
