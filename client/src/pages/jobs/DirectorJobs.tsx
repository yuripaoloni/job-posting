import { Job } from "../../typings/jobs.type";
import { UserType } from "../../typings/utente.type";

type DirectorJobsProps = {
  jobs: Job[] | undefined;
  userType: UserType;
  updateJobs: (job: Job, update: boolean) => void;
};

const DirectorJobs = ({ jobs, userType, updateJobs }: DirectorJobsProps) => {
  return <div>DirectorJobs</div>;
};

export default DirectorJobs;
