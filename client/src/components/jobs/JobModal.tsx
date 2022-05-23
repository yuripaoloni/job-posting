import { useEffect, useState } from "react";
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
  Form,
  Label,
} from "design-react-kit";
import { useFetch } from "../../contexts/FetchContext";
import { CreateJobRes } from "../../typings/jobs.type";
import { SoftSkill } from "../../typings/softSkill.type";

type JobModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
};

const JobModal = ({ isOpen, toggleModal }: JobModalProps) => {
  const [role, setRole] = useState("");
  const [expiryDate, setExpiryData] = useState("");

  const { fetchData } = useFetch();

  const [softSkills, setSoftSkills] = useState<SoftSkill[] | undefined>(
    undefined
  );
  const [activeTab, setActiveTab] = useState(0);
  const [answers, setAnswers] = useState([0]);

  useEffect(() => {
    const fetchSoftSkillsAndUserAnswers = async () => {
      const res = await fetchData<{
        softSkills: SoftSkill[];
        userAnswers: number[];
      }>("/softSkills/user/answers", "GET");

      setAnswers(res?.data.userAnswers ? res.data.userAnswers : [0]);
      setSoftSkills(res?.data.softSkills);
    };

    fetchSoftSkillsAndUserAnswers();
  }, [fetchData]);

  const createJobOffer = async () => {
    const res = await fetchData<CreateJobRes>("/jobs/offers", "POST", {
      role,
      expiryDate,
    });

    //TODO add res?.data.updatedJobOffer to array of current jobs or fetch again all jobs
    toggleModal();
  };

  const toggle = (tab: number) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggleModal()}
      labelledBy="jobModal"
      size="lg"
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
            onChange={(e) => setRole(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="date"
            id="expiryDate"
            value={expiryDate}
            label="Data di scadenza"
            placeholder={new Date().toUTCString()}
            onChange={(e) => setExpiryData(e.target.value)}
          />
        </FormGroup>
        <Row className="justify-content-center">
          <Col xs={2}>
            <Nav pills vertical>
              {Array(14)
                .fill(0)
                .map((i, index) => (
                  <NavItem key={index} className="col text-center">
                    <NavLink
                      role="button"
                      active={activeTab === index}
                      onClick={() => toggle(index)}
                    >
                      {index + 1}
                    </NavLink>
                  </NavItem>
                ))}
            </Nav>
          </Col>
          <Col md={9} xs={10}>
            <TabContent activeTab={activeTab}>
              {softSkills?.map((softSkill) => (
                <TabPane
                  key={softSkill.id - 1}
                  tabId={softSkill.id - 1}
                  className="p-2"
                >
                  <Form className="m-3">
                    <h5>{softSkill.titolo}</h5>
                    <p>{softSkill.descrizione}</p>
                    <fieldset>
                      {softSkill.risposteSoftSkills.map((risposta) => (
                        <FormGroup check key={risposta.idRisposta}>
                          <Input
                            onChange={() => {}}
                            id={`radio-${risposta.idRisposta}`}
                            checked={
                              answers[softSkill.id - 1] === risposta.idRisposta
                            }
                            type="radio"
                          />
                          <Label for={`radio-${risposta.idRisposta}`} check>
                            {risposta.descrizione}
                          </Label>
                        </FormGroup>
                      ))}
                    </fieldset>
                  </Form>
                </TabPane>
              ))}
              <Row className="justify-content-end m-1">
                <Button color="primary" onClick={() => {}}>
                  INVIA
                </Button>
              </Row>
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

export default JobModal;
