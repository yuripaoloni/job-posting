import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
} from "design-react-kit";
import { useAuth } from "../../contexts/AuthContext";
import { Job } from "../../typings/jobs.type";
import { formatNameSurname } from "../../utils/formatNameSurname";
import Score from "./Score";

type JobParticipantsProps = {
  isOpen: boolean;
  toggleModal: () => void;
  job: Job | null;
  onAcceptApplication?: (applicationId: number, candidate: string) => void;
};

const JobParticipantsModal = ({
  isOpen,
  toggleModal,
  job,
  onAcceptApplication,
}: JobParticipantsProps) => {
  const { userType } = useAuth();

  return (
    <Modal isOpen={isOpen} toggle={() => toggleModal()} scrollable size="lg">
      <ModalHeader>Lista candidature - {job?.ruolo}</ModalHeader>
      <ModalBody>
        {job?.candidaturas && job?.candidaturas?.length > 0
          ? job?.candidaturas?.map((candidatura) => (
              <Row
                key={candidatura.id}
                className="align-items-center justify-content-between border-bottom px-2 pb-2 mb-2"
              >
                <Col xs={8}>
                  <h6>
                    {formatNameSurname(
                      candidatura.utenteCf!.nome!,
                      candidatura.utenteCf!.cognome!
                    )}
                    <small> ({candidatura.utenteCf?.email})</small>
                  </h6>
                  <p>{candidatura.utenteCf?.preparazione}</p>
                  <p>
                    Prima occupazione nel{" "}
                    {candidatura.utenteCf?.annoPrimaOccupazione} ed ingresso in
                    Unicam nel {candidatura.utenteCf?.annoIngressoUnicam}
                  </p>
                  <p>
                    {candidatura.utenteCf?.competenzeLinguistiches?.map(
                      (competenzaLinguistica) =>
                        `${competenzaLinguistica.lingua}-${competenzaLinguistica.livello}`
                    )}
                  </p>
                  <Score score={candidatura.punteggio} />
                </Col>
                {userType === 1 && (
                  <Col xs={2}>
                    <Button
                      size="sm"
                      color="primary"
                      onClick={() =>
                        onAcceptApplication!(
                          candidatura.id,
                          formatNameSurname(
                            candidatura.utenteCf!.nome!,
                            candidatura.utenteCf!.cognome!
                          )
                        )
                      }
                    >
                      Seleziona candidato
                    </Button>
                  </Col>
                )}
              </Row>
            ))
          : "Nessun candidatura"}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" outline onClick={() => toggleModal()} size="sm">
          Chiudi
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default JobParticipantsModal;
