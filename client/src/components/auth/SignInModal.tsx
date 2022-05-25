import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
  ModalFooter,
  Button,
} from "design-react-kit";

import { useAuth } from "../../contexts/AuthContext";
import { useFetch } from "../../contexts/FetchContext";

import { LoginRes } from "../../typings/auth.type";
import { isUserType } from "../../utils/isUserType";

type SignInModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
};

const SignInModal = ({ isOpen, toggleModal }: SignInModalProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { fetchData } = useFetch();
  const { toggleAuth } = useAuth();

  const onSignIn = async () => {
    const res = await fetchData<LoginRes>("/auth/login", "POST", {
      username: username,
      password: password,
    });

    if (isUserType(res?.data.tipoUtenteId)) {
      toggleAuth(true, res!.data.tipoUtenteId, username);
      toggleModal();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggleModal()}
      labelledBy="loginModal"
      centered
    >
      <ModalHeader
        tag="h4"
        id="loginModal"
        className="align-items-center mb-3"
        toggle={() => toggleModal()}
      >
        Accedi
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
            type="password"
            id="password"
            value={password}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => onSignIn()}>
          Accedi
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SignInModal;
