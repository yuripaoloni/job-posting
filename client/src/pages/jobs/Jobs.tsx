import { useEffect, useState } from "react";

import DirectorJobs from "./DirectorJobs";
import ManagerJobs from "./ManagerJobs";
import WorkerJobs from "./WorkerJobs";

import { useAuth } from "../../contexts/AuthContext";

import { Job } from "../../typings/jobs.type";
import { useFetch } from "../../contexts/FetchContext";

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[] | undefined>(undefined);

  const { userType } = useAuth();
  const { fetchData } = useFetch();

  useEffect(() => {
    //TODO fetchJobs - /jobs/:userType
    const fetchJobs = async () => {
      const res = await fetchData<Job[]>("/jobs/offers", "GET");

      setJobs(res?.data);
    };

    fetchJobs();
  }, [fetchData]);

  let page =
    userType === 0 ? (
      <WorkerJobs jobs={jobs} userType={0} />
    ) : userType === 1 ? (
      <DirectorJobs jobs={jobs} userType={1} />
    ) : (
      <ManagerJobs jobs={jobs} userType={2} />
    );

  return page;
};

export default Jobs;
