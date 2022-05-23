import {
  Card,
  CardBody,
  CardTitle,
  CardSignature,
  CardTagsHeader,
  Badge,
  Progress,
  Button,
} from "design-react-kit";
import { Job } from "../../typings/jobs.type";
import { UserType } from "../../typings/utente.type";

type JobCardProps = {
  job: Job;
  userType: UserType;
};

const JobCard = ({ job, userType }: JobCardProps) => {
  return (
    <Card spacing className="card-bg">
      <CardBody>
        <CardTagsHeader
          className="align-items-center"
          date={`Valida fino al ${job.dataScadenza}`}
        >
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
        </CardTagsHeader>
        <CardTitle tag="h4">{job.ruolo}</CardTitle>
        <CardSignature>{job.struttura}</CardSignature>
        {/* //TODO change footer based on user type */}
        <div className="it-card-footer">
          {userType === 0 ? (
            <>
              <div>
                <h5 className="text-success">Affinità 75%</h5>
                <span>
                  <Progress value="75" color="success" />
                </span>
              </div>
              <Button outline color="primary" size="sm">
                Candidati
              </Button>
            </>
          ) : userType === 1 ? (
            <Button outline color="primary" size="sm">
              Approva/rifiuta
            </Button>
          ) : (
            <Button outline color="primary" size="sm">
              Modifica
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default JobCard;
