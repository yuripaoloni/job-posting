import { EntityRepository, IsNull, Repository } from 'typeorm';
import { OffertaLavoroEntity } from '@/entities/offertaLavoro.entity';
import { ApplyJobDto, DetermineJobDto, InterviewDto, JobOfferDto } from '@/dtos/jobs.dto';
import { UtenteEntity } from '@/entities/utente.entity';
import { Utente } from '@/interfaces/utente.interface';
import { OffertaLavoro } from '@/interfaces/offertaLavoro.interface';
import { RisposteUtenteEntity } from '@/entities/risposteUtente.entity';
import { RisposteUtente } from '@/interfaces/risposteUtente.interface';
import { SoftSkillEntity } from '@/entities/softSkill.entity';
import { RisposteSoftSkillEntity } from '@/entities/risposteSoftSkill.entity';
import { RichiestaSoftSkillEntity } from '@/entities/richiestaSoftSkill.entity';
import { RispostaRichiestaSoftSkillEntity } from '@/entities/rispostaRichiestaSoftSkill.entity';
import { CandidaturaEntity } from '@/entities/candidatura.entity';
import { RichiestaOffertaEntity } from '@/entities/richiestaOfferta.entity';
import { RichiestaCompetenzeLinguisticheEntity } from '@/entities/richiestaCompetenzeLinguistiche.entity';
import { Candidatura } from '@/interfaces/candidatura.interface';
import sendEmail from '@/utils/mail';
import { DG_EMAIL } from '@/config';
import { HttpException } from '@/exceptions/HttpException';

const handleOfferRelations = [
  'candidaturas',
  'candidaturas.utenteCf',
  'richiestaSoftSkills',
  'richiestaSoftSkills.softSkill',
  'richiestaSoftSkills.softSkill.risposteSoftSkills',
  'richiestaSoftSkills.rispostaRichiestaSoftSkills',
  'richiestaSoftSkills.rispostaRichiestaSoftSkills.rispostaId',
  'richiestaOfferta',
  'richiestaOfferta.richiestaCompetenzeLinguistiches',
];

@EntityRepository()
class JobsService extends Repository<OffertaLavoroEntity> {
  public async createJobOffer(jobOfferData: JobOfferDto, cf: string): Promise<OffertaLavoro> {
    const user: Utente = await UtenteEntity.getRepository().findOne({ where: { cf }, relations: ['struttura'] });

    const newJobOffer = new OffertaLavoroEntity();
    newJobOffer.dataScadenza = new Date(jobOfferData.expiryDate);
    newJobOffer.ruolo = jobOfferData.role;
    newJobOffer.categoria = jobOfferData.category;
    newJobOffer.descrizione = jobOfferData.description;
    newJobOffer.responsabileCf = cf;
    newJobOffer.struttura = user.struttura.descStruttura;
    newJobOffer.attiva = true;

    const result = await OffertaLavoroEntity.insert(newJobOffer);

    const richiestaOfferta = new RichiestaOffertaEntity();
    richiestaOfferta.preparazione = jobOfferData.preparation.value;
    richiestaOfferta.puntiPreparazione = jobOfferData.preparation.points;
    richiestaOfferta.esperienzaLavorativa = jobOfferData.workExperience.value;
    richiestaOfferta.puntiEsperienzaLavorativa = jobOfferData.workExperience.points;
    richiestaOfferta.esperienzaUnicam = jobOfferData.unicamExperience.value;
    richiestaOfferta.puntiEsperienzaUnicam = jobOfferData.unicamExperience.points;
    richiestaOfferta.offerta = newJobOffer;

    await richiestaOfferta.save();

    if (jobOfferData.languages.length > 0) {
      for (const language of jobOfferData.languages) {
        const richiestaCompetenzeLinguistiche = new RichiestaCompetenzeLinguisticheEntity();
        richiestaCompetenzeLinguistiche.lingua = language.lingua;
        richiestaCompetenzeLinguistiche.livello = language.livello;
        richiestaCompetenzeLinguistiche.punti = language.punti;
        richiestaCompetenzeLinguistiche.richiestaOfferta = richiestaOfferta;

        await richiestaCompetenzeLinguistiche.save();
      }
    }

    for (const [index, skillOrder] of jobOfferData.skillsOrder.entries()) {
      const softSkill = await SoftSkillEntity.getRepository().findOne({ where: { id: skillOrder.id } });

      const newRichiestaSoftSkill = new RichiestaSoftSkillEntity();
      newRichiestaSoftSkill.ordine = index + 1;
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

    await sendEmail(
      DG_EMAIL,
      `Nuova posizione - ${newJobOffer.ruolo}`,
      `Una nuova offerta di lavoro "${newJobOffer.ruolo}" per ${newJobOffer.struttura} è stata creata in data ${new Date(
        newJobOffer.dataCreazione,
      ).toLocaleDateString('it-IT')} da ${user.cognome} ${user.nome} (${user.email}).\n\nCordiali saluti`,
    );

    const jobOffer: OffertaLavoro = await OffertaLavoroEntity.findOne(result.identifiers[0].id, {
      relations: handleOfferRelations,
    });

    return jobOffer;
  }

  public async updateJobOffer(jobOfferData: JobOfferDto, jobOfferId: number): Promise<OffertaLavoro> {
    await OffertaLavoroEntity.update(
      { id: jobOfferId },
      {
        ruolo: jobOfferData.role,
        descrizione: jobOfferData.description,
        categoria: jobOfferData.category,
        dataScadenza: jobOfferData.expiryDate,
        punteggiAggiornati: false,
      },
    );

    const richiestaOfferta = await RichiestaOffertaEntity.getRepository().findOne({
      where: { offerta: jobOfferId },
    });

    richiestaOfferta.preparazione = jobOfferData.preparation.value;
    richiestaOfferta.puntiPreparazione = jobOfferData.preparation.points;
    richiestaOfferta.esperienzaLavorativa = jobOfferData.workExperience.value;
    richiestaOfferta.puntiEsperienzaLavorativa = jobOfferData.workExperience.points;
    richiestaOfferta.esperienzaUnicam = jobOfferData.unicamExperience.value;
    richiestaOfferta.puntiEsperienzaUnicam = jobOfferData.unicamExperience.points;

    await richiestaOfferta.save();

    const languages = await RichiestaCompetenzeLinguisticheEntity.getRepository().find({
      where: { richiestaOfferta: richiestaOfferta },
      loadRelationIds: true,
    });

    const removedLanguages = languages.filter(x => !jobOfferData.languages.find(y => y.lingua === x.lingua && y.livello === x.livello));
    const addedLanguages = jobOfferData.languages.filter(x => !languages.find(y => y.lingua === x.lingua && y.livello === x.livello));

    for (const addedLanguage of addedLanguages) {
      const newLanguage = new RichiestaCompetenzeLinguisticheEntity();

      newLanguage.lingua = addedLanguage.lingua;
      newLanguage.livello = addedLanguage.livello;
      newLanguage.punti = addedLanguage.punti;
      newLanguage.richiestaOfferta = richiestaOfferta;

      await newLanguage.save();
    }

    for (const removedLanguage of removedLanguages) {
      await RichiestaCompetenzeLinguisticheEntity.getRepository().delete({ id: removedLanguage.id });
    }

    for (const [index, skillOrder] of jobOfferData.skillsOrder.entries()) {
      const richiestaSoftSkill = await RichiestaSoftSkillEntity.getRepository().findOne({ where: { offerta: jobOfferId, softSkill: skillOrder.id } });

      richiestaSoftSkill.ordine = index + 1;

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

    const jobOffer: OffertaLavoro = await OffertaLavoroEntity.findOne({
      where: { id: jobOfferId },
      relations: handleOfferRelations,
    });

    jobOffer.candidaturas = jobOffer.candidaturas.sort((a, b) => a.punteggio - b.punteggio);
    jobOffer.richiestaSoftSkills = jobOffer.richiestaSoftSkills.sort((a, b) => a.ordine - b.ordine);

    return jobOffer;
  }

  public async getWorkerJobOffers(cf: string, skip: number): Promise<OffertaLavoro[]> {
    const user = await UtenteEntity.getRepository().findOne({ where: { cf }, select: ['categoria'] });
    if (!user) throw new HttpException(400, 'Per visualizzare le offerte è necessario inserire la propria categoria nella sezione Profilo.');

    const userAnswers: RisposteUtente[] = await RisposteUtenteEntity.getRepository().find({ where: { utenteCf: cf }, loadRelationIds: true });

    const jobOffers: OffertaLavoro[] =
      userAnswers.length === 0
        ? await OffertaLavoroEntity.find({ where: { approvata: true, attiva: true }, skip: skip, take: 6 })
        : await OffertaLavoroEntity.createQueryBuilder('jobs')
            .leftJoin('jobs.candidaturas', 'candidatura', 'candidatura.utenteCf = :cf', { cf })
            .where('candidatura.id is null')
            .leftJoinAndMapOne('jobs.punteggio', 'jobs.punteggi', 'punteggio', 'punteggio.utenteCf = :cf', { cf })
            .orderBy({ 'punteggio.punteggio': 'DESC' })
            .andWhere('jobs.approvata = 1')
            .andWhere('jobs.attiva = 1')
            .andWhere('jobs.punteggiAggiornati = 1')
            .skip(skip)
            .take(6)
            .getMany();

    return jobOffers;
  }

  public async getStructureJobOffers(cf: string, skip: number): Promise<OffertaLavoro[]> {
    const user: Utente = await UtenteEntity.getRepository().findOne({ where: { cf }, relations: ['struttura'] });

    const jobOffers = await OffertaLavoroEntity.find({
      where: { struttura: user.struttura.descStruttura, attiva: true },
      order: { approvata: 'ASC', dataCreazione: 'ASC' },
      relations: handleOfferRelations,
      skip,
      take: 6,
    });

    jobOffers.forEach(jobOffer => {
      jobOffer.richiestaSoftSkills = jobOffer.richiestaSoftSkills.sort((a, b) => a.ordine - b.ordine);
      jobOffer.candidaturas = jobOffer.candidaturas.sort((a, b) => a.punteggio - b.punteggio);
    });

    return jobOffers;
  }

  public async getDirectorJobOffers(skip: number): Promise<OffertaLavoro[]> {
    const jobOffers = await OffertaLavoroEntity.find({
      where: { approvata: IsNull(), attiva: true },
      relations: handleOfferRelations,
      order: { dataCreazione: 'ASC' },
      skip,
      take: 6,
    });

    return jobOffers;
  }

  public async getDirectorActiveJobs(skip: number): Promise<OffertaLavoro[]> {
    const jobOffers = await OffertaLavoroEntity.find({
      where: { approvata: true, attiva: true },
      order: { dataCreazione: 'ASC' },
      relations: ['candidaturas', 'candidaturas.utenteCf'],
      skip,
      take: 6,
    });

    jobOffers.forEach(jobOffer => {
      jobOffer.candidaturas = jobOffer.candidaturas.sort((a, b) => a.punteggio - b.punteggio);
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

    if (user.categoria !== jobOffer.categoria)
      throw new HttpException(400, "Categoria utente non coincide con la categoria specificata nell'offerta");

    const newApplication = new CandidaturaEntity();
    newApplication.approvata = false;
    newApplication.punteggio = applyJobData.score;
    newApplication.offerta = jobOffer;
    newApplication.utenteCf = user;

    await newApplication.save();
  }

  public async closeOffer(jobOfferId: number, applicationId?: number): Promise<void> {
    if (applicationId) {
      const application = await CandidaturaEntity.getRepository().findOne({ where: { id: applicationId }, loadRelationIds: true });
      application.approvata = true;
      await application.save();
    }

    const jobOffer = await OffertaLavoroEntity.findOne({ where: { id: jobOfferId } });
    jobOffer.attiva = false;

    await jobOffer.save();
  }

  public async withdrawApplication(applicationId: number): Promise<void> {
    await CandidaturaEntity.getRepository().delete({ id: applicationId });
  }

  public async determineJob(determineJobData: DetermineJobDto, cf: string): Promise<void> {
    const jobOffer = await OffertaLavoroEntity.findOne({ where: { id: determineJobData.jobOfferId } });
    const user = await UtenteEntity.getRepository().findOne({ where: { cf } });

    jobOffer.approvata = determineJobData.approved;
    jobOffer.attiva = determineJobData.approved;
    jobOffer.descEsito = determineJobData.message;
    jobOffer.punteggiAggiornati = false;

    await sendEmail(
      user.email,
      `Esito offerta lavorativa - ${jobOffer.ruolo}`,
      `L'offerta di lavoro "${jobOffer.ruolo}" per ${jobOffer.struttura} da lei creata in data ${new Date(jobOffer.dataCreazione).toLocaleDateString(
        'it-IT',
      )} è stata ${determineJobData.approved ? 'approvata' : 'rifiutata'} con il seguente messaggio: "${determineJobData.message}".${
        determineJobData.approved && `\n\nL'offerta sarà disponibile a partire da domani.`
      }\n\nCordiali saluti`,
    );

    await jobOffer.save();
  }

  public async getWorkerJobsHistory(cf: string, skip: number): Promise<Candidatura[]> {
    const applications: Candidatura[] = await CandidaturaEntity.getRepository().find({
      where: { utenteCf: cf },
      loadRelationIds: { relations: ['utenteCf'] },
      relations: ['offerta'],
      skip,
      take: 6,
    });

    return applications;
  }

  public async getStructureJobHistory(cf: string, skip: number): Promise<OffertaLavoro[]> {
    const user: Utente = await UtenteEntity.getRepository().findOne({ where: { cf }, relations: ['struttura'] });

    const jobOffers = await OffertaLavoroEntity.find({
      where: { struttura: user.struttura.descStruttura, attiva: false },
      order: { dataCreazione: 'ASC' },
      relations: ['candidaturas', 'candidaturas.utenteCf'],
      skip,
      take: 6,
    });

    jobOffers.forEach(jobOffer => {
      jobOffer.candidaturas = jobOffer.candidaturas.sort((a, b) => a.punteggio - b.punteggio);
    });

    return jobOffers;
  }

  public async getDirectorJobsHistory(skip: number): Promise<OffertaLavoro[]> {
    const jobOffers = await OffertaLavoroEntity.find({
      where: { attiva: false },
      order: { attiva: 'DESC', dataCreazione: 'ASC' },
      relations: ['candidaturas', 'candidaturas.utenteCf'],
      skip,
      take: 6,
    });

    jobOffers.forEach(jobOffer => {
      jobOffer.candidaturas = jobOffer.candidaturas.sort((a, b) => a.punteggio - b.punteggio);
    });

    return jobOffers;
  }

  public async sendInterviewInvite(interviewData: InterviewDto): Promise<Candidatura[]> {
    const ids = interviewData.invites.map((item, index) => interviewData.selected[index] && item.candidaturaId);
    const candidaturas = await CandidaturaEntity.getRepository().findByIds(ids, { relations: ['utenteCf', 'offerta'] });
    const user = await UtenteEntity.getRepository().findOne({ where: { cf: candidaturas[0].offerta.responsabileCf }, select: ['email'] });

    for (const candidatura of candidaturas) {
      candidatura.colloquio = true;

      const invite = interviewData.invites.find(item => item.candidaturaId === candidatura.id);

      await sendEmail(
        candidatura.utenteCf.email,
        `Invito colloquio - ${candidatura.offerta.ruolo}`,
        `Il responsabile della struttura "${candidatura.offerta.struttura}" la invita ad un colloquio per il ruolo "${
          candidatura.offerta.ruolo
        }" che si svolgerà il ${new Date(invite.date).toLocaleDateString('it-IT')} alle ${invite.time} nel seguente luogo: "${
          invite.place
        }".\n\nSe necessario, può contattare il responsabile al seguente indirizzo email: ${user.email}.\n\nCordiali saluti`,
        user.email,
      );

      await candidatura.save();
    }

    return candidaturas;
  }

  public async suggestCandidate(applicationId: number): Promise<void> {
    const application = await CandidaturaEntity.getRepository().findOne({ where: { id: applicationId }, loadRelationIds: true });
    application.proposto = true;
    await application.save();
  }
}

export default JobsService;
