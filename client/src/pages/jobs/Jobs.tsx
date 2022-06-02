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
    const fetchJobs = async () => {
      const res = await fetchData<Job[]>("/jobs/offers", "GET");

      setJobs(res?.data);
    };

    fetchJobs();
  }, [fetchData]);

  const updateJobs = (job: Job, update: boolean, jobId?: number) => {
    let updatedJobs = jobs ? jobs?.slice() : [];
    if (update) {
      const index = updatedJobs.findIndex((item) => item.id === job.id);
      index > -1 ? (updatedJobs[index] = job) : updatedJobs.unshift(job);
    } else {
      updatedJobs = updatedJobs.filter((item) => item.id !== jobId);
    }
    setJobs(updatedJobs);
  };

  let page =
    userType === 0 ? (
      <WorkerJobs jobs={jobs} userType={0} updateJobs={updateJobs} />
    ) : userType === 1 ? (
      <DirectorJobs jobs={jobs} userType={1} updateJobs={updateJobs} />
    ) : (
      <ManagerJobs jobs={jobs} userType={2} updateJobs={updateJobs} />
    );

  return page;
};

export default Jobs;
