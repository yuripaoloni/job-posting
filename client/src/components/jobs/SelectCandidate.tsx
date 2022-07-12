import { Button, Col, Row } from "design-react-kit";
import { Job } from "../../typings/jobs.type";
import { formatNameSurname } from "../../utils/formatNameSurname";
import Candidate from "./Candidate";

type SelectCandidateProps = {
  job: Job;
  onCloseOffer: (
    offerId: number,
    applicationId: number,
    candidate: string
  ) => void;
};

const SelectCandidate = ({ job, onCloseOffer }: SelectCandidateProps) => {
  return (
    <>
      <Row className="px-2 mb-2 pb-2">
        <h6>
          Seleziona candidato tra quelli che hanno effettuato il colloquio. Il
          candidato proposto dal responsabile di struttura si trova in
          corrispondenza del bottone blu.
        </h6>
      </Row>
      {job?.candidaturas && job?.candidaturas?.length > 0
        ? job?.candidaturas?.map((candidatura) => (
            <Row
              key={candidatura.id}
              className="align-items-center justify-content-sm-around justify-content-evenly border-bottom px-2 py-2"
            >
              <Candidate candidatura={candidatura} sm={8} xs={6} />
              <Col xs={2}>
                {candidatura.colloquio && (
                  <Button
                    size="sm"
                    outline={!candidatura.proposto}
                    color="primary"
                    onClick={() =>
                      onCloseOffer(
                        job.id,
                        candidatura.id,
                        formatNameSurname(
                          candidatura.utenteCf!.nome!,
                          candidatura.utenteCf!.cognome!
                        )
                      )
                    }
                  >
                    Seleziona candidato
                  </Button>
                )}
              </Col>
            </Row>
          ))
        : "Nessun candidatura"}
    </>
  );
};

export default SelectCandidate;
