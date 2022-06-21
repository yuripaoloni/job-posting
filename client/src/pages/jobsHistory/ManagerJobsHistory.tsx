import { useState } from "react";
import { Row } from "design-react-kit";

import JobCard from "../../components/jobs/JobCard";
import JobParticipantsModal from "../../components/jobs/JobParticipantsModal";

import { Job } from "../../typings/jobs.type";
import PageContainer from "../../components/layout/PageContainer";
import LoadMoreButton from "../../components/layout/LoadMoreButton";

type ManagerJobsHistoryProps = {
  jobs: Job[] | undefined;
  onLoadMore: () => void;
  endReached: boolean;
};

const ManagerJobsHistory = ({
  jobs,
  onLoadMore,
  endReached,
}: ManagerJobsHistoryProps) => {
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
        job={selectedJob}
      />
      <Row className="justify-content-between align-items-center px-3 mb-4">
        <h2 className="align-middle">Storico offerte create</h2>
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

export default ManagerJobsHistory;
