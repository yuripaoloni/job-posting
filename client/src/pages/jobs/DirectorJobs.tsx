import { Row } from "design-react-kit";
import { useState } from "react";
import DetermineJobModal from "../../components/jobs/DetermineJobModal";

import JobCard from "../../components/jobs/JobCard";
import PageContainer from "../../components/layout/PageContainer";
import { useFetch } from "../../contexts/FetchContext";

import { Job } from "../../typings/jobs.type";
import { UserType } from "../../typings/utente.type";

type DirectorJobsProps = {
  jobs: Job[] | undefined;
  userType: UserType;
  updateJobs: (job: Job, update: boolean) => void;
};

const DirectorJobs = ({ jobs, userType, updateJobs }: DirectorJobsProps) => {
  const [showDetermineJobModal, setShowDetermineJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [approved, setApproved] = useState(false);

  const { fetchData } = useFetch();

  const toggleDetermineJobModal = (job?: Job, approved?: boolean) => {
    setShowDetermineJobModal((prev) => !prev);
    if (job) {
      setSelectedJob(job);
      setApproved(approved!);
    }
  };

  const onDetermineJob = async (message: string) => {
    toggleDetermineJobModal();

    const res = await fetchData<{ success: boolean }>(
      `/jobs/offers/determine`,
      "POST",
      { approved, jobOfferId: selectedJob!.id, message }
    );

    res?.data.success && updateJobs(selectedJob!, false);
  };

  return (
    <PageContainer>
      <DetermineJobModal
        isOpen={showDetermineJobModal}
        toggleModal={toggleDetermineJobModal}
        job={selectedJob}
        approved={approved}
        onDetermineJob={onDetermineJob}
      />
      <Row className="justify-content-between align-items-center px-3 mb-4">
        <h2 className="align-middle">Nuove offerte di lavoro</h2>
      </Row>
      <Row>
        {jobs?.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            userType={userType}
            onApproveJob={() => toggleDetermineJobModal(job, true)}
            onRejectJob={() => toggleDetermineJobModal(job, false)}
          />
        ))}
      </Row>
    </PageContainer>
  );
};

export default DirectorJobs;
