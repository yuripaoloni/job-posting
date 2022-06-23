import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import https from 'https';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { createConnection } from 'typeorm';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import startJobs from '@jobs/index';
import getHttpsConf from './config/https';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 8000;

    this.env !== 'test' && this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.initializeJobs();
  }

  public listen() {
    if (this.env !== 'production') {
      this.app.listen(this.port, () => {
        logger.info(`======= ENV: ${this.env} =======`);
        logger.info(`App listening on the port ${this.port}`);
        logger.info(`=================================`);
      });
    } else {
      const httpsConf = getHttpsConf();
      const httpsServer = https.createServer(httpsConf, this.app);
      httpsServer.listen(this.port, () => {
        logger.info(`======= ENV: ${this.env} =======`);
        logger.info(`App listening on the port ${this.port}`);
        logger.info(`=================================`);
      });

      const client = express();

      client.use(express.static(path.join(__dirname, '../../client/build')));

      client.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
      });

      const clientServer = https.createServer(httpsConf, client);
      clientServer.listen(443, () => {
        logger.info(`Served client on port 443`);
        logger.info(`=================================`);
      });
    }
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    createConnection(dbConnection);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream })); //HTTP request logger middleware
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp()); //middleware to protect against HTTP Parameter Pollution attacks
    this.app.use(helmet()); //secure your Express apps by setting various HTTP headers
    this.app.use(compression()); //compression middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser()); //populate req.cookies with an object keyed by the cookie names
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/api', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'Job Posting REST API',
          version: '1.0.0',
          description: 'Job Posting REST API documentation',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeJobs() {
    startJobs();
  }
}

export default App;
