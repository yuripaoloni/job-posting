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
  Popover,
  PopoverHeader,
  PopoverBody,
} from "design-react-kit";
import { useRef, useState } from "react";
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
  const [popoverOpen, setPopoverOpen] = useState(false);

  const targetRef = useRef(null);

  const infoIcon = (
    <Icon
      icon="it-info-circle"
      className="ml-2"
      role="button"
      onClick={() => setPopoverOpen((prev) => !prev)}
      ref={targetRef}
    />
  );

  const participantIcon = (
    <Icon icon="it-user" onClick={() => onShowParticipants!()} role="button" />
  );

  return (
    <Col lg={4} md={6} sm={12}>
      <Popover
        placement="bottom"
        target={targetRef}
        isOpen={popoverOpen}
        toggle={() => setPopoverOpen((prev) => !prev)}
      >
        <PopoverHeader>Descrizione</PopoverHeader>
        <PopoverBody>{job.descrizione}</PopoverBody>
      </Popover>
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
              <div ref={targetRef}>
                {userType === 0 ? (
                  <>
                    <Score score={job.punteggio?.punteggio} />
                    <Icon
                      icon="it-plus-circle"
                      className="ml-2"
                      onClick={() => onApplyJob!()}
                      role="button"
                    />
                    {infoIcon}
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
                    {infoIcon}
                  </div>
                ) : userType === 2 ? (
                  <div>
                    {job.approvata === true && participantIcon}
                    <Icon
                      icon="it-pencil"
                      className="ml-2"
                      onClick={() => onEditJob!()}
                      role="button"
                    />
                    {!job.approvata && (
                      <Icon
                        icon="it-delete"
                        color="danger"
                        className="ml-2"
                        onClick={() => onDeleteJob!()}
                        role="button"
                      />
                    )}
                    {infoIcon}
                  </div>
                ) : (
                  <div>
                    {job.approvata && participantIcon}
                    {infoIcon}
                  </div>
                )}
              </div>
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
