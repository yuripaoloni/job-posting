import { Container } from "design-react-kit";
import { Routes, Route } from "react-router-dom";
import CustomAlert from "./components/CustomAlert";
import CustomNavbar from "./components/header/CustomHeader";
import RequireAuth from "./components/RequireAuth";
import Jobs from "./pages/jobs/Jobs";
import Landing from "./pages/Landing";
import JobsHistory from "./pages/user/JobsHistory";
import Profile from "./pages/user/Profile";

function App() {
  return (
    <Container fluid className="p-0">
      <CustomNavbar />
      <CustomAlert />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/jobs"
          element={
            <RequireAuth>
              <Jobs />
            </RequireAuth>
          }
        />
        <Route
          path="/jobsHistory"
          element={
            <RequireAuth>
              <JobsHistory />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
