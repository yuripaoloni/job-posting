import { useState } from "react";
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Input,
  Label,
} from "design-react-kit";
import {
  AnswersOrder,
  SkillsOrder,
  SoftSkill,
} from "../../typings/softSkill.type";

type SoftSkillsFormProps = {
  softSkillsTitle: string[];
  skillsOrder: SkillsOrder[];
  answersOrder: AnswersOrder[];
  softSkills: SoftSkill[] | undefined;
  handleSkillsOrderChange: (order: number, skillIndex: number) => void;
  handleAnswersOrderChange: (
    order: number,
    skillIndex: number,
    answerIndex: number
  ) => void;
  view?: boolean;
};

const SoftSkillsForm = ({
  softSkillsTitle,
  skillsOrder,
  answersOrder,
  softSkills,
  handleAnswersOrderChange,
  handleSkillsOrderChange,
  view,
}: SoftSkillsFormProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const toggle = (tab: number) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
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
                {/*show up only from MD to XS*/}
                <span className="d-inline d-lg-none">{index + 1}</span>{" "}
                {/* under LG the title disappear */}
                <span className="d-none d-lg-inline">{title}</span>
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
              tabId={softSkillIndex}
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
                    value={softSkillIndex + 1}
                    onChange={(e) => {
                      toggle(e.target.valueAsNumber - 1);
                      handleSkillsOrderChange(
                        e.target.valueAsNumber,
                        softSkillIndex
                      );
                    }}
                    readOnly={view}
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
                        answersOrder[softSkillIndex].answers[answerIndex].order
                      }
                      onChange={(e) =>
                        handleAnswersOrderChange(
                          e.target.valueAsNumber,
                          softSkillIndex,
                          answerIndex
                        )
                      }
                      readOnly={view}
                    />
                  </Col>
                </Row>
              ))}
            </TabPane>
          ))}
        </TabContent>
      </Col>
    </Row>
  );
};

export default SoftSkillsForm;
