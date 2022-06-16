import { useState } from "react";
import { Row } from "design-react-kit";

import PageContainer from "../../components/layout/PageContainer";
import JobCard from "../../components/jobs/JobCard";
import JobParticipantsModal from "../../components/jobs/JobParticipantsModal";

import { Job } from "../../typings/jobs.type";
import LoadMoreButton from "../../components/layout/LoadMoreButton";

type DirectorJobsHistoryProps = {
  jobs: Job[] | undefined;
  updateJobs: (job: Job, update: boolean) => void;
  onLoadMore: () => void;
  endReached: boolean;
};

const DirectorJobsHistory = ({
  jobs,
  updateJobs,
  onLoadMore,
  endReached,
}: DirectorJobsHistoryProps) => {
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const toggleParticipantsModal = (job?: Job) => {
    setShowParticipantsModal((prev) => !prev);
    job && setSelectedJob(job);
  };

  return (
    <PageContainer>
      <JobParticipantsModal
        isOpen={showParticipantsModal}
        toggleModal={toggleParticipantsModal}
        updateJobs={updateJobs}
        job={selectedJob}
      />
      <Row className="justify-content-between align-items-center px-3 mb-4">
        <h2 className="align-middle">Storico offerte</h2>
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
          : "Nessuna offerta nello storico"}
      </Row>
      <LoadMoreButton show={endReached} onClick={() => onLoadMore()} />
    </PageContainer>
  );
};

export default DirectorJobsHistory;
