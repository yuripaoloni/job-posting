import request from 'supertest';
import { createConnection, getRepository } from 'typeorm';
import App from '../app';
import AuthRoute from '../routes/auth.route';
import { dbConnection } from '../databases';
import { LoginDto } from '../dtos/auth.dto';
import { UtenteEntity } from '../entities/utente.entity';
import { Utente } from '../interfaces/utente.interface';

beforeEach(async () => {
  await createConnection(dbConnection);
});

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('/aut', () => {
  describe('[POST] /login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const userData: LoginDto = {
        username: 'mario.rossi',
        password: 'q1w2e3r4!',
      };

      const authRoute = new AuthRoute();
      const utenteRepository = getRepository(UtenteEntity);

      utenteRepository.findOne = jest.fn().mockReturnValue({
        cf: 'abc123',
        nome: 'Mario',
        cognome: 'Rossi',
        email: 'mario.rossi@unicam.it',
        username: userData.username,
        annoPrimaOccupazione: null,
        annoIngressoUnicam: null,
        preparazione: null,
      });

      const app = new App([authRoute]);
      return request(app.getServer())
        .post(`${authRoute.path}/login`)
        .send(userData)
        .expect('Set-Cookie', /^Authorization=.+/);
    });
  });
  // describe('[POST] /signup', () => {
  //   it('response should have the Create userData', async () => {
  //     const userData: CreateUserDto = {
  //       email: 'test@email.com',
  //       password: 'q1w2e3r4!',
  //     };

  //     const authRoute = new AuthRoute();
  //     const users = authRoute.authController.authService.users;
  //     const userRepository = getRepository(users);

  //     userRepository.findOne = jest.fn().mockReturnValue(null);
  //     userRepository.save = jest.fn().mockReturnValue({
  //       id: 1,
  //       email: userData.email,
  //       password: await bcrypt.hash(userData.password, 10),
  //     });

  //     const app = new App([authRoute]);
  //     return request(app.getServer()).post(`${authRoute.path}signup`).send(userData).expect(201);
  //   });
  // });
  // describe('[GET] /logout', () => {
  //   it('logout Set-Cookie Authorization=; Max-age=0', async () => {
  //     const authRoute = new AuthRoute();
  //     const app = new App([authRoute]);

  //     return request(app.getServer())
  //       .post(`${authRoute.path}logout`)
  //       .expect('Set-Cookie', /^Authorization=\;/);
  //   });
  // });
  // describe('[GET] /validate', () => {});
  // describe('[GET] /userType/:userType', () => {});
});
