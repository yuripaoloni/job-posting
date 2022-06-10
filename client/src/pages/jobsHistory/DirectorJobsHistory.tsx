import { useState } from "react";
import { Row } from "design-react-kit";

import PageContainer from "../../components/layout/PageContainer";
import JobCard from "../../components/jobs/JobCard";
import JobParticipantsModal from "../../components/jobs/JobParticipantsModal";

import { useConfirm } from "../../contexts/ConfirmContext";
import { useFetch } from "../../contexts/FetchContext";

import { Job } from "../../typings/jobs.type";

type DirectorJobsHistoryProps = {
  jobs: Job[] | undefined;
  updateJobs: (job: Job, update: boolean) => void;
};

const DirectorJobsHistory = ({
  jobs,
  updateJobs,
}: DirectorJobsHistoryProps) => {
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const { fetchData } = useFetch();
  const { toggleConfirm } = useConfirm();

  const toggleParticipantsModal = (job?: Job) => {
    setShowParticipantsModal((prev) => !prev);
    job && setSelectedJob(job);
  };

  const onAcceptApplication = async (
    applicationId: number,
    candidate: string
  ) => {
    toggleConfirm(`Approva candidatura di ${candidate} ?`, () =>
      acceptApplication(applicationId)
    );
  };

  const acceptApplication = async (applicationId: number) => {
    toggleParticipantsModal();

    const res = await fetchData<{ success: boolean }>(
      `/jobs/offers/accept/${applicationId}`,
      "GET"
    );

    res?.data.success && updateJobs({ ...selectedJob!, attiva: false }, true);
  };

  return (
    <PageContainer>
      <JobParticipantsModal
        isOpen={showParticipantsModal}
        toggleModal={toggleParticipantsModal}
        onAcceptApplication={onAcceptApplication}
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

export default DirectorJobsHistory;
