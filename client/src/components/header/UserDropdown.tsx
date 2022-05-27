import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  LinkList,
  LinkListItem,
  Icon,
} from "design-react-kit";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useFetch } from "../../contexts/FetchContext";
import { UserType } from "../../typings/utente.type";

type UserDropdownProps = {
  isOpen: boolean;
  toggleDropdown: () => void;
};

const UserDropdown = ({ isOpen, toggleDropdown }: UserDropdownProps) => {
  const { user, toggleAuth, userType } = useAuth();
  const { fetchData } = useFetch();
  const navigate = useNavigate();

  const onLogout = async () => {
    await fetchData("/auth/logout", "GET");

    toggleAuth(false, 0, "");
    navigate("/");
  };

  const onChangeUserType = async (userType: UserType) => {
    await fetchData(`/auth/userType/${userType}`, "GET");

    toggleAuth(true, userType, user);
  };

  return (
    <Dropdown isOpen={isOpen} toggle={() => toggleDropdown()}>
      <DropdownToggle
        className="btn-icon bg-danger text-white ml-5"
        size="sm"
        caret
      >
        <span className="rounded-icon">
          <Icon color="primary" icon="it-user" size="xs" />
        </span>
        <span className="d-none d-lg-block">{user}</span>
      </DropdownToggle>
      <DropdownMenu className="mr-4 mr-sm-0">
        <LinkList>
          {userType === 0 && (
            <Link to="profile">
              <LinkListItem className="right-icon">
                <Icon
                  className="right"
                  color="primary"
                  icon="it-user"
                  aria-hidden
                  size="sm"
                />
                <span>Profilo</span>
              </LinkListItem>
            </Link>
          )}
          <Link to="history">
            <LinkListItem className="right-icon">
              <Icon
                className="right"
                color="primary"
                icon="it-folder"
                aria-hidden
                size="sm"
              />
              <span>{userType === 0 ? "Candidature" : "Storico offerte"}</span>
            </LinkListItem>
          </Link>
          {userType === 2 && (
            <LinkListItem
              className="right-icon"
              onClick={() => onChangeUserType(0)}
              role="button"
            >
              <Icon
                className="right"
                color="primary"
                icon="it-search"
                aria-hidden
                size="sm"
              />
              <span>Cerca lavoro</span>
            </LinkListItem>
          )}
          <LinkListItem
            className="right-icon"
            onClick={() => onLogout()}
            role="button"
          >
            <Icon
              className="right"
              color="primary"
              icon="it-arrow-right"
              aria-hidden
              size="sm"
            />
            <span>Logout</span>
          </LinkListItem>
        </LinkList>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
