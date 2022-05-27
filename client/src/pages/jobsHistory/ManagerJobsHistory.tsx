import { Container, Row } from "design-react-kit";
import JobCard from "../../components/jobs/JobCard";
import { Job } from "../../typings/jobs.type";

type ManagerJobsHistoryProps = {
  jobs: Job[] | undefined;
};

const ManagerJobsHistory = ({ jobs }: ManagerJobsHistoryProps) => {
  return (
    <Container fluid className="p-4">
      <Row className="justify-content-between align-items-center px-3 mb-4">
        <h2 className="align-middle">Storico offerte create</h2>
      </Row>
      <Row>
        {/* {jobs?.map((job) => (
          <JobCard key={job.id} job={job} />
        ))} */}
      </Row>
    </Container>
  );
};

export default ManagerJobsHistory;
