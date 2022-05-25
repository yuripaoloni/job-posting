import { Container, Row } from "design-react-kit";

import JobCard from "../../components/jobs/JobCard";

import { Job } from "../../typings/jobs.type";
import { UserType } from "../../typings/utente.type";

//TODO mostrare un Dimmer per dire di completare processo di Profilazione

type WorkerJobsProps = {
  jobs: Job[] | undefined;
  userType: UserType;
};

const WorkerJobs = ({ jobs, userType }: WorkerJobsProps) => {
  return (
    <Container fluid className="p-4">
      <Row className="justify-content-between align-items-center px-3 mb-4">
        <h2 className="align-middle">Offerte di lavoro</h2>
      </Row>
      <Row>
        {jobs?.map((job) => (
          <JobCard job={job} userType={userType} onApplyJob={() => {}} />
        ))}
      </Row>
    </Container>
  );
};

export default WorkerJobs;
