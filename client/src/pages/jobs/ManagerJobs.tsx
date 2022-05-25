import { useState } from "react";
import { Container, Row, Button, Col } from "design-react-kit";

import JobModal from "../../components/jobs/JobModal";
import JobCard from "../../components/jobs/JobCard";

import { Job } from "../../typings/jobs.type";
import { UserType } from "../../typings/utente.type";

type ManagerJobsProps = {
  jobs: Job[] | undefined;
  userType: UserType;
  updateJobs: (job: Job, update: boolean) => void;
};

const ManagerJobs = ({ jobs, userType, updateJobs }: ManagerJobsProps) => {
  const [showJobModal, setShowJobModal] = useState(false);

  const toggleModal = () => {
    setShowJobModal((prev) => !prev);
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
        <Button color="primary" onClick={() => toggleModal()}>
          Crea una nuova offerta lavorativa
        </Button>
      </Row>
      <Row>
        {jobs?.map((job) => (
          <Col xs="12" lg="4" key={job.id}>
            <JobCard job={job} userType={userType} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ManagerJobs;
