import {
  HeaderContent,
  HeaderBrand,
  Header,
  Icon,
  HeaderRightZone,
  Button,
  HeaderSocialsZone,
} from "design-react-kit";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import SignInModal from "../SignInModal";

const CenterHeader = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const { authToken } = useAuth();

  const toggleModal = () => {
    setShowSignInModal((prev) => !prev);
  };

  return (
    <>
      <SignInModal isOpen={showSignInModal} toggleModal={toggleModal} />
      <Header small theme="" type="center">
        <HeaderContent>
          <HeaderBrand iconName="it-pa" responsive>
            <h2>Job Posting</h2>
            <h3>Università degli Studi di Camerino</h3>
          </HeaderBrand>
          <HeaderRightZone>
            <HeaderSocialsZone label="">
              <ul>
                <li>
                  <Icon icon="it-mail" color="light" className="mr-1" />
                  <span>cinfo@unicam.it</span>
                </li>
              </ul>
            </HeaderSocialsZone>
            {authToken ? (
              <div></div>
            ) : (
              <Button
                className="primary-bg-a9 text-white ml-5"
                size="sm"
                onClick={() => toggleModal()}
              >
                Accedi
              </Button>
            )}
          </HeaderRightZone>
        </HeaderContent>
      </Header>
    </>
  );
};

export default CenterHeader;
