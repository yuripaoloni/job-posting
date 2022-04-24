import {
  Navbar,
  HeaderContent,
  HeaderBrand,
  Header,
  HeaderLinkZone,
  HeaderToggler,
  Icon,
  Collapse,
  LinkList,
  LinkListItem,
  HeaderRightZone,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Row,
  Col,
  Button,
} from "design-react-kit";

const CustomNavbar = () => {
  return (
    <Header theme="" type="slim">
      <HeaderContent>
        <HeaderBrand>Ente appartenenza/Owner</HeaderBrand>
        <HeaderLinkZone>
          <HeaderToggler onClick={function noRefCheck() {}}>
            <span>Ente appartenenza/Owner</span>
            <Icon icon="it-expand" />
          </HeaderToggler>
          <Collapse header>
            <LinkList>
              <LinkListItem href="#">Link 1</LinkListItem>
              <LinkListItem active href="#">
                Link 2 Active
              </LinkListItem>
            </LinkList>
          </Collapse>
        </HeaderLinkZone>
        <HeaderRightZone>
          <UncontrolledDropdown nav tag="div">
            <DropdownToggle caret nav>
              ITA
              <Icon
                className="d-none d-lg-block"
                color="icon-white"
                icon="it-expand"
              />
            </DropdownToggle>
            <DropdownMenu>
              <Row>
                <Col size="12">
                  <LinkList>
                    <LinkListItem href="#">
                      <span>ITA</span>
                    </LinkListItem>
                    <LinkListItem href="#">
                      <span>ENG</span>
                    </LinkListItem>
                  </LinkList>
                </Col>
              </Row>
            </DropdownMenu>
          </UncontrolledDropdown>
          <div className="it-access-top-wrapper">
            <Button color="primary" size="sm">
              Accedi
            </Button>
          </div>
        </HeaderRightZone>
      </HeaderContent>
    </Header>
  );
};

export default CustomNavbar;
