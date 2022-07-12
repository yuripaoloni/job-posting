import { Col } from "design-react-kit";

import { Candidatura } from "../../typings/jobs.type";

import { formatNameSurname } from "../../utils/formatNameSurname";

import Score from "./Score";

type CandidateProps = {
  candidatura: Candidatura;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

const Candidate = ({ candidatura, xs, sm, md, lg, xl }: CandidateProps) => {
  return (
    <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <h6>
        {formatNameSurname(
          candidatura.utenteCf!.nome!,
          candidatura.utenteCf!.cognome!
        )}
        <small> ({candidatura.utenteCf?.email})</small>
      </h6>
      <p>{candidatura.utenteCf?.preparazione}</p>
      {candidatura.utenteCf?.annoPrimaOccupazione && (
        <p>Prima occupazione nel {candidatura.utenteCf.annoPrimaOccupazione}</p>
      )}
      {candidatura.utenteCf?.annoIngressoUnicam && (
        <p>Ingresso in Unicam nel {candidatura.utenteCf.annoIngressoUnicam}</p>
      )}
      <p>
        {candidatura.utenteCf?.competenzeLinguistiches?.map(
          (competenzaLinguistica) =>
            `${competenzaLinguistica.lingua}-${competenzaLinguistica.livello}`
        )}
      </p>
      <Score score={candidatura.punteggio} />
    </Col>
  );
};

export default Candidate;
