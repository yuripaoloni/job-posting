import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "design-react-kit";

type LanguagesModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
};

const LanguagesModal = ({ isOpen, toggleModal }: LanguagesModalProps) => {
  const onEditLanguages = () => {
    //TODO add signIn function, setToken and userType
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggleModal()}
      labelledBy="languagesModal"
      centered
    >
      <ModalHeader id="languagesModal">
        <h4>Competenze lingustiche</h4>
      </ModalHeader>
      <ModalBody>{/* TODO */}</ModalBody>
      <ModalFooter>
        <Button outline color="danger" onClick={() => toggleModal()}>
          Chiudi
        </Button>
        <Button color="primary" onClick={() => onEditLanguages()}>
          Modifica
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LanguagesModal;
