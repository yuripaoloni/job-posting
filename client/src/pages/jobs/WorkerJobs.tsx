import { Container, Row } from "design-react-kit";

import JobCard from "../../components/jobs/JobCard";
import { useConfirm } from "../../contexts/ConfirmContext";
import { useFetch } from "../../contexts/FetchContext";

import { Job } from "../../typings/jobs.type";
import { UserType } from "../../typings/utente.type";

//TODO mostrare un Dimmer per dire di completare processo di Profilazione

type WorkerJobsProps = {
  jobs: Job[] | undefined;
  userType: UserType;
  updateJobs: (job: Job, update: boolean) => void;
};

const WorkerJobs = ({ jobs, userType, updateJobs }: WorkerJobsProps) => {
  const { fetchData } = useFetch();
  const { toggleConfirm } = useConfirm();

  const onApplyJob = async (job: Job) => {
    const res = await fetchData<{ success: boolean }>(
      `/jobs/offers/apply`,
      "POST",
      { jobOfferId: job.id, score: job.punteggio }
    );

    res?.data.success && updateJobs(job, false);
  };

  return (
    <Container fluid className="p-4">
      <Row className="justify-content-between align-items-center px-3 mb-4">
        <h2 className="align-middle">Offerte di lavoro</h2>
      </Row>
      <Row>
        {jobs?.map((job) => (
          <JobCard
            job={job}
            userType={userType}
            onApplyJob={() => {
              toggleConfirm(
                `Procedere con la candidatura a ${job.ruolo} per ${job.struttura} ?`,
                () => onApplyJob(job)
              );
            }}
          />
        ))}
      </Row>
    </Container>
  );
};

export default WorkerJobs;
