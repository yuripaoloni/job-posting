import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Icon,
  CardTitle,
  CardText,
  CardReadMore,
} from "design-react-kit";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="p-4">
      <Row className="justify-content-center">
        <h1 className="display-1">Job Posting</h1>
      </Row>
      <Row className="justify-content-center mb-5">
        <h5 className="text-center">
          La nuova piattaforma di ateneo per cercare ed aprire nuove posizioni
          lavorative
        </h5>
      </Row>
      <Row className="justify-content-around">
        <Col xs="12" md="5" xl="4">
          <Card spacing className="card-bg card-big">
            <CardBody>
              <div className="top-icon">
                <Icon icon="it-user" color="primary" />
              </div>
              <CardTitle tag="h5">Sei un lavoratore Unicam?</CardTitle>
              <CardText>
                Completa il processo di profilazione e visualizza le posizione
                lavorative aperte
              </CardText>
              <CardReadMore
                iconName="it-arrow-right"
                text="Visualizza offerte"
                role="button"
                onClick={() => navigate("/jobs")}
              />
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="5" xl="4">
          <Card spacing className="card-bg card-big">
            <CardBody>
              <div className="top-icon">
                <Icon icon="it-pa" color="primary" />
              </div>
              <CardTitle tag="h5">
                Sei un responsabile di una struttura Unicam?
              </CardTitle>
              <CardText>Apri una nuova posizione lavorativa</CardText>
              <CardReadMore
                iconName="it-arrow-right"
                text="Crea nuova posizione"
                role="button"
                onClick={() => navigate("/jobs")}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
