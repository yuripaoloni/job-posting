import { useState } from "react";
import {
  HeaderContent,
  HeaderBrand,
  Header,
  Icon,
  HeaderRightZone,
  Button,
  HeaderSocialsZone,
} from "design-react-kit";
import { useAuth } from "../../contexts/AuthContext";
import SignInModal from "../SignInModal";
import UserDropdown from "./UserDropdown";

const CenterHeader = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { authToken } = useAuth();

  const toggleModal = () => {
    setShowSignInModal((prev) => !prev);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <>
      <SignInModal isOpen={showSignInModal} toggleModal={toggleModal} />
      <Header small theme="" type="center" className="primary-bg">
        <HeaderContent>
          <HeaderBrand
            iconName="https://www.unicam.it/themes/custom/italiagov/unicam/img/logo_.png"
            responsive
          >
            <h2>Job Posting</h2>
            <h3>Università degli Studi di Camerino</h3>
          </HeaderBrand>
          <HeaderRightZone>
            <HeaderSocialsZone>
              <ul>
                <li>
                  <Icon icon="it-mail" color="light" className="mr-1" />
                  <a
                    href="mailto:cinfo@unicam.it"
                    className="text-white text-decoration-none"
                  >
                    cinfo@unicam.it
                  </a>
                </li>
              </ul>
            </HeaderSocialsZone>
            {!authToken ? (
              <UserDropdown
                isOpen={showDropdown}
                toggleDropdown={toggleDropdown}
              />
            ) : (
              <Button
                className="btn-icon bg-danger text-white ml-5"
                size="sm"
                onClick={() => toggleModal()}
              >
                <span className="rounded-icon">
                  <Icon color="primary" icon="it-user" />
                </span>
                <span className="d-none d-lg-block">
                  Accedi alla piattaforma
                </span>
              </Button>
            )}
          </HeaderRightZone>
        </HeaderContent>
      </Header>
    </>
  );
};

export default CenterHeader;
