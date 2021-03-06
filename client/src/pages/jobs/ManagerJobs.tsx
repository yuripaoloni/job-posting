import { useState } from "react";
import { Row, Button, Icon } from "design-react-kit";

import JobModal from "../../components/jobs/JobModal";
import JobCard from "../../components/jobs/JobCard";

import { Job, JobRes } from "../../typings/jobs.type";
import { UserType } from "../../typings/utente.type";
import { useFetch } from "../../contexts/FetchContext";
import { useConfirm } from "../../contexts/ConfirmContext";
import JobParticipantsModal from "../../components/jobs/JobParticipantsModal";
import PageContainer from "../../components/layout/PageContainer";
import LoadMoreButton from "../../components/layout/LoadMoreButton";

type ManagerJobsProps = {
  jobs: Job[] | undefined;
  userType: UserType;
  updateJobs: (job: Job, update: boolean, jobId?: number) => void;
  onLoadMore: () => void;
  endReached: boolean;
};

const ManagerJobs = ({
  jobs,
  userType,
  updateJobs,
  onLoadMore,
  endReached,
}: ManagerJobsProps) => {
  const [showJobModal, setShowJobModal] = useState(false);
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const { fetchData } = useFetch();
  const { toggleConfirm } = useConfirm();

  const toggleJobModal = (job?: Job) => {
    setShowJobModal((prev) => !prev);
    setSelectedJob(job ? job : null);
  };

  const toggleParticipantsModal = (job?: Job) => {
    setShowParticipantsModal((prev) => !prev);
    setSelectedJob(job ? job : null);
  };

  const onDeleteOffer = async (jobId: number) => {
    const res = await fetchData<JobRes>(`/jobs/offers/${jobId}`, "DELETE");

    res?.data.jobOffer && updateJobs(res.data.jobOffer, false, jobId);
  };

  return (
    <PageContainer>
      <JobModal
        isOpen={showJobModal}
        toggleModal={toggleJobModal}
        updateJobs={updateJobs}
        job={selectedJob}
      />
      <JobParticipantsModal
        isOpen={showParticipantsModal}
        toggleModal={toggleParticipantsModal}
        updateJobs={updateJobs}
        job={selectedJob}
      />
      <Row className="justify-content-between align-items-center px-3 mb-4">
        <h2 className="align-middle">Offerte di lavoro create</h2>
        <Button
          color="primary"
          className="btn-icon"
          onClick={() => toggleJobModal()}
        >
          <span>
            <Icon color="white" icon="it-plus" size="sm" />
          </span>
          <span className="d-none d-md-block ml-2">
            Crea una nuova posizione
          </span>
        </Button>
      </Row>
      <Row>
        {jobs && jobs?.length > 0
          ? jobs?.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                userType={userType}
                onDeleteJob={() =>
                  toggleConfirm(
                    `Eliminare offerta di lavoro ${job.ruolo} ?`,
                    () => onDeleteOffer(job.id)
                  )
                }
                onEditJob={() => toggleJobModal(job)}
                onShowParticipants={() => toggleParticipantsModal(job)}
              />
            ))
          : "Nessuna offerta disponibile"}
      </Row>
      <LoadMoreButton show={endReached} onClick={() => onLoadMore()} />
    </PageContainer>
  );
};

export default ManagerJobs;
