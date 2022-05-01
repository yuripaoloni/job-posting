import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import DirectorJobs from "./DirectorJobs";
import ManagerJobs from "./ManagerJobs";
import WorkerJobs from "./WorkerJobs";

import { Jobs } from "../../typings";

const Jobs = () => {
  const [jobs, setJobs] = useState<Jobs[]>([]);

  const { userType } = useAuth();

  useEffect(() => {
    //TODO fetchJobs - /jobs/:userType
  }, []);

  let page =
    userType === "worker" ? (
      <WorkerJobs jobs={jobs} />
    ) : userType === "manager" ? (
      <ManagerJobs jobs={jobs} />
    ) : (
      <DirectorJobs jobs={jobs} />
    );

  return page;
};

export default Jobs;
