import { memo } from "react";
import { Routes as RRRoutes, Route } from "react-router-dom";

import Jobs from "./pages/jobs/Jobs";
import Landing from "./pages/Landing";
import JobsHistory from "./pages/user/JobsHistory";
import Profile from "./pages/user/Profile";
import SoftSkill from "./pages/user/SoftSkill";

import RequireAuth from "./components/RequireAuth";

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
        path="jobsHistory"
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
            <SoftSkill />
          </RequireAuth>
        }
      />
    </RRRoutes>
  );
};

export default memo(Routes);
