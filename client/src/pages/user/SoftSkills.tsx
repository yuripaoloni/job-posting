import { useEffect, useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "design-react-kit";
import { useFetch } from "../../contexts/FetchContext";
import { SoftSkill } from "../../typings/softSkill.type";

type SoftSkillProps = {};

const SoftSkills = (props: SoftSkillProps) => {
  const [softSkills, setSoftSkills] = useState<SoftSkill[] | undefined>(
    undefined
  );
  const [activeTab, setActiveTab] = useState(0);
  const [answers, setAnswers] = useState([0]);

  const { fetchData } = useFetch();

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

  const toggle = (tab: number) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const onCheckAnswer = (idDomanda: number, idRisposta: number) => {
    const updatedAnswers = answers.slice();
    updatedAnswers[idDomanda] = idRisposta;
    setAnswers(updatedAnswers);
  };

  const onSubmit = async () => {
    await fetchData("/softSkills/user/answers", "POST", { answers });
  };

  return (
    <Container fluid className="py-4">
      <h4 className="text-center">
        Rispondi alle domande per completare il tuo profilo
      </h4>
      <Row className="justify-content-center">
        <Col xs={2}>
          <Nav pills vertical>
            {Array(14)
              .fill(0)
              .map((i, index) => (
                <NavItem key={index} className="col text-center ">
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
                          onChange={() =>
                            onCheckAnswer(softSkill.id - 1, risposta.idRisposta)
                          }
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
              <Button color="primary" onClick={() => onSubmit()}>
                INVIA
              </Button>
            </Row>
          </TabContent>
        </Col>
      </Row>
    </Container>
  );
};

export default SoftSkills;
