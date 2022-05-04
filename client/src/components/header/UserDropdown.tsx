import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  LinkList,
  LinkListItem,
  Icon,
} from "design-react-kit";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type UserDropdownProps = {
  isOpen: boolean;
  toggleDropdown: () => void;
};

const UserDropdown = ({ isOpen, toggleDropdown }: UserDropdownProps) => {
  const { user } = useAuth();

  return (
    <Dropdown isOpen={isOpen} toggle={() => toggleDropdown()}>
      <DropdownToggle
        color="primary"
        className="btn-icon bg-danger text-white ml-5"
      >
        <span className="rounded-icon">
          <Icon color="primary" icon="it-user" />
        </span>
        <span className="d-none d-lg-block">{user}</span>
      </DropdownToggle>
      <DropdownMenu>
        <LinkList>
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
          <Link to="jobsHistory">
            <LinkListItem className="right-icon">
              <Icon
                className="right"
                color="primary"
                icon="it-folder"
                aria-hidden
                size="sm"
              />
              <span>Storico lavori</span>
            </LinkListItem>
          </Link>
          <LinkListItem className="right-icon" onClick={() => {}}>
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
