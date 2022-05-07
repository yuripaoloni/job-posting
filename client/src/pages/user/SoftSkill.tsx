import { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "design-react-kit";

type SoftSkillProps = {};

const SoftSkill = (props: SoftSkillProps) => {
  const [activeTab, setActiveTab] = useState(1);

  const toggle = (tab: number) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Row className="justify-content-center py-3">
      <Col xs={3}>
        <Nav tabs>
          {Array(14)
            .fill(0)
            .map((i, index) => (
              <NavItem className="col-7">
                <NavLink
                  active={activeTab === index}
                  onClick={() => toggle(index)}
                >
                  Domanda {index + 1}
                </NavLink>
              </NavItem>
            ))}
        </Nav>
      </Col>
      <Col xs={7}>
        <TabContent activeTab={activeTab}>
          {Array(14)
            .fill(0)
            .map((i, index) => (
              <TabPane tabId={index} className="p-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </TabPane>
            ))}
        </TabContent>
      </Col>
    </Row>
  );
};

export default SoftSkill;
