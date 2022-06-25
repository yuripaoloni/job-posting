import { Fragment, memo, useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Input,
  TextArea,
  Label,
  Row,
  Col,
  Icon,
  Chip,
  ChipLabel,
} from "design-react-kit";
import SoftSkillsForm from "./SoftSkillsForm";
import Select from "../layout/Select";

import { useFetch } from "../../contexts/FetchContext";
import { useAlert } from "../../contexts/AlertContext";

import {
  AnswersOrder,
  SkillsOrder,
  SoftSkill,
} from "../../typings/softSkill.type";
import {
  JobRes,
  Job,
  RichiestaCompetenzeLinguistiche,
} from "../../typings/jobs.type";
import { CategoriaPreparazione, Options } from "../../typings/utils.type";

import {
  categoryOptions,
  languagesOptions,
  levelsOptions,
} from "../../utils/selectOptions";

type JobModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
  updateJobs: (job: Job, update: boolean) => void;
  job: Job | null;
};

const JobModal = ({ isOpen, toggleModal, updateJobs, job }: JobModalProps) => {
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("B");
  const [expiryDate, setExpiryData] = useState("");

  const [softSkillsTitle, setSoftSkillsTitles] = useState([""]);
  const [softSkills, setSoftSkills] = useState<SoftSkill[] | undefined>(
    undefined
  );

  const [categories, setCategories] = useState<Options[]>([
    { value: "", text: "" },
  ]);
  const [preparation, setPreparation] = useState({ value: "", points: 0 });
  const [unicamExperience, setUnicamExperience] = useState({
    value: false,
    points: 0,
  });
  const [workExperience, setWorkExperience] = useState({
    value: false,
    points: 0,
  });
  const [languages, setLanguages] = useState<RichiestaCompetenzeLinguistiche[]>(
    [{ id: 1, lingua: "Inglese", livello: "A1", punti: 0 }]
  );

  const [skillsOrder, setSkillsOrder] = useState<SkillsOrder[]>([{ id: 1 }]);
  const [answersOrder, setAnswersOrder] = useState<AnswersOrder[]>([
    { softSkillId: 1, answers: [{ answerId: 1, order: 1 }] },
  ]);

  const { fetchData } = useFetch();
  const { toggleAlert } = useAlert();

  useEffect(() => {
    const fetchSoftSkills = async () => {
      const res = await fetchData<SoftSkill[]>("/softSkills", "GET");

      const titles = res?.data
        ? res?.data.map((softSkill) => softSkill.titolo)
        : [""];

      const newSkillsOrder = res?.data
        ? res?.data.map((skill, index) => {
            return { id: skill.id };
          })
        : [{ id: 1 }];

      const newAnswersOrder = res?.data
        ? res?.data.map((skill, index) => {
            return {
              softSkillId: skill.id,
              answers: skill.risposteSoftSkills.map((anwser, index) => {
                return {
                  answerId: anwser.idRisposta,
                  order: index + 1,
                };
              }),
            };
          })
        : [{ softSkillId: 1, answers: [{ answerId: 1, order: 1 }] }];

      setSoftSkillsTitles(titles);
      setSoftSkills(res?.data);
      setSkillsOrder(newSkillsOrder);
      setAnswersOrder(newAnswersOrder);
    };

    const fetchCategories = async () => {
      const categories = await fetchData<CategoriaPreparazione[]>(
        "/utils/categories",
        "GET"
      );

      if (categories?.data) {
        setCategories(
          categories.data
            .map((item) => {
              return { value: item.descrizione!, text: item.descrizione! };
            })
            .concat({ value: "Nessuna preferenza", text: "Nessuna preferenza" })
        );
        setPreparation((prev) => {
          return {
            ...prev,
            value: categories.data[0].descrizione!,
          };
        });
      }
    };

    fetchSoftSkills();
    fetchCategories();
  }, [fetchData]);

  useEffect(() => {
    if (job) {
      setRole(job.ruolo!);
      setDescription(job.descrizione!);
      setCategory(job.categoria!);
      setExpiryData(job.dataScadenza!);
      setPreparation({
        value: job.richiestaOfferta.preparazione!,
        points: job.richiestaOfferta.puntiPreparazione!,
      });
      setUnicamExperience({
        value: job.richiestaOfferta.esperienzaUnicam!,
        points: job.richiestaOfferta.puntiEsperienzaUnicam!,
      });
      setWorkExperience({
        value: job.richiestaOfferta.esperienzaLavorativa!,
        points: job.richiestaOfferta.puntiEsperienzaLavorativa!,
      });
      setLanguages(job.richiestaOfferta.richiestaCompetenzeLinguistiches!);

      const titles = job.richiestaSoftSkills!.map(
        (item) => item.softSkill!.titolo
      );

      const softSkills = job.richiestaSoftSkills!.map(
        (item) => item.softSkill!
      );

      const skillsOrder = job.richiestaSoftSkills!.map((item) => {
        return { id: item.softSkill!.id };
      });

      const answersOrder = job.richiestaSoftSkills!.map((item) => {
        return {
          softSkillId: item.softSkill!.id,
          answers: item.rispostaRichiestaSoftSkills!.map((answer) => {
            return {
              answerId: answer.rispostaId.idRisposta,
              order: answer.ordine,
            };
          }),
        };
      });

      setSoftSkillsTitles(titles);
      setSoftSkills(softSkills);
      setSkillsOrder(skillsOrder);
      setAnswersOrder(answersOrder);
    } else {
      setRole("");
      setDescription("");
      setCategory("B");
      setExpiryData("");
      setPreparation({ value: "", points: 0 });
      setUnicamExperience({
        value: false,
        points: 0,
      });
      setWorkExperience({
        value: false,
        points: 0,
      });
      setLanguages([{ id: 1, lingua: "Inglese", livello: "A1", punti: 0 }]);
    }
  }, [job]);

  const validateInputs = (): boolean => {
    const invalidPoints =
      preparation.points +
        workExperience.points +
        unicamExperience.points +
        languages.reduce((sum, { punti }) => sum + punti, 0) >
      50;

    invalidPoints &&
      toggleAlert(
        'I pesi per "Preparazione", "Esperienza lavorativa", "Esperienza Unicam" e "Lingue" sono superiori a 50.',
        "danger"
      );

    const duplicateAnswers = answersOrder.flatMap((item, index) => {
      const valueArr = item.answers.map((item) => item.order);
      return valueArr.some((item, index) => valueArr.indexOf(item) !== index)
        ? [index]
        : [];
    });

    duplicateAnswers.length > 0 &&
      toggleAlert(
        `Risposte con stesso indice in ${duplicateAnswers.map(
          (answer) => " " + softSkillsTitle[answer]
        )}`,
        "danger"
      );

    return !invalidPoints && duplicateAnswers.length === 0;
  };

  const createOrUpdateJobOffer = async () => {
    const hasValidInput = validateInputs();

    if (hasValidInput) {
      toggleModal();

      const res = await fetchData<JobRes>(
        job ? `/jobs/offers/${job.id}` : "/jobs/offers",
        job ? "PATCH" : "POST",
        {
          role,
          description,
          category,
          expiryDate,
          preparation,
          unicamExperience,
          workExperience,
          languages,
          skillsOrder,
          answersOrder,
        }
      );

      res?.data.jobOffer && updateJobs(res.data.jobOffer, true);
    }
  };

  const handleSkillsOrderChange = (order: number, skillIndex: number) => {
    const updatedSkillsOrder = skillsOrder.slice();
    const updatedSkillOrder = updatedSkillsOrder[skillIndex];
    updatedSkillsOrder.splice(skillIndex, 1);
    updatedSkillsOrder.splice(order - 1, 0, updatedSkillOrder);

    let updatedSoftSkills = softSkills!.slice();
    const updatedSkill = updatedSoftSkills[skillIndex];
    updatedSoftSkills.splice(skillIndex, 1);
    updatedSoftSkills.splice(order - 1, 0, updatedSkill);

    let updatedAnswers = answersOrder!.slice();
    const updatedAnswer = updatedAnswers[skillIndex];
    updatedAnswers.splice(skillIndex, 1);
    updatedAnswers.splice(order - 1, 0, updatedAnswer);

    let updatedTitles = softSkillsTitle.slice();
    const updatedTitle = softSkillsTitle[skillIndex];
    updatedTitles.splice(skillIndex, 1);
    updatedTitles.splice(order - 1, 0, updatedTitle);

    setSkillsOrder(updatedSkillsOrder);
    setSoftSkills(updatedSoftSkills);
    setSoftSkillsTitles(updatedTitles);
    setAnswersOrder(updatedAnswers);
  };

  const handleAnswersOrderChange = (
    order: number,
    skillIndex: number,
    answerIndex: number
  ) => {
    const updatedAnswersOrder = answersOrder.map((item) => {
      return { softSkillId: item.softSkillId, answers: item.answers.slice() };
    });
    updatedAnswersOrder[skillIndex].answers[answerIndex].order = order;
    setAnswersOrder(updatedAnswersOrder);
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

  const handleLanguagePointsChange = (index: number, points: number) => {
    let updatedLanguages = languages.slice();
    updatedLanguages[index].punti = points;
    setLanguages(updatedLanguages);
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggleModal()}
      labelledBy="jobModal"
      size="xl"
    >
      <ModalHeader
        className="align-items-center mb-3"
        tag="h4"
        toggle={() => toggleModal()}
        id="jobModal"
      >
        {job ? "Aggiorna" : "Nuova"} offerta lavorativa
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Input
            type="text"
            id="ruolo"
            value={role}
            label="Ruolo"
            infoText="Posizione richiesta"
            onChange={(e) => setRole(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <TextArea
            rows={3}
            id="descrizione"
            value={description}
            infoText={`Max 500 caratteri - ${description.length}`}
            label="Descrizione"
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Select
            label="Categoria"
            value={category}
            options={categoryOptions}
            onChange={(e) => setCategory(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="date"
            id="expiryDate"
            value={expiryDate}
            label="Data di scadenza"
            infoText="Data di scadenza dell'offerta"
            placeholder={new Date().toUTCString()}
            onChange={(e) => setExpiryData(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <h6>
            Per le voci "Preparazione", "Esperienza lavorativa 10+", "Esperienza
            in Unicam 5+" e "Lingue" è necessario specificare un peso totale di
            50 punti.
          </h6>
          <p>
            I 50 punti devono essere distributi tra le quattro voci (es 15, 15,
            10, 10). Se non si raggiunge un valore totale di 50, i punti macanti
            verranno automaticamente assegnati alle competenze (in basso).
            <strong>
              {" "}
              I pesi selezionati influiranno nel calcolo dei punteggi di
              affinità per i candidati.
            </strong>
          </p>
          <h6 className="mt-2 text-decoration-underline">
            <u>
              Punti assegnati:{" "}
              {preparation.points +
                workExperience.points +
                unicamExperience.points +
                languages.reduce((sum, { punti }) => sum + punti, 0)}
            </u>
          </h6>
        </FormGroup>
        <div className="form-row">
          <Col sm={10} xs={9}>
            <Select
              label="Preparazione richiesta"
              options={categories}
              value={preparation.value}
              onChange={(e) =>
                setPreparation({ ...preparation, value: e.target.value })
              }
            />
          </Col>
          <Input
            type="number"
            label="Peso"
            placeholder="Peso"
            disabled={preparation.value === "Nessuna preferenza"}
            value={
              preparation.value === "Nessuna preferenza"
                ? 0
                : preparation.points
            }
            onChange={(e) =>
              setPreparation({ ...preparation, points: e.target.valueAsNumber })
            }
            wrapperClass="col col-sm-2 col-3"
            max={50}
          />
        </div>
        <Row>
          <FormGroup check className="col col-xl-3 col-lg-4 col-md-7 col-10">
            <Input
              id="work-checkbox"
              type="checkbox"
              checked={workExperience.value}
              onChange={(e) =>
                setWorkExperience((prev) => {
                  return {
                    value: !prev.value,
                    points: !prev.value === false ? 0 : prev.points,
                  };
                })
              }
            />
            <Label for="work-checkbox" check>
              Esperienza lavorativa 10+
            </Label>
          </FormGroup>
          <Input
            type="number"
            label="Peso"
            placeholder="Peso"
            disabled={!workExperience.value}
            value={!workExperience.value ? 0 : workExperience.points}
            onChange={(e) =>
              setWorkExperience({
                ...workExperience,
                points: e.target.valueAsNumber,
              })
            }
            wrapperClass="col col-lg-1 col-md-2"
            max={50}
          />
        </Row>
        <Row>
          <FormGroup check className="col col-xl-3 col-lg-4 col-md-7 col-10">
            <Input
              id="unicam-checkbox"
              type="checkbox"
              checked={unicamExperience.value}
              onChange={() =>
                setUnicamExperience((prev) => {
                  return {
                    value: !prev.value,
                    points: !prev.value === false ? 0 : prev.points,
                  };
                })
              }
            />
            <Label for="unicam-checkbox" check>
              Esperienza Unicam 5+
            </Label>
          </FormGroup>
          <Input
            type="number"
            label="Peso"
            placeholder="Peso"
            disabled={!unicamExperience.value}
            value={!unicamExperience.value ? 0 : unicamExperience.points}
            onChange={(e) =>
              setUnicamExperience({
                ...unicamExperience,
                points: e.target.valueAsNumber,
              })
            }
            wrapperClass="col col-lg-1 col-md-2"
            max={50}
          />
        </Row>
        <Row>
          {languages.map((item, index) => (
            <Fragment key={index}>
              <Col xs={5}>
                <Select
                  label="Lingua"
                  value={item.lingua}
                  options={languagesOptions}
                  onChange={(e) => handleLanguageChange(index, e.target.value)}
                />
              </Col>
              <Col xs={3}>
                <Select
                  label="Livello"
                  value={item.livello}
                  options={levelsOptions}
                  onChange={(e) => handleLevelChange(index, e.target.value)}
                />
              </Col>
              <Col xs={3}>
                <Input
                  type="number"
                  label="Peso"
                  value={item.punti}
                  placeholder="Peso"
                  onChange={(e) =>
                    handleLanguagePointsChange(index, e.target.valueAsNumber)
                  }
                  max={50}
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
            </Fragment>
          ))}
          <Chip
            simple
            className="mx-0 mb-4"
            color="primary"
            role="button"
            onClick={() =>
              setLanguages((prev) => [
                ...prev,
                {
                  id: prev.length + 1,
                  lingua: "Inglese",
                  livello: "A1",
                  punti: 0,
                },
              ])
            }
          >
            <Icon icon="it-plus" size="xs" />
            <ChipLabel>Aggiungi lingua </ChipLabel>
          </Chip>
        </Row>
        <FormGroup>
          <h6>
            Ordina le competenze da 1 a 14 e le relative risposte da 1 a 4
            considerando la rilevanza che hanno per la posizione lavorativa.
          </h6>
          <p>
            L'ordinamento delle competenze e le relative risposte viene
            utilizzato per calcolare un punteggio di affinità per i candidati.
          </p>
        </FormGroup>
        <SoftSkillsForm
          softSkillsTitle={softSkillsTitle}
          skillsOrder={skillsOrder}
          answersOrder={answersOrder}
          softSkills={softSkills}
          handleSkillsOrderChange={handleSkillsOrderChange}
          handleAnswersOrderChange={handleAnswersOrderChange}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => createOrUpdateJobOffer()}>
          {job ? "Aggiorna" : "Crea"} offerta
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default memo(JobModal);
