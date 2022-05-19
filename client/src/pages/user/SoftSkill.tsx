import { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Container,
} from "design-react-kit";

type SoftSkillProps = {};

const SoftSkill = (props: SoftSkillProps) => {
  const [activeTab, setActiveTab] = useState(1);

  const toggle = (tab: number) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <h4>Soft skill</h4>
      </Row>
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
            {Array(14)
              .fill(0)
              .map((i, index) => (
                <TabPane key={index} tabId={index} className="p-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </TabPane>
              ))}
          </TabContent>
        </Col>
      </Row>
    </Container>
  );
};

export default SoftSkill;
