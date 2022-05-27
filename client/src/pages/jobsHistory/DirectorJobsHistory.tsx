import { Job } from "../../typings/jobs.type";

type DirectorJobsHistoryProps = {
  jobs: Job[] | undefined;
};

const DirectorJobsHistory = ({ jobs }: DirectorJobsHistoryProps) => {
  return <div>DirectorJobsHistory</div>;
};

export default DirectorJobsHistory;
