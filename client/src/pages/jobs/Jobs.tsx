import { useEffect, useState } from "react";

import DirectorJobs from "./DirectorJobs";
import ManagerJobs from "./ManagerJobs";
import WorkerJobs from "./WorkerJobs";

import { useAuth } from "../../contexts/AuthContext";

import { Job } from "../../typings/jobs.type";
import { useFetch } from "../../contexts/FetchContext";
import PageContainer from "../../components/layout/PageContainer";

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[] | undefined>(undefined);
  const [skip, setSkip] = useState(0);
  const [endReached, setEndReached] = useState(false);

  const { userType } = useAuth();
  const { fetchData } = useFetch();

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetchData<Job[]>(`/jobs/offers/${skip}`, "GET");

      if (res?.data) {
        setJobs((prev) => (prev ? [...prev, ...res?.data] : [...res.data]));

        res.data.length < 6 && setEndReached(true);
      }
    };

    fetchJobs();
  }, [fetchData, skip]);

  const updateJobs = (job: Job, update: boolean, jobId?: number) => {
    console.log(job.richiestaSoftSkills);
    let updatedJobs = jobs ? jobs?.slice() : [];
    if (update) {
      const index = updatedJobs.findIndex((item) => item.id === job.id);
      index > -1 ? (updatedJobs[index] = job) : updatedJobs.unshift(job);
    } else {
      updatedJobs = updatedJobs.filter((item) => item.id !== jobId);
    }
    setJobs(updatedJobs);
  };

  const onLoadMore = () => {
    setSkip((skip) => skip + 6);
  };

  let page = jobs ? (
    userType === 0 ? (
      <WorkerJobs
        jobs={jobs}
        userType={0}
        updateJobs={updateJobs}
        onLoadMore={onLoadMore}
        endReached={endReached}
      />
    ) : userType === 1 ? (
      <DirectorJobs
        jobs={jobs}
        userType={1}
        updateJobs={updateJobs}
        onLoadMore={onLoadMore}
        endReached={endReached}
      />
    ) : (
      <ManagerJobs
        jobs={jobs}
        userType={2}
        updateJobs={updateJobs}
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

export default Jobs;
