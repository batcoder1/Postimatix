import { Application } from './infrastructure/http';
import container from './infrastructure/ioc2/container.config';
import { TYPES } from './infrastructure/ioc2/types';
import { CronService } from './modules/cron/services/cronService';
import { logger } from './utils/Logger';

function Main() {
  logger.info('Starting in ', process.env.NODE_ENV);

  const app = new Application();
  app.start();

  const cron = container.get<CronService>(TYPES.CronService);
  cron.start();

}

Main()

