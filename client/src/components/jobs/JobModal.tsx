import { memo, useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
} from "design-react-kit";
import { useFetch } from "../../contexts/FetchContext";
import { JobRes, Job } from "../../typings/jobs.type";
import { SoftSkill } from "../../typings/softSkill.type";
import { useAlert } from "../../contexts/AlertContext";

type JobModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
  updateJobs: (job: Job, update: boolean) => void;
};

type SkillsOrder = {
  id: number;
  order: number;
}[];

type AnswersOrder = {
  softSkillId: number;
  answers: {
    answerId: number;
    order: number;
  }[];
}[];

const JobModal = ({ isOpen, toggleModal, updateJobs }: JobModalProps) => {
  const [role, setRole] = useState("");
  const [expiryDate, setExpiryData] = useState("");

  const [softSkillsTitle, setSoftSkillsTitles] = useState([""]);
  const [softSkills, setSoftSkills] = useState<SoftSkill[] | undefined>(
    undefined
  );

  const [activeTab, setActiveTab] = useState(0);

  const [skillsOrder, setSkillsOrder] = useState<SkillsOrder>([
    { id: 1, order: 1 },
  ]);
  const [answersOrder, setAnswersOrder] = useState<AnswersOrder>([
    { softSkillId: 1, answers: [{ answerId: 1, order: 1 }] },
  ]);

  const { fetchData } = useFetch();
  const { toggleAlert } = useAlert();

  useEffect(() => {
    const fetchSoftSkillsAndUserAnswers = async () => {
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

    fetchSoftSkillsAndUserAnswers();
  }, [fetchData]);

  const createJobOffer = async () => {
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
          (answer) => softSkillsTitle[answer]
        )}`,
        "danger"
      );

    if (!hasDuplicateSkills && duplicateAnswers.length === 0) {
      toggleModal();

      const res = await fetchData<JobRes>("/jobs/offers", "POST", {
        role,
        expiryDate,
        skillsOrder,
        answersOrder,
      });

      res?.data.jobOffer && updateJobs(res.data.jobOffer, true);
    }
  };

  const toggle = (tab: number) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleSkillsOrderChange = (order: number, skillIndex: number) => {
    const updatedSkillsOrder = skillsOrder.slice();
    updatedSkillsOrder[skillIndex].order = order;
    setSkillsOrder(updatedSkillsOrder);
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
        Nuova offerta lavorativa
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Input
            type="text"
            id="ruolo"
            value={role}
            placeholder="Software developer"
            label="Ruolo"
            infoText="Posizione richiesta"
            onChange={(e) => setRole(e.target.value)}
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
        <h6>
          Ordina le soft skill da 1 a 14 considerando la rilevanza che hanno per
          la posizione lavorativa.
        </h6>
        <h6>
          Per ogni skill dovranno essere ordinate anche le risposte da 1 a 3. La
          numero 4 è di default "Preferisco non rispondere".
        </h6>
        <h6>
          L'ordinamento delle skill e le relative risposte viene utilizzato per
          calcolare un punteggio di affinità per i candidati.
        </h6>
        <Row className="justify-content-between mt-4">
          <Col xl={3} lg={4} xs={1}>
            <Nav pills vertical>
              {softSkillsTitle?.map((title, index) => (
                <NavItem key={index} className="text-center text-lg-left">
                  <NavLink
                    role="button"
                    active={activeTab === index}
                    onClick={() => toggle(index)}
                  >
                    <span>{skillsOrder[index].order}</span>
                    <span className="d-none d-lg-inline"> - {title}</span>
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          </Col>
          <Col xl={9} lg={8} sm={10} xs={9}>
            <TabContent activeTab={activeTab}>
              {softSkills?.map((softSkill, softSkillIndex) => (
                <TabPane
                  key={softSkill.id - 1}
                  tabId={softSkill.id - 1}
                  className="p-2"
                >
                  <Row className="justify-content-between mb-4 align-items-center">
                    <Col xl={11} lg={10} sm={9}>
                      <p className="text-justify">
                        <strong>{softSkill.titolo}: </strong>
                        {softSkill.descrizione}.
                      </p>
                    </Col>
                    <Col xl={1} lg={2} sm={3} xs={4}>
                      <Input
                        type="number"
                        min={1}
                        max={14}
                        value={skillsOrder[softSkillIndex].order}
                        onChange={(e) =>
                          handleSkillsOrderChange(
                            e.target.valueAsNumber,
                            softSkillIndex
                          )
                        }
                      />
                    </Col>
                  </Row>
                  {softSkill.risposteSoftSkills.map((risposta, answerIndex) => (
                    <Row key={risposta.idRisposta} className="mb-4 ml-1 ">
                      <Col xl={9} md={8} sm={9} xs={11}>
                        <Label className="text-justify" tag="p">
                          {risposta.descrizione}.
                        </Label>
                      </Col>
                      <Col xl={1} sm={2} xs={4}>
                        <Input
                          type="number"
                          min={1}
                          max={3}
                          disabled={answerIndex === 3}
                          value={
                            answersOrder[softSkillIndex].answers[answerIndex]
                              .order
                          }
                          onChange={(e) =>
                            handleAnswersOrderChange(
                              e.target.valueAsNumber,
                              softSkillIndex,
                              answerIndex
                            )
                          }
                        />
                      </Col>
                    </Row>
                  ))}
                </TabPane>
              ))}
            </TabContent>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => createJobOffer()}>
          Crea offerta
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default memo(JobModal);
