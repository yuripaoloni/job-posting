import { Row } from "design-react-kit";
import { useState, useEffect } from "react";

import JobCard from "../../components/jobs/JobCard";
import JobParticipantsModal from "../../components/jobs/JobParticipantsModal";
import LoadMoreButton from "../../components/layout/LoadMoreButton";
import PageContainer from "../../components/layout/PageContainer";

import { useFetch } from "../../contexts/FetchContext";

import { Job } from "../../typings/jobs.type";

const ActiveJobs = () => {
  const [jobs, setJobs] = useState<Job[] | undefined>(undefined);
  const [skip, setSkip] = useState(0);
  const [endReached, setEndReached] = useState(false);
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const { fetchData } = useFetch();

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetchData<Job[]>(`/jobs/active/${skip}`, "GET");

      if (res?.data) {
        setJobs((prev) => (prev ? [...prev, ...res?.data] : [...res.data]));

        res.data.length < 6 && setEndReached(true);
      }
    };

    fetchJobs();
  }, [fetchData, skip]);

  const toggleParticipantsModal = (job?: Job) => {
    setShowParticipantsModal((prev) => !prev);
    setSelectedJob(job ? job : null);
  };

  const onLoadMore = () => {
    setSkip((skip) => skip + 6);
  };

  return (
    <PageContainer>
      <JobParticipantsModal
        isOpen={showParticipantsModal}
        toggleModal={toggleParticipantsModal}
        job={selectedJob}
      />
      <Row className="justify-content-between align-items-center  mb-4">
        <h2 className="align-middle">Offerte attive</h2>
      </Row>
      <Row>
        {jobs && jobs?.length > 0
          ? jobs?.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onShowParticipants={() => toggleParticipantsModal(job)}
              />
            ))
          : "Nessuna offerta attiva"}
      </Row>
      <LoadMoreButton show={endReached} onClick={() => onLoadMore()} />
    </PageContainer>
  );
};

export default ActiveJobs;
