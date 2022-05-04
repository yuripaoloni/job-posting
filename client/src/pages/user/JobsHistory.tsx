import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import DirectorJobsHistory from "./DirectorJobsHistory";
import ManagerJobsHistory from "./ManagerJobsHistory";
import WorkerJobsHistory from "./WorkerJobsHistory";

import { Job } from "../../typings";

const JobsHistory = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const { userType } = useAuth();

  useEffect(() => {
    //TODO fetchJobs - /jobsHistory/:userType
  }, []);

  let page =
    userType === "worker" ? (
      <WorkerJobsHistory jobs={jobs} />
    ) : userType === "manager" ? (
      <ManagerJobsHistory jobs={jobs} />
    ) : (
      <DirectorJobsHistory jobs={jobs} />
    );

  return page;
};

export default JobsHistory;
