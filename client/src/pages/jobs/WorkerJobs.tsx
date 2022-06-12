import { Row } from "design-react-kit";

import JobCard from "../../components/jobs/JobCard";
import LoadMoreButton from "../../components/layout/LoadMoreButton";
import PageContainer from "../../components/layout/PageContainer";
import { useConfirm } from "../../contexts/ConfirmContext";
import { useFetch } from "../../contexts/FetchContext";

import { Job } from "../../typings/jobs.type";
import { UserType } from "../../typings/utente.type";

type WorkerJobsProps = {
  jobs: Job[] | undefined;
  userType: UserType;
  updateJobs: (job: Job, update: boolean, jobId: number) => void;
  onLoadMore: () => void;
  endReached: boolean;
};

const WorkerJobs = ({
  jobs,
  userType,
  updateJobs,
  onLoadMore,
  endReached,
}: WorkerJobsProps) => {
  const { fetchData } = useFetch();
  const { toggleConfirm } = useConfirm();

  const onApplyJob = async (job: Job) => {
    const res = await fetchData<{ success: boolean }>(
      `/jobs/offers/apply`,
      "POST",
      { jobOfferId: job.id, score: job.punteggio?.punteggio }
    );

    res?.data.success && updateJobs(job, false, job.id);
  };

  return (
    <PageContainer>
      <Row className="justify-content-between align-items-center px-3 mb-4">
        <h2 className="align-middle">Offerte di lavoro</h2>
      </Row>
      <Row>
        {jobs && jobs?.length > 0
          ? jobs?.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                userType={userType}
                onApplyJob={() => {
                  toggleConfirm(
                    `Procedere con la candidatura a ${job.ruolo} per ${job.struttura} ?`,
                    () => onApplyJob(job)
                  );
                }}
              />
            ))
          : "Nessuna offerta disponibile"}
      </Row>
      <LoadMoreButton show={endReached} onClick={() => onLoadMore()} />
    </PageContainer>
  );
};

export default WorkerJobs;
