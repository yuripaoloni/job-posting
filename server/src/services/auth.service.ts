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
import UtenteService from './utente.service';
import CaricheUtentiService from './caricheUtenti.service';

@EntityRepository()
class AuthService extends Repository<UtenteEntity> {
  public utenteService = new UtenteService();
  public caricheUtentiService = new CaricheUtentiService();

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

    const utente = await this.utenteService.findUserByCf(employeeId);

    const tipoUtenteId = await this.caricheUtentiService.getCaricaIdByCf(employeeId);

    const tokenData = this.createToken(utente, tipoUtenteId);
    const cookie = this.createCookie(tokenData);

    return { cookie, tipoUtenteId };
  }

  public createToken(user: Utente, tipoUtenteId: number): TokenData {
    const dataStoredInToken: DataStoredInToken = { cf: user.cf, username: user.username, tipoUtenteId };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60 * 24; //1 week

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
