import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import helmet from 'helmet';
import hpp from 'hpp';

import { InversifyExpressServer } from 'inversify-express-utils';
import 'reflect-metadata';
import container from '../ioc2/container.config';
import {
  badRequestMiddleware,
  internalErrorMiddleware, isValidUrlMiddleware, optionMiddleware
} from './middleware/HttpValidate';
import { logger } from '../../utils/Logger';
import nocache from 'nocache';


export class ExpressServer {
  private app: express.Application;
  private httpServer?: any;

  constructor() {
    this.app = express();
  }

  public build() {
    const port = config.get('http.port')
    const originAllowed = process.env.NODE_ENV === 'dev' ? /.*/ : /^https?:\/\/(?:[a-zA-Z0-9-]+\.)?bravepay\.net$/;

    this.setupStandards();
    this.setupSecurity()

    this.app.use(cors({
      origin: originAllowed,
    }));
    this.app.options(originAllowed, cors())



    const server = new InversifyExpressServer(container, null, { rootPath: "/api" }, this.app);
     server.setErrorConfig((app:any) => {

      // 404 handler
      app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).send({
          message: 'Route not found'
        });
      });
      this.setupSafety();
    })

    const httpServer = server.build().listen(port, () => {
      logger.info(`[ExpressServer][start] Listening on ${port}`);
    });
    this.httpServer = httpServer; // Save the server instance to the class property
    return httpServer;
  }

  public kill() {
    this.httpServer.close()
  }

  private setupStandards() {
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ): void => {
        if (req.originalUrl === '/api/stripe/webhook') {
          next();
        } else {
          express.json({ limit: '50mb' })(req, res, next);
        }
      }
    );
    this.app.use(express.urlencoded({ limit: '50mb', extended: true}));
    this.app.use(cookieParser());
  }

  private setupSecurity() {
    this.app.use(optionMiddleware)
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
    this.app.use(nocache());
  }

  private setupSafety() {
    this.app.use(isValidUrlMiddleware);
    this.app.use(badRequestMiddleware);
    this.app.use(internalErrorMiddleware);
  }



}


