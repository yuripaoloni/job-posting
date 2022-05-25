import { useState } from "react";
import { Container, Row, Button, Icon } from "design-react-kit";

import JobModal from "../../components/jobs/JobModal";
import JobCard from "../../components/jobs/JobCard";

import { Job, JobRes } from "../../typings/jobs.type";
import { UserType } from "../../typings/utente.type";
import { useFetch } from "../../contexts/FetchContext";
import { useConfirm } from "../../contexts/ConfirmContext";

type ManagerJobsProps = {
  jobs: Job[] | undefined;
  userType: UserType;
  updateJobs: (job: Job, update: boolean) => void;
};

const ManagerJobs = ({ jobs, userType, updateJobs }: ManagerJobsProps) => {
  const [showJobModal, setShowJobModal] = useState(false);

  const { fetchData } = useFetch();
  const { toggleConfirm } = useConfirm();

  const toggleModal = () => {
    setShowJobModal((prev) => !prev);
  };

  const onDeleteOffer = async (jobId: number) => {
    const res = await fetchData<JobRes>(`/jobs/offer/${jobId}`, "DELETE");

    res?.data.jobOffer && updateJobs(res.data.jobOffer, false);
  };

  return (
    <Container fluid className="p-4">
      <JobModal
        isOpen={showJobModal}
        toggleModal={toggleModal}
        updateJobs={updateJobs}
      />
      <Row className="justify-content-between align-items-center px-3 mb-4">
        <h2 className="align-middle">Offerte di lavoro</h2>
        <Button
          color="primary"
          className="btn-icon"
          onClick={() => toggleModal()}
        >
          <span>
            <Icon color="white" icon="it-plus" size="sm" />
          </span>
          <span className="d-none d-md-block ml-2">
            Crea una nuova offerta lavorativa
          </span>
        </Button>
      </Row>
      <Row>
        {jobs?.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            userType={userType}
            onDeleteJob={() =>
              toggleConfirm(`Eliminare offerta di lavoro ${job.ruolo} ?`, () =>
                onDeleteOffer(job.id)
              )
            }
            onEditJob={() => {}}
          />
        ))}
      </Row>
    </Container>
  );
};

export default ManagerJobs;
