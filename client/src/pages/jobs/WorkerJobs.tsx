import { Jobs } from "../../typings";

type WorkerJobsProps = {
  jobs: Jobs[];
};

const WorkerJobs = ({ jobs }: WorkerJobsProps) => {
  return <div>WorkerJobs</div>;
};

export default WorkerJobs;
