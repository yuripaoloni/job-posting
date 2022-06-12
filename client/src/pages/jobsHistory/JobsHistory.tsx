import { useEffect, useState } from "react";

import DirectorJobsHistory from "./DirectorJobsHistory";
import ManagerJobsHistory from "./ManagerJobsHistory";
import WorkerJobsHistory from "./WorkerJobsHistory";

import { useAuth } from "../../contexts/AuthContext";
import { useFetch } from "../../contexts/FetchContext";

import { Job } from "../../typings/jobs.type";
import { Candidatura } from "../../typings/utente.type";
import PageContainer from "../../components/layout/PageContainer";

const JobsHistory = () => {
  const [jobs, setJobs] = useState<Job[] | undefined>(undefined);
  const [applications, setApplications] = useState<Candidatura[] | undefined>(
    undefined
  );
  const [skip, setSkip] = useState(0);
  const [endReached, setEndReached] = useState(false);

  const { userType } = useAuth();
  const { fetchData } = useFetch();

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetchData<Candidatura[] | Job[]>(
        `/jobs/history/${skip}`,
        "GET"
      );

      if (res?.data) {
        userType === 0
          ? setApplications((prev) =>
              prev
                ? [...prev, ...(res?.data as Candidatura[])]
                : [...(res?.data as Candidatura[])]
            )
          : setJobs((prev) =>
              prev
                ? [...prev, ...(res?.data as Job[])]
                : [...(res?.data as Job[])]
            );

        res.data.length < 6 && setEndReached(true);
      }
    };

    fetchJobs();
  }, [fetchData, userType, skip]);

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

  const onLoadMore = () => {
    setSkip((skip) => skip + 6);
  };

  let page =
    jobs || applications ? (
      userType === 0 ? (
        <WorkerJobsHistory
          applications={applications}
          updateApplications={updateApplications}
          onLoadMore={onLoadMore}
          endReached={endReached}
        />
      ) : userType === 1 ? (
        <DirectorJobsHistory
          jobs={jobs}
          updateJobs={updateJobs}
          onLoadMore={onLoadMore}
          endReached={endReached}
        />
      ) : (
        <ManagerJobsHistory
          jobs={jobs}
          onLoadMore={onLoadMore}
          endReached={endReached}
        />
      )
    ) : (
      <PageContainer>
        <></>
      </PageContainer>
    );

  return page;
};

export default JobsHistory;
