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
    localStorage.removeItem("originUserType");
    navigate("/");
  };

  const onChangeUserType = async (userType: UserType) => {
    await fetchData(`/auth/userType/${userType}`, "GET");

    toggleAuth(true, userType, user);
    navigate("/");
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
          {localStorage.getItem("originUserType") !== "0" && (
            <LinkListItem
              className="right-icon"
              onClick={() => onChangeUserType(userType === 2 ? 0 : 2)}
              role="button"
            >
              <Icon
                className="right"
                color="primary"
                icon={userType === 2 ? "it-search" : "it-plus"}
                aria-hidden
                size="sm"
              />
              <span>
                {userType === 2 ? "Cerca posizioni" : "Crea posizioni"}
              </span>
            </LinkListItem>
          )}
          {localStorage.getItem("originUserType") === "1" && (
            <LinkListItem
              className="right-icon"
              onClick={() => onChangeUserType(userType === 1 ? 0 : 1)}
              role="button"
            >
              <Icon
                className="right"
                color="primary"
                icon={userType === 1 ? "it-search" : "it-check"}
                aria-hidden
                size="sm"
              />
              <span>
                {userType === 1 ? "Cerca posizioni" : "Approva posizioni"}
              </span>
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
