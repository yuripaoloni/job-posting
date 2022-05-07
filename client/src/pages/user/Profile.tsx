import { useState } from "react";
import {
  Container,
  Card,
  AvatarIcon,
  Row,
  Col,
  Chip,
  ChipLabel,
  Button,
  Icon,
} from "design-react-kit";
import LanguagesModal from "../../components/profile/LanguagesModal";
import { Link } from "react-router-dom";

type ProfileProps = {};

const Profile = (props: ProfileProps) => {
  const [showLanguagesModal, setShowLanguagesModal] = useState(false);

  const toggleLanguagesModal = () => {
    setShowLanguagesModal((prev) => !prev);
  };

  return (
    <Container fluid className="p-md-5 p-3">
      <LanguagesModal
        isOpen={showLanguagesModal}
        toggleModal={toggleLanguagesModal}
      />
      <Row className="justify-content-center">
        <Col lg={10} md={11} xs={12}>
          <Card spacing className="card-bg py-4 pr-lg-4">
            <Row className="justify-content-center">
              <Col md={4}>
                <Row className="justify-content-center mt-lg-4">
                  <AvatarIcon color="primary" size="xl">
                    <p aria-hidden="true">MR</p>
                  </AvatarIcon>
                </Row>
                <Row className="justify-content-center mt-2">
                  <h5>mariorossi</h5>
                </Row>
                <Row className="justify-content-center">
                  <p className="text-muted">mariorossi@unicam.it</p>
                </Row>
              </Col>
              <Col xs={11} sm={10} md={7} lg={8}>
                <h1>Profilo</h1>
                <Col className="border-top mt-2 pt-2">
                  <Row>
                    <h4>Informazioni generali</h4>
                  </Row>
                  <dl className="row">
                    <dt className="col-sm-5">Preparazione:</dt>
                    <dd className="col-sm-6">Laurea in Informatica</dd>
                    <dt className="col-sm-5">Anno prima occupazione: </dt>
                    <dd className="col-sm-6">1996</dd>
                    <dt className="col-sm-5">Anno ingresso in Unicam: </dt>
                    <dd className="col-sm-6">1996</dd>
                    <dt className="col-sm-5">Competenze linguistiche: </dt>
                    <dd className="col-sm-6">
                      <Chip simple color="primary" className="mr-1">
                        <ChipLabel>Inglese B2</ChipLabel>
                      </Chip>
                      <Chip simple color="primary" className="mr-1">
                        <ChipLabel>Inglese B2</ChipLabel>
                      </Chip>
                    </dd>
                    <dd className="col-sm-1">
                      <Icon
                        onClick={() => toggleLanguagesModal()}
                        icon="it-pencil"
                        role="button"
                        className="hover-bg-green"
                      />
                    </dd>
                  </dl>
                </Col>
                <Col className="border-top mt-2 pt-2">
                  <Row>
                    <h4>Soft skill</h4>
                    <p className="text-muted mb-2">
                      Vestibulum imperdiet nibh non mauris fringilla
                      pellentesque. Duis ut malesuada magna. Duis pulvinar
                      sagittis dolor vitae consequat.
                    </p>
                    <Link to="/softSkill">
                      Vai alla pagina delle soft skill
                    </Link>
                  </Row>
                </Col>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
