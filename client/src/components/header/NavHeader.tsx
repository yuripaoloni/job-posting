import { memo, useState } from "react";
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
import { NavLink as RRNavLink } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

const NavHeader = () => {
  const [openNav, setOpenNav] = useState(false);

  const { isAuth } = useAuth();

  return (
    <Header theme="" type="navbar">
      <HeaderContent expand="lg">
        <HeaderToggler
          aria-controls="nav1"
          aria-expanded="false"
          aria-label="Toggle navigation"
          type="button"
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
              <NavItem>
                <NavLink to="/" tag={RRNavLink}>
                  Home
                </NavLink>
              </NavItem>
              {isAuth && (
                <NavItem>
                  <NavLink to="/jobs" tag={RRNavLink}>
                    Jobs
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </div>
        </Collapse>
      </HeaderContent>
    </Header>
  );
};

export default memo(NavHeader);
