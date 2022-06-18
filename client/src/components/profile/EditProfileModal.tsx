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
import Select from "../layout/Select";
import { CategoriaPreparazione, Options } from "../../typings/utils.type";

const languagesOptions = [
  { value: "Inglese", text: "Inglese" },
  { value: "Francese", text: "Francese" },
  { value: "Spagnolo", text: "Spagnolo" },
  { value: "Tedesco", text: "Tedesco" },
  { value: "Cinese", text: "Cinese" },
];

const levelsOptions = [
  { value: "A1", text: "A1" },
  { value: "A2", text: "A2" },
  { value: "B1", text: "B1" },
  { value: "B2", text: "B2" },
  { value: "C1", text: "C1" },
  { value: "C2", text: "C2" },
];

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
  const [preparation, setPreparation] = useState("");
  const [languages, setLanguages] = useState<CompetenzeLinguistiche[]>([
    { id: 1, lingua: "Inglese", livello: "A1" },
  ]);
  const [categories, setCategories] = useState<Options[]>([
    { value: "", text: "" },
  ]);

  const { fetchData } = useFetch();

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await fetchData<CategoriaPreparazione[]>(
        "/utils/categories",
        "GET"
      );

      categories?.data &&
        setCategories(
          categories.data.map((item) => {
            return { value: item.descrizione!, text: item.descrizione! };
          })
        );
    };

    fetchCategories();
  }, [fetchData]);

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
          <Select
            label="Preparazione"
            value={preparation}
            options={categories}
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
              <Select
                label="Lingua"
                value={item.lingua}
                options={languagesOptions}
                onChange={(e) => handleLanguageChange(index, e.target.value)}
              />
            </Col>
            <Col xs={5}>
              <Select
                label="Livello"
                value={item.livello}
                options={levelsOptions}
                onChange={(e) => handleLevelChange(index, e.target.value)}
              />
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
