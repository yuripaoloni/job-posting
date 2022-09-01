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
} from "design-react-kit";
import { useFetch } from "../../contexts/FetchContext";
import { SoftSkill } from "../../typings/softSkill.type";
import { useParams } from "react-router-dom";

type UserAnswers = { skillId: number; answerId: number };

const AdminSoftSkills = () => {
  const [softSkills, setSoftSkills] = useState<SoftSkill[] | undefined>(
    undefined
  );
  const [activeTab, setActiveTab] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers[]>([
    { skillId: 1, answerId: 1 },
  ]);
  const [user, setUser] = useState("");
  const [job, setJob] = useState("");

  const { fetchData } = useFetch();
  const { applicationId } = useParams();

  useEffect(() => {
    const fetchSoftSkillsAndUserAnswers = async () => {
      const res = await fetchData<{
        softSkills: SoftSkill[];
        userAnswers: UserAnswers[];
        offerta: string;
        user: string;
      }>(`/softSkills/application/${applicationId}`, "GET");

      let userAnswers =
        res?.data.userAnswers.length! > 0
          ? res!.data.userAnswers
          : res?.data.softSkills.map((skill, index) => {
              return {
                skillId: skill.id,
                answerId: skill.risposteSoftSkills[0].idRisposta,
              };
            });

      setAnswers(userAnswers!);
      setSoftSkills(res?.data.softSkills);
      setUser(res?.data.user!);
      setJob(res?.data.offerta!);
    };

    fetchSoftSkillsAndUserAnswers();
  }, [fetchData, applicationId]);

  const toggle = (tab: number) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Container fluid className="min-vh-100 py-4">
      <h4 className="text-center">Risposte di {user}</h4>
      <h6 className="text-center">
        Le competenze e le relative risposte sono ordinate secondo le richieste
        della posizione: {job}
      </h6>
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
            {softSkills?.map((softSkill, index) => (
              <TabPane key={index} tabId={index} className="p-2">
                <Form className="m-3">
                  <fieldset>
                    <p>
                      <strong>{softSkill.titolo}: </strong>
                      {softSkill.descrizione}
                    </p>
                    {softSkill.risposteSoftSkills.map((risposta) => (
                      <FormGroup check key={risposta.idRisposta}>
                        <Input
                          id={`radio-${risposta.idRisposta}`}
                          checked={
                            answers[index].answerId === risposta.idRisposta
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
          </TabContent>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminSoftSkills;
