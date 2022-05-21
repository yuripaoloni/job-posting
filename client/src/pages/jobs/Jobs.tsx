import { useEffect, useState } from "react";

import DirectorJobs from "./DirectorJobs";
import ManagerJobs from "./ManagerJobs";
import WorkerJobs from "./WorkerJobs";

import { useAuth } from "../../contexts/AuthContext";

import { Job } from "../../typings";

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const { userType } = useAuth();

  useEffect(() => {
    //TODO fetchJobs - /jobs/:userType
  }, []);

  let page =
    userType === 0 ? (
      <WorkerJobs jobs={jobs} />
    ) : userType === 1 ? (
      <DirectorJobs jobs={jobs} />
    ) : (
      <ManagerJobs jobs={jobs} />
    );

  return page;
};

export default Jobs;
