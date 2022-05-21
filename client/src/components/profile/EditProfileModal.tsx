import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Button,
} from "design-react-kit";
import { Utente } from "../../typings/utente.type";

type EditProfileModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
  user: Utente | undefined;
};

//TODO wait for issue on design-react-kit to be resolved

const EditProfileModal = ({
  isOpen,
  toggleModal,
  user,
}: EditProfileModalProps) => {
  const [firstOccupationYear, setFirstOccupationYear] = useState<
    number | undefined
  >(undefined);
  const [preparation, setPreparation] = useState<string | undefined>(undefined);

  const onEditUser = () => {};

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggleModal()}
      labelledBy="editProfileModal"
      centered
    >
      <ModalHeader id="editProfileModal">
        <h4>Modifica profilo</h4>
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Input
            type="text"
            id="preparation"
            value={preparation}
            placeholder="Diploma/Laurea"
            label="Preparazione"
            onChange={(e) => setPreparation(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            id="firstOccupationYear"
            value={firstOccupationYear}
            placeholder="1996"
            label="Anno prima occupazione lavorativa"
            onChange={(e) => setFirstOccupationYear(e.target.valueAsNumber)}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button outline color="danger" onClick={() => toggleModal()}>
          Chiudi
        </Button>
        <Button color="primary" onClick={() => onEditUser()}>
          Modifica
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditProfileModal;
