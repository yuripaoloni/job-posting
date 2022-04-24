import { Routes, Route } from "react-router-dom";
import "./App.css";
import CustomAlert from "./components/CustomAlert";
import CustomNavbar from "./components/CustomNavbar";
import Landing from "./pages/Landing";

function App() {
  return (
    <div>
      <CustomNavbar />
      <CustomAlert />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
