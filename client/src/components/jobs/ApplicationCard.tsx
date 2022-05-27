import {
  Col,
  Card,
  CardBody,
  CardTagsHeader,
  Badge,
  Icon,
  CardTitle,
  CardSignature,
  CardFooterCTA,
} from "design-react-kit";
import { Candidatura } from "../../typings/utente.type";
import Score from "./Score";

type ApplicationCardProps = {
  application: Candidatura;
  onWithdrawApplication: () => void;
};

const ApplicationCard = ({
  application,
  onWithdrawApplication,
}: ApplicationCardProps) => {
  return (
    <Col lg={4} md={6} sm={12}>
      <Card spacing className="card-bg">
        <CardBody>
          <CardTagsHeader className="align-items-center">
            <Badge color={application.approvata ? "success" : "warning"} pill>
              {application.approvata ? "Approvata" : "In attesa"}
            </Badge>
            <Score score={application.punteggio} />
            <Icon
              icon="it-close-circle"
              color="danger"
              className="ml-2"
              onClick={() => onWithdrawApplication()}
              role="button"
            />
          </CardTagsHeader>
          <CardTitle tag="h4">{application.offerta?.ruolo}</CardTitle>
          <CardSignature>{application.offerta?.struttura}</CardSignature>
          <CardFooterCTA>{`Candidatura inviata il ${application.data}`}</CardFooterCTA>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ApplicationCard;
