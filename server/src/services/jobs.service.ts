import { EntityRepository, IsNull, Repository } from 'typeorm';
import { OffertaLavoroEntity } from '@/entities/offertaLavoro.entity';
import { ApplyJobDto, DetermineJobDto, JobOfferDto } from '@/dtos/jobs.dto';
import { UtenteEntity } from '@/entities/utente.entity';
import { Utente } from '@/interfaces/utente.interface';
import { OffertaLavoro } from '@/interfaces/offertaLavoro.interface';
import { RisposteUtenteEntity } from '@/entities/risposteUtente.entity';
import { RisposteUtente } from '@/interfaces/risposteUtente.interface';
import { HttpException } from '@/exceptions/HttpException';
import { SoftSkillEntity } from '@/entities/softSkill.entity';
import { RisposteSoftSkillEntity } from '@/entities/risposteSoftSkill.entity';
import { RichiestaSoftSkillEntity } from '@/entities/richiestaSoftSkill.entity';
import { RispostaRichiestaSoftSkillEntity } from '@/entities/rispostaRichiestaSoftSkill.entity';
import { CoeffDomande } from '@/interfaces/coeffDomande.interface';
import { CoeffDomandeEntity } from '@/entities/coeffDomande.entity';
import { CoeffRisposte } from '@/interfaces/coeffRisposte.interface';
import { CoeffRisposteEntity } from '@/entities/coeffRisposte.entity';
import { CandidaturaEntity } from '@/entities/candidatura.entity';
import { Candidatura } from '@/interfaces/candidatura.interface';

@EntityRepository()
class JobsService extends Repository<OffertaLavoroEntity> {
  public async createJobOffer(jobOfferData: JobOfferDto, cf: string): Promise<OffertaLavoro> {
    const user: Utente = await UtenteEntity.getRepository().findOne({ where: { cf }, relations: ['struttura'] });

    const newJobOffer = new OffertaLavoroEntity();
    newJobOffer.dataScadenza = new Date(jobOfferData.expiryDate);
    newJobOffer.ruolo = jobOfferData.role;
    newJobOffer.responsabileCf = cf;
    newJobOffer.struttura = user.struttura.descStruttura;
    newJobOffer.attiva = true;

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

  public async updateJobOffer(jobOfferData: JobOfferDto, jobOfferId: number): Promise<OffertaLavoro> {
    await OffertaLavoroEntity.update({ id: jobOfferId }, { ruolo: jobOfferData.role, dataScadenza: jobOfferData.expiryDate });

    for (const skillOrder of jobOfferData.skillsOrder) {
      const richiestaSoftSkill = await RichiestaSoftSkillEntity.getRepository().findOne({ where: { offerta: jobOfferId, softSkill: skillOrder.id } });

      richiestaSoftSkill.ordine = skillOrder.order;

      for (const answerOrder of jobOfferData.answersOrder) {
        if (answerOrder.softSkillId === skillOrder.id) {
          for (const answer of answerOrder.answers) {
            const rispostaSoftSkill = await RisposteSoftSkillEntity.getRepository().findOne({
              where: { softSkill: skillOrder.id, idRisposta: answer.answerId },
            });

            await RispostaRichiestaSoftSkillEntity.getRepository().update(
              { richiestaId: richiestaSoftSkill, rispostaId: rispostaSoftSkill },
              { ordine: answer.order },
            );
          }
        }
      }
      await richiestaSoftSkill.save();
    }

    const jobOffer: OffertaLavoro = await OffertaLavoroEntity.findOne({ where: { id: jobOfferId } });

    return jobOffer;
  }

  public async getWorkerJobOffers(cf: string): Promise<OffertaLavoro[]> {
    const userAnswers: RisposteUtente[] = await RisposteUtenteEntity.getRepository().find({ where: { utenteCf: cf }, loadRelationIds: true });
    if (!userAnswers) throw new HttpException(400, 'Completa il tuo profilo per visualizzare le offerte');
    const coeffDomande: CoeffDomande[] = await CoeffDomandeEntity.getRepository().find();
    const coeffRisposte: CoeffRisposte[] = await CoeffRisposteEntity.getRepository().find();
    const applications: Candidatura[] = await CandidaturaEntity.getRepository().find({ where: { utenteCf: cf }, loadRelationIds: true });
    let jobOffers: OffertaLavoro[] = await OffertaLavoroEntity.find({
      where: { approvata: true, attiva: true },
      order: { dataScadenza: 'DESC', dataCreazione: 'DESC' },
      loadRelationIds: { relations: ['richiestaSoftSkills'] },
    });

    // remove jobs for which the user already applied
    if (applications.length > 0) jobOffers = jobOffers.filter(jobOffer => applications.some(application => application.offerta !== jobOffer.id));

    for (const jobOffer of jobOffers) {
      let punteggio = 0;
      for (const richiestaSoftSkillId of jobOffer.richiestaSoftSkills) {
        const richiestaSoftSkill = await RichiestaSoftSkillEntity.getRepository().findOne({
          where: { id: richiestaSoftSkillId },
          loadRelationIds: { relations: ['softSkill'] },
          relations: ['rispostaRichiestaSoftSkills', 'rispostaRichiestaSoftSkills.rispostaId'],
        });

        const coeffDomanda = coeffDomande.find(item => item.ordine === richiestaSoftSkill.ordine);
        const userAnswer = userAnswers.find(item => item.softSkill === richiestaSoftSkill.softSkill);
        const rispostaRichiestaSoftSkill = richiestaSoftSkill.rispostaRichiestaSoftSkills.find(
          item => item.rispostaId.idRisposta === userAnswer.risposta,
        );
        const coeffRisposta = coeffRisposte.find(item => item.ordine === rispostaRichiestaSoftSkill.ordine);

        punteggio = punteggio + coeffDomanda.valore * coeffRisposta.valore;
      }

      jobOffer.punteggio = Math.ceil((punteggio * 100) / 525); //percentage
    }

    return jobOffers.sort((a, b) => b.punteggio - a.punteggio);
  }

  public async getStructureJobOffers(cf: string): Promise<OffertaLavoro[]> {
    const user: Utente = await UtenteEntity.getRepository().findOne({ where: { cf }, relations: ['struttura'] });

    const jobOffers = await OffertaLavoroEntity.find({
      where: { struttura: user.struttura.descStruttura, attiva: true },
      order: { approvata: 'ASC', dataCreazione: 'ASC' },
      relations: [
        'candidaturas',
        'candidaturas.utenteCf',
        'richiestaSoftSkills',
        'richiestaSoftSkills.softSkill',
        'richiestaSoftSkills.softSkill.risposteSoftSkills',
        'richiestaSoftSkills.rispostaRichiestaSoftSkills',
        'richiestaSoftSkills.rispostaRichiestaSoftSkills.rispostaId',
      ],
    });

    jobOffers.forEach(jobOffer => (jobOffer.richiestaSoftSkills = jobOffer.richiestaSoftSkills.sort((a, b) => a.ordine - b.ordine)));

    return jobOffers;
  }

  public async getDirectorJobOffers(): Promise<OffertaLavoro[]> {
    const jobOffers = await OffertaLavoroEntity.find({
      where: { approvata: IsNull(), attiva: true },
      order: { dataCreazione: 'ASC' },
      relations: ['candidaturas'],
    });

    return jobOffers;
  }

  public async removeJobOffer(cf: string, jobOfferId: number): Promise<OffertaLavoro> {
    const jobOfferToDelete = await OffertaLavoroEntity.findOne({ where: { id: jobOfferId } });

    await OffertaLavoroEntity.remove(jobOfferToDelete);

    return jobOfferToDelete;
  }

  public async applyToJobOffer(cf: string, applyJobData: ApplyJobDto): Promise<void> {
    const user = await UtenteEntity.getRepository().findOne({ where: { cf } });
    const jobOffer = await OffertaLavoroEntity.findOne({ where: { id: applyJobData.jobOfferId } });

    const newApplication = new CandidaturaEntity();
    newApplication.approvata = false;
    newApplication.punteggio = applyJobData.score;
    newApplication.offerta = jobOffer;
    newApplication.utenteCf = user;

    await newApplication.save();
  }

  public async acceptApplication(applicationId: number): Promise<void> {
    const application = await CandidaturaEntity.getRepository().findOne({ where: { id: applicationId }, loadRelationIds: true });
    application.approvata = true;

    const jobOffer = await OffertaLavoroEntity.findOne({ where: { id: application.offerta } });
    jobOffer.attiva = false;

    await application.save();
    await jobOffer.save();
  }

  public async withdrawApplication(applicationId: number): Promise<void> {
    await CandidaturaEntity.getRepository().delete({ id: applicationId });
  }

  public async determineJob(determineJobData: DetermineJobDto): Promise<void> {
    const jobOffer = await OffertaLavoroEntity.findOne({ where: { id: determineJobData.jobOfferId } });

    jobOffer.approvata = determineJobData.approved;
    jobOffer.attiva = determineJobData.approved;
    jobOffer.descEsito = determineJobData.message;

    await jobOffer.save();
  }

  public async getWorkerJobsHistory(cf: string): Promise<Candidatura[]> {
    const applications: Candidatura[] = await CandidaturaEntity.getRepository().find({
      where: { utenteCf: cf },
      loadRelationIds: { relations: ['utenteCf'] },
      relations: ['offerta'],
    });

    return applications;
  }

  public async getStructureJobHistory(cf: string): Promise<OffertaLavoro[]> {
    const user: Utente = await UtenteEntity.getRepository().findOne({ where: { cf }, relations: ['struttura'] });

    const jobOffers = await OffertaLavoroEntity.find({
      where: { struttura: user.struttura.descStruttura, attiva: false },
      order: { dataCreazione: 'ASC' },
      relations: ['candidaturas', 'candidaturas.utenteCf'],
    });

    return jobOffers;
  }

  public async getDirectorJobsHistory(): Promise<OffertaLavoro[]> {
    const jobOffers = await OffertaLavoroEntity.find({
      where: { attiva: false },
      order: { dataCreazione: 'ASC' },
      relations: ['candidaturas'],
    });

    return jobOffers;
  }
}

export default JobsService;
