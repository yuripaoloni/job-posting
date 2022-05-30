import { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Button,
  Row,
  Col,
  Chip,
  ChipLabel,
  Icon,
} from "design-react-kit";
import { CompetenzeLinguistiche, Utente } from "../../typings/utente.type";
import { useFetch } from "../../contexts/FetchContext";

type EditProfileModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
  user: Utente | undefined;
  updateUser: (
    firstOccupationYear: number,
    preparation: string,
    languages: CompetenzeLinguistiche[]
  ) => void;
};

const EditProfileModal = ({
  isOpen,
  toggleModal,
  user,
  updateUser,
}: EditProfileModalProps) => {
  const [firstOccupationYear, setFirstOccupationYear] = useState<number>(0);
  const [preparation, setPreparation] = useState<string>("");
  const [languages, setLanguages] = useState<CompetenzeLinguistiche[]>([
    { id: 1, lingua: "Inglese", livello: "A1" },
  ]);

  const { fetchData } = useFetch();

  useEffect(() => {
    if (user) {
      setFirstOccupationYear(user.annoPrimaOccupazione!);
      setPreparation(user.preparazione!);
      setLanguages(user.competenzeLinguistiches!);
    }
  }, [user]);

  const onEditUser = async () => {
    toggleModal();

    const res = await fetchData<{ success: boolean }>("/profile", "POST", {
      firstOccupationYear,
      preparation,
      languages,
    });

    res?.data.success &&
      updateUser(firstOccupationYear, preparation, languages);
  };

  const removeLanguage = (index: number) => {
    let updatedLanguages = languages.slice();
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  const handleLanguageChange = (index: number, lingua: string) => {
    let updatedLanguages = languages.slice();
    updatedLanguages[index].lingua = lingua;
    setLanguages(updatedLanguages);
  };

  const handleLevelChange = (index: number, livello: string) => {
    let updatedLanguages = languages.slice();
    updatedLanguages[index].livello = livello;
    setLanguages(updatedLanguages);
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggleModal()}
      labelledBy="editProfileModal"
      centered
    >
      <ModalHeader id="editProfileModal" tag="h4">
        Modifica profilo
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Input
            type="text"
            id="preparation"
            value={preparation}
            infoText="Aggiungi diploma/laurea"
            placeholder="Laurea Triennale in..."
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
        {languages.map((item, index) => (
          <FormGroup key={index} tag={Row} className="align-items-center">
            <Col xs={6}>
              <div className="select-wrapper">
                <label htmlFor="defaultSelect">Lingua</label>
                <select
                  id="defaultSelect"
                  value={item.lingua}
                  onChange={(e) => handleLanguageChange(index, e.target.value)}
                >
                  <option value="Inglese">Inglese</option>
                  <option value="Francese">Francese</option>
                  <option value="Spagnolo">Spagnolo</option>
                  <option value="Tedesco">Tedesco</option>
                  <option value="Cinese">Cinese</option>
                </select>
              </div>
            </Col>
            <Col xs={5}>
              <div className="select-wrapper">
                <label htmlFor="defaultSelect">Livello</label>
                <select
                  id="defaultSelect"
                  value={item.livello}
                  onChange={(e) => handleLevelChange(index, e.target.value)}
                >
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
              </div>
            </Col>
            <Col xs={1}>
              <Icon
                icon="it-minus-circle"
                color="danger"
                role="button"
                onClick={() => removeLanguage(index)}
              />
            </Col>
          </FormGroup>
        ))}
        <Chip
          simple
          color="primary"
          role="button"
          onClick={() =>
            setLanguages((prev) => [
              ...prev,
              { id: prev.length + 1, lingua: "Inglese", livello: "A1" },
            ])
          }
        >
          <Icon icon="it-plus" size="xs" />
          <ChipLabel>Aggiungi lingua </ChipLabel>
        </Chip>
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
