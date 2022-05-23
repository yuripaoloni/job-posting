import { Job } from "../../typings/jobs.type";
import { UserType } from "../../typings/utente.type";

type DirectorJobsProps = {
  jobs: Job[] | undefined;
  userType: UserType;
};

const DirectorJobs = ({ jobs, userType }: DirectorJobsProps) => {
  return <div>DirectorJobs</div>;
};

export default DirectorJobs;
