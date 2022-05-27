import { memo } from "react";
import { Routes as RRRoutes, Route } from "react-router-dom";

import Jobs from "./pages/jobs/Jobs";
import Landing from "./pages/Landing";
import JobsHistory from "./pages/jobsHistory/JobsHistory";
import Profile from "./pages/user/Profile";
import SoftSkills from "./pages/user/SoftSkills";

import RequireAuth from "./components/auth/RequireAuth";

const Routes = () => {
  return (
    <RRRoutes>
      <Route path="/" element={<Landing />} />
      <Route
        path="jobs"
        element={
          <RequireAuth>
            <Jobs />
          </RequireAuth>
        }
      />
      <Route
        path="history"
        element={
          <RequireAuth>
            <JobsHistory />
          </RequireAuth>
        }
      />
      <Route
        path="profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="softSkill"
        element={
          <RequireAuth>
            <SoftSkills />
          </RequireAuth>
        }
      />
    </RRRoutes>
  );
};

export default memo(Routes);
