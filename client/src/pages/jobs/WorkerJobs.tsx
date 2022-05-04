import { Job } from "../../typings";

type WorkerJobsProps = {
  jobs: Job[];
};

const WorkerJobs = ({ jobs }: WorkerJobsProps) => {
  return <div>WorkerJobs</div>;
};

export default WorkerJobs;
