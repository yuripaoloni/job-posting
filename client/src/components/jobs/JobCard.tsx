import {
  Card,
  CardBody,
  CardTitle,
  CardSignature,
  CardTagsHeader,
  Badge,
  Col,
  Icon,
  CardFooterCTA,
  Tooltip,
  Fade,
} from "design-react-kit";
import { useState } from "react";
import { Job } from "../../typings/jobs.type";
import { UserType } from "../../typings/utente.type";

import Score from "./Score";

type UserTypeProps =
  | {
      // manager
      onDeleteJob: () => void;
      onEditJob: () => void;
      onShowParticipants: () => void;
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
      onShowParticipants?: never;
    }
  | {
      // director
      onApproveJob: () => void;
      onRejectJob: () => void;
      onShowParticipants?: never;
      onDeleteJob?: never;
      onEditJob?: never;
      onApplyJob?: never;
    }
  | {
      // jobs history manager-director
      onShowParticipants: () => void;
      onApplyJob?: never;
      onDeleteJob?: never;
      onEditJob?: never;
      onApproveJob?: never;
      onRejectJob?: never;
    };

type JobCardProps = {
  job: Job;
  userType?: UserType;
} & UserTypeProps;

const JobCard = ({
  job,
  userType,
  onApplyJob,
  onApproveJob,
  onDeleteJob,
  onEditJob,
  onRejectJob,
  onShowParticipants,
}: JobCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Col lg={4} md={6} sm={12}>
      <Fade>
        <Card spacing className="card-bg">
          <CardBody>
            <CardTagsHeader className="align-items-center">
              <Tooltip
                placement="top"
                target={`status-badge-${job.id}`}
                isOpen={job.approvata === false && showTooltip}
                toggle={() => setShowTooltip((prev) => !prev)}
              >
                {job.descEsito}
              </Tooltip>
              <Badge
                id={`status-badge-${job.id}`}
                color={
                  job.attiva === false
                    ? "danger"
                    : job.approvata === true
                    ? "success"
                    : job.approvata === null
                    ? "warning"
                    : "danger"
                }
                pill
              >
                {job.attiva === false
                  ? "Non attiva"
                  : job.approvata === true
                  ? "Attiva"
                  : job.approvata === null
                  ? "In approvazione"
                  : "Non attiva"}
              </Badge>
              {userType === 0 ? (
                <>
                  <Score score={job.punteggio} />
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
                    icon="it-close-circle"
                    color="danger"
                    className="ml-2"
                    onClick={() => onRejectJob!()}
                    role="button"
                  />
                </div>
              ) : userType === 2 ? (
                <div>
                  <Icon
                    icon="it-user"
                    onClick={() => onShowParticipants!()}
                    role="button"
                  />
                  <Icon
                    icon="it-pencil"
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
              ) : (
                <div>
                  <Icon
                    icon="it-user"
                    onClick={() => onShowParticipants!()}
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
      </Fade>
    </Col>
  );
};

export default JobCard;
