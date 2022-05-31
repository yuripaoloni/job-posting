import { useEffect, useState } from "react";

import DirectorJobsHistory from "./DirectorJobsHistory";
import ManagerJobsHistory from "./ManagerJobsHistory";
import WorkerJobsHistory from "./WorkerJobsHistory";

import { useAuth } from "../../contexts/AuthContext";
import { useFetch } from "../../contexts/FetchContext";

import { Job } from "../../typings/jobs.type";
import { Candidatura } from "../../typings/utente.type";

const JobsHistory = () => {
  const [jobs, setJobs] = useState<Job[] | undefined>(undefined);
  const [applications, setApplications] = useState<Candidatura[] | undefined>(
    undefined
  );

  const { userType } = useAuth();
  const { fetchData } = useFetch();

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetchData<Candidatura[] | Job[]>(
        "/jobs/history",
        "GET"
      );

      userType === 0
        ? setApplications(res?.data as Candidatura[])
        : setJobs(res?.data as Job[]);
    };

    fetchJobs();
  }, [fetchData, userType]);

  const updateApplications = (application: Candidatura, update: boolean) => {
    let updatedApplications = applications ? applications?.slice() : [];
    if (update) {
      const index = updatedApplications.findIndex(
        (item) => item.id === application.id
      );
      index > -1
        ? (updatedApplications[index] = application)
        : updatedApplications.unshift(application);
    } else {
      updatedApplications = updatedApplications.filter(
        (item) => item.id !== application.id
      );
    }
    setApplications(updatedApplications);
  };

  const updateJobs = (job: Job, update: boolean) => {
    let updatedJobs = jobs ? jobs?.slice() : [];
    if (update) {
      const index = updatedJobs.findIndex((item) => item.id === job.id);
      index > -1 ? (updatedJobs[index] = job) : updatedJobs.unshift(job);
    } else {
      updatedJobs = updatedJobs.filter((item) => item.id !== job.id);
    }
    setJobs(updatedJobs);
  };

  let page =
    userType === 0 ? (
      <WorkerJobsHistory
        applications={applications}
        updateApplications={updateApplications}
      />
    ) : userType === 1 ? (
      <DirectorJobsHistory jobs={jobs} updateJobs={updateJobs} />
    ) : (
      <ManagerJobsHistory jobs={jobs} />
    );

  return page;
};

export default JobsHistory;
