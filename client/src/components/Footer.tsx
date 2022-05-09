import {
  Container,
  Col,
  Row,
  LinkList,
  LinkListItem,
  Icon,
} from "design-react-kit";

const Footer = () => {
  return (
    <footer className="it-footer">
      <div className="it-footer-main">
        <Container>
          <section>
            <Row className="clearfix">
              <Col sm={12}>
                <div className="it-brand-wrapper">
                  <a href="https://www.unicam.it">
                    <Icon
                      size="xl"
                      icon="https://www.unicam.it/themes/custom/italiagov/unicam//img/logo-white_.png"
                    />
                    <div className="it-brand-text">
                      <h2>Università degli Studi di Camerino</h2>
                    </div>
                  </a>
                </div>
              </Col>
            </Row>
          </section>
          <section>
            <Row>
              <Col className="pb-2" lg={6} md={3} sm={6}>
                <span>Piazza Cavour 19/f 62032 Camerino MC</span>
                <br />
                <span>
                  Numero verde: 800 054 000 (lun-ven: 8.30-13.30 lun-mer 15.00
                  -18.00)
                </span>
                <br />

                <span>P.IVA: 00291660439</span>
                <br />

                <span>C.F.: 81001910439</span>
                <br />

                <h6>
                  <small>posta certificata: </small>
                  <a
                    href="mailto:protocollo@pec.unicam.it"
                    className="text-white text-decoration-none"
                  >
                    protocollo@pec.unicam.it
                  </a>
                </h6>
              </Col>
              <Col className="pb-2" lg={3} md={3} sm={6}>
                <LinkList className="footer-list clearfix">
                  <LinkListItem href="https://www.unicam.it/ateneo/privacy/privacy-policy">
                    Privacy Policy
                  </LinkListItem>
                  <LinkListItem href="https://www.unicam.it/cookie-policy">
                    Cookie Policy
                  </LinkListItem>
                </LinkList>
              </Col>
            </Row>
          </section>
          <section className="py-4 border-white border-top">
            Sito realizzato dall'area infrastrutture e servizi informatici di
            Unicam
          </section>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
