import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup,
  Button,
  TextArea,
} from "design-react-kit";
import { useState } from "react";
import { Job } from "../../typings/jobs.type";

type DetermineJobModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
  approved: boolean;
  job: Job | null;
  onDetermineJob: (message: string) => void;
};

const DetermineJobModal = ({
  isOpen,
  toggleModal,
  onDetermineJob,
  approved,
  job,
}: DetermineJobModalProps) => {
  const [message, setMessage] = useState("");

  return (
    <Modal isOpen={isOpen} toggle={() => toggleModal()}>
      <ModalHeader
        className="align-items-center mb-3"
        tag="h4"
        toggle={() => toggleModal()}
      >
        {approved ? "Approva" : "Rifiuta"} offerta
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <p>
            {job?.ruolo} per {job?.struttura}
          </p>
        </FormGroup>
        <FormGroup>
          <TextArea
            rows={3}
            id="message"
            value={message}
            infoText="Aggiungi un commento"
            label="Messaggio"
            onChange={(e) => setMessage(e.target.value)}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => onDetermineJob(message)}>
          {approved ? "Approva" : "Rifiuta"}
        </Button>
        <Button color="danger" outline onClick={() => toggleModal()}>
          Chiudi
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DetermineJobModal;
