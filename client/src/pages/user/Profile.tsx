import { useEffect, useState } from "react";
import {
  Container,
  Card,
  AvatarIcon,
  Row,
  Col,
  Chip,
  ChipLabel,
  Icon,
} from "design-react-kit";
import { Link } from "react-router-dom";

import EditProfileModal from "../../components/profile/EditProfileModal";

import { CompetenzeLinguistiche, Utente } from "../../typings/utente.type";
import { useFetch } from "../../contexts/FetchContext";

type ProfileProps = {};

const Profile = (props: ProfileProps) => {
  const [showEditProfileModal, setshowEditProfileModal] = useState(false);
  const [user, setUser] = useState<Utente | undefined>(undefined);

  const { fetchData } = useFetch();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetchData<Utente>("/profile", "GET");

      setUser(res?.data);
    };

    fetchUser();
  }, [fetchData]);

  const toggleEditProfileModal = () => {
    setshowEditProfileModal((prev) => !prev);
  };

  const updateUser = (
    firstOccupationYear: number,
    preparation: string,
    languages: CompetenzeLinguistiche[]
  ) => {
    setUser((prev) => {
      return {
        ...prev!,
        annoPrimaOccupazione: firstOccupationYear,
        preparazione: preparation,
        competenzeLinguistiches: languages,
      };
    });
  };

  return (
    <Container fluid className="p-md-5 p-3">
      <EditProfileModal
        isOpen={showEditProfileModal}
        toggleModal={toggleEditProfileModal}
        user={user}
        updateUser={updateUser}
      />
      <Row className="justify-content-center">
        <Col lg={10} md={11} xs={12}>
          <Card spacing className="card-bg py-4 pr-lg-4">
            <Row className="justify-content-center">
              <Col md={4}>
                <Row className="justify-content-center mt-lg-4">
                  <AvatarIcon color="primary" size="xl">
                    <p aria-hidden="true">
                      {user?.nome?.charAt(0)}
                      {user?.cognome?.charAt(0)}
                    </p>
                  </AvatarIcon>
                </Row>
                <Row className="justify-content-center mt-2">
                  <h5>{user?.username}</h5>
                </Row>
                <Row className="justify-content-center">
                  <p className="text-muted">{user?.email}</p>
                </Row>
              </Col>
              <Col xs={11} sm={10} md={7} lg={8}>
                <Row className="align-items-center justify-content-between">
                  <h1 className="mr-2">Profilo</h1>
                  <Icon
                    size="lg"
                    onClick={() => toggleEditProfileModal()}
                    icon="it-pencil"
                    role="button"
                    className="hover-bg-green"
                  />
                </Row>
                <Col className="border-top mt-2 pt-2">
                  <Row>
                    <h4>Informazioni generali</h4>
                  </Row>
                  <dl className="row">
                    <dt className="col-sm-6">Preparazione:</dt>
                    <dd className="col-sm-6">
                      {user?.preparazione ? user?.preparazione : "N/A"}
                    </dd>
                    <dt className="col-sm-6">
                      Anno prima occupazione lavorativa:{" "}
                    </dt>
                    <dd className="col-sm-6">
                      {user?.annoPrimaOccupazione
                        ? user?.annoPrimaOccupazione
                        : "N/A"}{" "}
                    </dd>
                    <dt className="col-sm-6">Anno ingresso in Unicam: </dt>
                    <dd className="col-sm-6">
                      {user?.annoIngressoUnicam
                        ? user?.annoIngressoUnicam
                        : "N/A"}
                    </dd>
                    <dt className="col-sm-6">Competenze linguistiche: </dt>
                    <dd className="col-sm-6">
                      {user?.competenzeLinguistiches
                        ? user.competenzeLinguistiches.map((item, index) => (
                            <Chip
                              key={index}
                              simple
                              color="primary"
                              className="mr-1"
                            >
                              <ChipLabel>
                                {item.lingua} {item.livello}
                              </ChipLabel>
                            </Chip>
                          ))
                        : "N/A"}
                    </dd>
                  </dl>
                </Col>
                <Col className="border-top mt-2 pt-2">
                  <h4>Competenze traversali</h4>
                  <p className="text-muted mb-2">
                    Risponde alle domande per completare il tuo profile e
                    candidarti per le posizione aperte
                  </p>
                  <Link to="/competencies">
                    Vai alla pagina delle competenze
                  </Link>
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
