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
        <h6>Seleziona candidato</h6>
      </Row>
      {job?.candidaturas && job?.candidaturas?.length > 0
        ? job?.candidaturas?.map(
            (candidatura) =>
              candidatura.colloquio && (
                <Row
                  key={candidatura.id}
                  className="align-items-center justify-content-between border-bottom px-2 py-2"
                >
                  <Candidate candidatura={candidatura} xs={8} />
                  <Col xs={2}>
                    <Button
                      size="sm"
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
                  </Col>
                </Row>
              )
          )
        : "Nessun candidatura"}
    </>
  );
};

export default SelectCandidate;
