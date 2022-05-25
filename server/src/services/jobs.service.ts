import { EntityRepository, Repository } from 'typeorm';
import { OffertaLavoroEntity } from '@/entities/offertaLavoro.entity';
import { JobOfferDto } from '@/dtos/jobs.dto';
import { UtenteEntity } from '@/entities/utente.entity';
import { StruttureEntity } from '@/entities/strutture.entity';
import { Utente } from '@/interfaces/utente.interface';
import { Strutture } from '@/interfaces/strutture.interface';
import { OffertaLavoro } from '@/interfaces/offertaLavoro.interface';
import { RisposteUtenteEntity } from '@/entities/risposteUtente.entity';
import { RisposteUtente } from '@/interfaces/risposteUtente.interface';
import { HttpException } from '@/exceptions/HttpException';
import { CaricheUtentiEntity } from '@/entities/caricheUtenti.entity';
import { CaricheUtenti } from '@/interfaces/caricheUtenti.interface';
import { DIRECTOR } from '@/utils/userTypes';
import { SoftSkillEntity } from '@/entities/softSkill.entity';
import { RisposteSoftSkillEntity } from '@/entities/risposteSoftSkill.entity';
import { RichiestaSoftSkillEntity } from '@/entities/richiestaSoftSkill.entity';
import { RispostaRichiestaSoftSkillEntity } from '@/entities/rispostaRichiestaSoftSkill.entity';

@EntityRepository()
class JobsService extends Repository<OffertaLavoroEntity> {
  public async createJobOffer(jobOfferData: JobOfferDto, cf: string): Promise<OffertaLavoro> {
    const user: Utente = await UtenteEntity.getRepository().findOne({ where: { cf }, loadRelationIds: true });
    const struttura: Strutture = await StruttureEntity.getRepository().findOne({ where: { idStruttura: user.struttura } });

    const newJobOffer = new OffertaLavoroEntity();
    newJobOffer.dataScadenza = new Date(jobOfferData.expiryDate);
    newJobOffer.ruolo = jobOfferData.role;
    newJobOffer.responsabileCf = cf;
    newJobOffer.struttura = struttura.descStruttura;
    newJobOffer.approvata = false;
    newJobOffer.attiva = false;

    const result = await OffertaLavoroEntity.insert(newJobOffer);

    for (const skillOrder of jobOfferData.skillsOrder) {
      const softSkill = await SoftSkillEntity.getRepository().findOne({ where: { id: skillOrder.id } });

      const newRichiestaSoftSkill = new RichiestaSoftSkillEntity();
      newRichiestaSoftSkill.ordine = skillOrder.order;
      newRichiestaSoftSkill.softSkill = softSkill;
      newRichiestaSoftSkill.offerta = newJobOffer;

      await newRichiestaSoftSkill.save();

      for (const answerOrder of jobOfferData.answersOrder) {
        if (answerOrder.softSkillId === skillOrder.id) {
          for (const answer of answerOrder.answers) {
            const rispostaSoftSkill = await RisposteSoftSkillEntity.getRepository().findOne({
              where: { softSkill: skillOrder.id, idRisposta: answer.answerId },
            });

            const newRispostaRichiestaSoftSkill = new RispostaRichiestaSoftSkillEntity();
            newRispostaRichiestaSoftSkill.ordine = answer.order;
            newRispostaRichiestaSoftSkill.rispostaId = rispostaSoftSkill;
            newRispostaRichiestaSoftSkill.richiestaId = newRichiestaSoftSkill;

            await newRispostaRichiestaSoftSkill.save();
          }
        }
      }
    }

    const jobOffer: OffertaLavoro = await OffertaLavoroEntity.findOne(result.identifiers[0].id);

    return jobOffer;
  }

  public async getWorkerJobOffers(cf: string): Promise<OffertaLavoro[]> {
    const userAnswers: RisposteUtente[] = await RisposteUtenteEntity.getRepository().find({ where: { utenteCf: cf }, loadRelationIds: true });
    if (!userAnswers) throw new HttpException(400, 'Completa la profilazione per visualizzare le offerte');

    //TODO load job offers and compute points
    const jobOffers = await OffertaLavoroEntity.find({ order: { approvata: 'ASC', dataCreazione: 'ASC' } });
    return jobOffers;
  }

  public async getStructureJobOffers(cf: string): Promise<OffertaLavoro[]> {
    const user: Utente = await UtenteEntity.getRepository().findOne({ where: { cf }, loadRelationIds: true });
    const struttura: Strutture = await StruttureEntity.getRepository().findOne({ where: { idStruttura: user.struttura } });

    const jobOffers = await OffertaLavoroEntity.find({
      where: { struttura: struttura.descStruttura },
      order: { approvata: 'ASC', dataCreazione: 'ASC' },
    });

    return jobOffers;
  }

  public async getDirectorJobOffers(cf: string): Promise<OffertaLavoro[]> {
    const caricaUtente: CaricheUtenti = await CaricheUtentiEntity.getRepository().findOne({ where: cf, loadRelationIds: true });
    if (caricaUtente.idTipoutente !== DIRECTOR) throw new HttpException(403, 'Accesso negato');

    const jobOffers = await OffertaLavoroEntity.find({ order: { approvata: 'ASC', dataCreazione: 'ASC' } });

    return jobOffers;
  }
}

export default JobsService;
