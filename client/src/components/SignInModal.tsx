import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
  ModalFooter,
  Button,
} from "design-react-kit";
import { useState } from "react";

type SignInModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
};

const SignInModal = ({ isOpen, toggleModal }: SignInModalProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = () => {
    //TODO add signIn function, setToken and userType
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggleModal()}
      labelledBy="loginModal"
      centered
    >
      <ModalHeader id="loginModal">
        <h4>Accedi</h4>
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Input
            type="text"
            id="username"
            value={username}
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            id="password"
            value={password}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button outline color="danger" onClick={() => toggleModal()}>
          Chiudi
        </Button>
        <Button color="primary" onClick={() => onSignIn()}>
          Accedi
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SignInModal;
