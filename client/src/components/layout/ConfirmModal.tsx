import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "design-react-kit";
import { useConfirm } from "../../contexts/ConfirmContext";

const ConfirmModal = () => {
  const { showConfirm, confirmMessage, closeConfirm, onConfirm } = useConfirm();

  return (
    <Modal isOpen={showConfirm} toggle={() => closeConfirm()} popConfirm>
      <ModalHeader>Conferma operazione</ModalHeader>
      <ModalBody>
        <p>{confirmMessage}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => onConfirm()} size="sm">
          Procedi
        </Button>
        <Button
          color="secondary"
          onClick={() => closeConfirm()}
          size="sm"
          outline
        >
          Chiudi
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmModal;
