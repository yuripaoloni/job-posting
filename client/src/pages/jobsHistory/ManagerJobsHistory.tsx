import { useState } from "react";
import { Row } from "design-react-kit";

import JobCard from "../../components/jobs/JobCard";
import JobParticipantsModal from "../../components/jobs/JobParticipantsModal";

import { Job } from "../../typings/jobs.type";
import PageContainer from "../../components/layout/PageContainer";

type ManagerJobsHistoryProps = {
  jobs: Job[] | undefined;
};

const ManagerJobsHistory = ({ jobs }: ManagerJobsHistoryProps) => {
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
        {jobs?.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onShowParticipants={() => toggleParticipantsModal(job)}
          />
        ))}
      </Row>
    </PageContainer>
  );
};

export default ManagerJobsHistory;
