import { useEffect, useState } from "react";

import DirectorJobsHistory from "./DirectorJobsHistory";
import ManagerJobsHistory from "./ManagerJobsHistory";
import WorkerJobsHistory from "./WorkerJobsHistory";

import { useAuth } from "../../contexts/AuthContext";

import { Job } from "../../typings";

const JobsHistory = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const { userType } = useAuth();

  useEffect(() => {
    //TODO fetchJobs - /jobsHistory/:userType
  }, []);

  let page =
    userType === 0 ? (
      <WorkerJobsHistory jobs={jobs} />
    ) : userType === 1 ? (
      <DirectorJobsHistory jobs={jobs} />
    ) : (
      <ManagerJobsHistory jobs={jobs} />
    );

  return page;
};

export default JobsHistory;
