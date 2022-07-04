import { sign } from 'jsonwebtoken';
import { EntityRepository, Repository } from 'typeorm';
import { SECRET_KEY, LDAP_SERVER } from '@config';
import { LoginDto } from '@dtos/auth.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Utente } from '@interfaces/utente.interface';
import { isEmpty } from '@utils/util';
import { UtenteEntity } from '@/entities/utente.entity';
import { createClient, SearchOptions } from 'ldapjs-promise';
import { CaricheUtentiEntity } from '@/entities/caricheUtenti.entity';
import { CaricheUtenti } from '@/interfaces/caricheUtenti.interface';
import { WORKER } from '@/utils/userTypes';
import { TipiUtenteEntity } from '@/entities/tipiUtente.entity';

@EntityRepository()
class AuthService extends Repository<UtenteEntity> {
  public async login(loginData: LoginDto): Promise<{ cookie: string; tipoUtenteId: number }> {
    if (isEmpty(loginData)) throw new HttpException(400, 'Credenziali di accesso non corrette');

    const client = await createClient({ url: `ldap://${LDAP_SERVER}` });

    await client.bind(`${loginData.username}@amministrazione.unicam`, loginData.password);

    const opts: SearchOptions = {
      filter: `(sAMAccountName=${loginData.username})`,
      scope: 'sub',
      attributes: ['employeeid'],
    };

    const results = await client.searchReturnAll('OU=PERSONALE,DC=Amministrazione,DC=Unicam', opts);

    const employeeId = results.entries[0].employeeID as string;

    const utente: Utente = await UtenteEntity.getRepository().findOne({ where: { cf: employeeId } });
    if (!utente) throw new HttpException(401, `Utente ${employeeId} non registrato`);

    const caricaUtente: CaricheUtenti = await CaricheUtentiEntity.getRepository().findOne({ where: { utenteCf: employeeId }, loadRelationIds: true });

    const tipoUtenteId = caricaUtente ? caricaUtente.idTipoutente : WORKER;

    const tokenData = this.createToken(utente, tipoUtenteId);
    const cookie = this.createCookie(tokenData);

    return { cookie, tipoUtenteId };
  }

  public async changeUserType(cf: string, userType: number): Promise<string> {
    const utente: Utente = await UtenteEntity.getRepository().findOne({ where: { cf } });

    const tokenData = this.createToken(utente, userType);
    const cookie = this.createCookie(tokenData);

    return cookie;
  }

  public async getUserType(cf: string): Promise<number> {
    const userType = await CaricheUtentiEntity.getRepository().findOne({ where: { utenteCf: cf }, loadRelationIds: { relations: ['idTipoutente'] } });

    return userType ? Number(userType.idTipoutente) : 0;
  }

  public async changeRole(cf: string, userType: number): Promise<void> {
    const tipoUtente = await TipiUtenteEntity.getRepository().findOne({ where: { idTipoutente: userType } });
    await CaricheUtentiEntity.getRepository().update({ utenteCf: cf }, { idTipoutente: tipoUtente });
  }

  public createToken(user: Utente, tipoUtenteId: number): TokenData {
    const dataStoredInToken: DataStoredInToken = { cf: user.cf, username: user.username, tipoUtenteId };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60 * 24; //1 week

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}; Path=/api;`;
  }
}

export default AuthService;
