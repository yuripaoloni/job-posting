import { Row, Col, FormGroup, Input, Label, Button } from "design-react-kit";

import { Invite, Job } from "../../typings/jobs.type";
import { formatNameSurname } from "../../utils/formatNameSurname";

import Candidate from "./Candidate";

type InviteCandidateProps = {
  job: Job;
  invites: Invite[];
  updateInviteData: (index: number, updatedInvite: Invite) => void;
  selected: boolean[];
  updateSelected: (index: number) => void;
  onSuggestCandidate: (candidaturaId: number, user: string) => void;
};

const InviteCandidate = ({
  job,
  invites,
  updateInviteData,
  selected,
  updateSelected,
  onSuggestCandidate,
}: InviteCandidateProps) => {
  return (
    <>
      <Row className="px-2 mb-2 pb-2">
        <h6>
          Seleziona i candidati da invitare al colloquio specificando data, ora
          e luogo. Una email verrà inviata all'indirizzo del candidato.
        </h6>
      </Row>
      {job?.candidaturas && job?.candidaturas?.length > 0
        ? job?.candidaturas.map((candidatura, index) => (
            <Row
              key={candidatura.id}
              className="align-items-center justify-content-between border-bottom px-2 py-2"
            >
              <Candidate candidatura={candidatura} />
              {candidatura.colloquio ? (
                <Button
                  color="primary"
                  disabled={candidatura.proposto!}
                  size="sm"
                  onClick={() =>
                    onSuggestCandidate(
                      candidatura.id,
                      formatNameSurname(
                        candidatura.utenteCf!.nome!,
                        candidatura.utenteCf!.cognome!
                      )
                    )
                  }
                >
                  Proponi candidato
                </Button>
              ) : (
                <>
                  <Col lg={6} xs={11} className="mt-lg-0 mt-5">
                    <div className="form-row align-items-center align-middle">
                      <Input
                        type="time"
                        id="time"
                        value={invites[index].time}
                        label="Orario"
                        wrapperClass="col-xl-3 col-lg-6 col-xs-6"
                        onChange={(e) =>
                          updateInviteData(index, {
                            candidaturaId: candidatura.id,
                            time: e.target.value,
                            date: invites[index].date,
                            place: invites[index].place,
                          })
                        }
                      />
                      <Input
                        type="date"
                        id="date"
                        value={invites[index].date}
                        label="Data"
                        placeholder={new Date().toUTCString()}
                        wrapperClass="col-xl-4 col-lg-6 col-xs-6"
                        onChange={(e) =>
                          updateInviteData(index, {
                            candidaturaId: candidatura.id,
                            time: invites[index].time,
                            date: e.target.value,
                            place: invites[index].place,
                          })
                        }
                      />
                      <Input
                        type="text"
                        id="place"
                        value={invites[index].place}
                        label="Luogo"
                        wrapperClass="col-xl col-lg-10 col-xs"
                        onChange={(e) =>
                          updateInviteData(index, {
                            candidaturaId: candidatura.id,
                            time: invites[index].time,
                            date: invites[index].date,
                            place: e.target.value,
                          })
                        }
                      />
                    </div>
                  </Col>
                  <Col xs={1} className="text-center">
                    <FormGroup check>
                      <Input
                        id={`checkbox${index}`}
                        type="checkbox"
                        checked={selected[index]}
                        onChange={() => updateSelected(index)}
                      />
                      <Label for={`checkbox${index}`} check></Label>
                    </FormGroup>
                  </Col>
                </>
              )}
            </Row>
          ))
        : "Nessun candidatura"}
    </>
  );
};

export default InviteCandidate;
