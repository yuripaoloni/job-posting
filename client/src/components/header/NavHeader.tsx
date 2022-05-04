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
import { NavLink as ReactRouteNavLink } from "react-router-dom";

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
              <ReactRouteNavLink to="/">
                {({ isActive }) => (
                  <NavItem>
                    <NavLink active={isActive}>Home</NavLink>
                  </NavItem>
                )}
              </ReactRouteNavLink>
              <ReactRouteNavLink to="/jobs">
                {({ isActive }) => (
                  <NavItem>
                    <NavLink active={isActive}>Jobs</NavLink>
                  </NavItem>
                )}
              </ReactRouteNavLink>
            </Nav>
          </div>
        </Collapse>
      </HeaderContent>
    </Header>
  );
};

export default NavHeader;
