import { useState } from "react";
import {
  HeaderContent,
  Header,
  HeaderToggler,
  Icon,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "design-react-kit";

const NavHeader = () => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <Header theme="" type="navbar" className="primary-bg">
      <HeaderContent expand="lg" megamenu>
        <HeaderToggler
          aria-controls="nav1"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenNav((prev) => !prev)}
        >
          <Icon icon="it-burger" />
        </HeaderToggler>
        <Collapse
          header
          navbar
          isOpen={openNav}
          onOverlayClick={() => setOpenNav((prev) => !prev)}
        >
          <div className="menu-wrapper">
            <Nav navbar>
              <NavItem active>
                <NavLink active href="#">
                  Link 1
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Link 2</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Link 3</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Link 4</NavLink>
              </NavItem>
            </Nav>
          </div>
        </Collapse>
      </HeaderContent>
    </Header>
  );
};

export default NavHeader;
