import { CoeffDomande } from '@/interfaces/coeffDomande.interface';
import { CoeffDomandeEntity } from '@/entities/coeffDomande.entity';
import { CoeffRisposteEntity } from '@/entities/coeffRisposte.entity';
import { CoeffRisposte } from '@/interfaces/coeffRisposte.interface';
import { RichiestaSoftSkillEntity } from '@/entities/richiestaSoftSkill.entity';
import { PunteggioOffertaEntity } from '@/entities/punteggioOfferta.entity';
import { OffertaLavoroEntity } from '@/entities/offertaLavoro.entity';
import { UtenteEntity } from '@/entities/utente.entity';

export const updateUserScores = async (user: UtenteEntity, jobOffers: OffertaLavoroEntity[]) => {
  const coeffDomande: CoeffDomande[] = await CoeffDomandeEntity.getRepository().find();
  const coeffRisposte: CoeffRisposte[] = await CoeffRisposteEntity.getRepository().find();

  for (const jobOffer of jobOffers) {
    let softSkillsPoints = 0;
    for (const richiestaSoftSkillId of jobOffer.richiestaSoftSkills) {
      const richiestaSoftSkill = await RichiestaSoftSkillEntity.getRepository().findOne({
        where: { id: richiestaSoftSkillId },
        relations: ['softSkill', 'rispostaRichiestaSoftSkills', 'rispostaRichiestaSoftSkills.rispostaId'],
      });

      const coeffDomanda = coeffDomande.find(item => item.ordine === richiestaSoftSkill.ordine);
      const userAnswer = user.risposteUtentes.find(item => item.softSkill.id === richiestaSoftSkill.softSkill.id);
      const rispostaRichiestaSoftSkill = richiestaSoftSkill.rispostaRichiestaSoftSkills.find(
        item => item.rispostaId.idRisposta === userAnswer.risposta.idRisposta,
      );
      const coeffRisposta = coeffRisposte.find(item => item.ordine === rispostaRichiestaSoftSkill.ordine);

      softSkillsPoints = softSkillsPoints + coeffDomanda.valore * coeffRisposta.valore;
    }

    let jobScore = await PunteggioOffertaEntity.getRepository().findOne({
      where: { utenteCf: user.cf, offerta: jobOffer.id },
      loadRelationIds: true,
    });

    if (!jobScore) {
      jobScore = new PunteggioOffertaEntity();

      jobScore.offerta = jobOffer;
      jobScore.utenteCf = user;
    }

    const puntiPreparazione = user.preparazione === jobOffer.richiestaOfferta.preparazione ? jobOffer.richiestaOfferta.puntiPreparazione : 0;
    const puntiEsperienzaUnicam = user.annoIngressoUnicam - new Date().getFullYear() >= 5 ? jobOffer.richiestaOfferta.puntiEsperienzaUnicam : 0;
    const puntiEsperienzaLavorativa =
      user.annoPrimaOccupazione - new Date().getFullYear() >= 10 ? jobOffer.richiestaOfferta.puntiEsperienzaLavorativa : 0;

    let pesoLinguaggi = 0;
    let puntiLinguaggi = 0;

    jobOffer.richiestaOfferta.richiestaCompetenzeLinguistiches.map(richiestaLinguaggio => {
      pesoLinguaggi += richiestaLinguaggio.punti;
      user.competenzeLinguistiches.map(linguaggio => {
        if (richiestaLinguaggio.lingua === linguaggio.lingua) {
          const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
          const levelIndex = levels.indexOf(richiestaLinguaggio.livello);
          puntiLinguaggi += levels.slice(levelIndex + 1).some(level => level === linguaggio.livello) ? 1 : 0;
        }
      });
    });

    const softSkillsPeso =
      100 -
      pesoLinguaggi -
      jobOffer.richiestaOfferta.puntiEsperienzaLavorativa -
      jobOffer.richiestaOfferta.puntiEsperienzaUnicam -
      jobOffer.richiestaOfferta.puntiPreparazione;

    softSkillsPoints = (softSkillsPoints / 525) * softSkillsPeso;

    jobScore.punteggio = puntiPreparazione + puntiEsperienzaUnicam + puntiEsperienzaLavorativa + puntiLinguaggi * pesoLinguaggi + softSkillsPoints;
    jobScore.data = new Date();

    await jobScore.save();
  }
};
