import { memo, useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Input,
  TextArea,
} from "design-react-kit";
import SoftSkillsForm from "./SoftSkillsForm";

import { useFetch } from "../../contexts/FetchContext";
import { useAlert } from "../../contexts/AlertContext";

import {
  AnswersOrder,
  SkillsOrder,
  SoftSkill,
} from "../../typings/softSkill.type";
import { JobRes, Job } from "../../typings/jobs.type";

type JobModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
  updateJobs: (job: Job, update: boolean) => void;
  job: Job | null;
};

const JobModal = ({ isOpen, toggleModal, updateJobs, job }: JobModalProps) => {
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [expiryDate, setExpiryData] = useState("");

  const [softSkillsTitle, setSoftSkillsTitles] = useState([""]);
  const [softSkills, setSoftSkills] = useState<SoftSkill[] | undefined>(
    undefined
  );

  const [skillsOrder, setSkillsOrder] = useState<SkillsOrder[]>([
    { id: 1, order: 1 },
  ]);
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
            return { id: skill.id, order: index + 1 };
          })
        : [{ id: 1, order: 1 }];

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

    fetchSoftSkills();
  }, [fetchData]);

  useEffect(() => {
    if (job) {
      setRole(job.ruolo!);
      setExpiryData(job.dataScadenza!);

      const titles = job.richiestaSoftSkills!.map(
        (item) => item.softSkill!.titolo
      );

      const softSkills = job.richiestaSoftSkills!.map(
        (item) => item.softSkill!
      );

      const skillsOrder = job.richiestaSoftSkills!.map((item) => {
        return { id: item.softSkill!.id, order: item.ordine };
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
      setExpiryData("");
    }
  }, [job]);

  const validateInputs = (): boolean => {
    const valueArr = skillsOrder.map((item) => item.order);
    const hasDuplicateSkills = valueArr.some(
      (item, index) => valueArr.indexOf(item) !== index
    );

    const duplicateAnswers = answersOrder.flatMap((item, index) => {
      const valueArr = item.answers.map((item) => item.order);
      return valueArr.some((item, index) => valueArr.indexOf(item) !== index)
        ? [index]
        : [];
    });

    hasDuplicateSkills &&
      toggleAlert("2 o più skill hanno lo stesso ordinamento.", "danger");

    duplicateAnswers.length > 0 &&
      toggleAlert(
        `Risposte con stesso indice in ${duplicateAnswers.map(
          (answer) => " " + softSkillsTitle[answer]
        )}`,
        "danger"
      );

    return !hasDuplicateSkills && duplicateAnswers.length === 0;
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
          expiryDate,
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
    updatedSkillOrder.order = order;
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
