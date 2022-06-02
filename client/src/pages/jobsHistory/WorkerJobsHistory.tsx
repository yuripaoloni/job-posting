import { Row } from "design-react-kit";

import ApplicationCard from "../../components/jobs/ApplicationCard";
import PageContainer from "../../components/layout/PageContainer";

import { useConfirm } from "../../contexts/ConfirmContext";
import { useFetch } from "../../contexts/FetchContext";

import { Candidatura } from "../../typings/utente.type";

type WorkerJobsHistoryProps = {
  applications: Candidatura[] | undefined;
  updateApplications: (application: Candidatura, update: boolean) => void;
};

const WorkerJobsHistory = ({
  applications,
  updateApplications,
}: WorkerJobsHistoryProps) => {
  const { fetchData } = useFetch();
  const { toggleConfirm } = useConfirm();

  const onWithdrawApplication = async (application: Candidatura) => {
    toggleConfirm(
      `Annullare candidatura a ${application.offerta?.ruolo} per ${application.offerta?.struttura} ?`,
      () => withdrawApplication(application)
    );
  };

  const withdrawApplication = async (application: Candidatura) => {
    const res = await fetchData<{ success: boolean }>(
      `/jobs/offers/withdraw/${application.id}`,
      "DELETE"
    );

    res?.data.success && updateApplications(application, false);
  };

  return (
    <PageContainer>
      <Row className="justify-content-between align-items-center px-3 mb-4">
        <h2 className="align-middle">Candidature</h2>
      </Row>
      <Row>
        {applications?.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onWithdrawApplication={() => onWithdrawApplication(application)}
          />
        ))}
      </Row>
    </PageContainer>
  );
};

export default WorkerJobsHistory;
