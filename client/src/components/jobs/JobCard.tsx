import {
  Card,
  CardBody,
  CardTitle,
  CardSignature,
  CardTagsHeader,
  Badge,
  Progress,
  Col,
  Icon,
  CardFooterCTA,
} from "design-react-kit";
import { Job } from "../../typings/jobs.type";
import { UserType } from "../../typings/utente.type";

type UserTypeProps =
  | {
      // manager
      onDeleteJob: () => void;
      onEditJob: () => void;
      onApplyJob?: never;
      onApproveJob?: never;
      onRejectJob?: never;
    }
  | {
      // worker
      onApplyJob: () => void;
      onDeleteJob?: never;
      onEditJob?: never;
      onApproveJob?: never;
      onRejectJob?: never;
    }
  | {
      // director
      onApproveJob: () => void;
      onRejectJob: () => void;
      onDeleteJob?: never;
      onEditJob?: never;
      onApplyJob?: never;
    };

type JobCardProps = {
  job: Job;
  userType: UserType;
} & UserTypeProps;

const JobCard = ({
  job,
  userType,
  onApplyJob,
  onApproveJob,
  onDeleteJob,
  onEditJob,
  onRejectJob,
}: JobCardProps) => {
  return (
    <Col lg={4} md={5} sm={12}>
      <Card spacing className="card-bg">
        <CardBody>
          <CardTagsHeader className="align-items-center">
            <Badge
              color={
                job.attiva ? "success" : !job.approvata ? "warning" : "danger"
              }
              pill
            >
              {job.attiva
                ? "Attiva"
                : !job.approvata
                ? "In approvazione"
                : "Non attiva"}
            </Badge>
            {userType === 0 ? (
              <>
                <div>
                  <h6 className="text-success">Affinità {job.punteggio}%</h6>
                  <span>
                    <Progress value="75" color="success" />
                  </span>
                </div>
                <Icon
                  icon="it-plus-circle"
                  className="ml-2"
                  onClick={() => onApplyJob!()}
                  role="button"
                />
              </>
            ) : userType === 1 ? (
              <div>
                <Icon
                  color="success"
                  icon="it-check-circle"
                  onClick={() => onApproveJob!()}
                  role="button"
                />
                <Icon
                  icon="it-ban"
                  color="danger"
                  className="ml-2"
                  onClick={() => onRejectJob!()}
                  role="button"
                />
              </div>
            ) : (
              <div>
                <Icon
                  icon="it-pencil"
                  onClick={() => onEditJob!()}
                  role="button"
                />
                <Icon
                  icon="it-user"
                  className="ml-2"
                  onClick={() => onEditJob!()}
                  role="button"
                />
                <Icon
                  icon="it-delete"
                  color="danger"
                  className="ml-2"
                  onClick={() => onDeleteJob!()}
                  role="button"
                />
              </div>
            )}
          </CardTagsHeader>
          <CardTitle tag="h4">{job.ruolo}</CardTitle>
          <CardSignature>{job.struttura}</CardSignature>
          <CardFooterCTA>{`Valida fino al ${job.dataScadenza}`}</CardFooterCTA>
        </CardBody>
      </Card>
    </Col>
  );
};

export default JobCard;
