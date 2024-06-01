
import { inject, injectable } from 'inversify';
import * as cron from 'node-cron';
import { TYPES } from '../../../infrastructure/ioc2/types';
import { logger } from '../../../utils/Logger';
import { rounded } from '../../../utils/Rounded';
import { IAutoPostUseCase } from '../useCases/autoPostUseCase/autoPostUSeCase';
import { ICreateLotteryUseCase } from '../useCases/lotteryUseCase/createLotteryUseCase';
import { ISendPrizeUseCase } from '../useCases/sendPrizesUseCase/sendPrizeUseCase';

export interface ICronService {
  start(): Promise<boolean>;
}

@injectable()
export class CronService {
  @inject(TYPES.AutoPostUseCase) private autoPostUseCase!: IAutoPostUseCase;
  @inject(TYPES.CreateLotteryUseCase) private createLotteryUseCase!: ICreateLotteryUseCase;
  @inject(TYPES.SendPrizeUseCase) private sendPrizeUseCase!: ISendPrizeUseCase;


  public async start(): Promise<boolean> {
    try {
      const hours = 47.8;
      //const hours = 0.5;
      const minutes = rounded(60 * hours, 0);

      // contabo server 2h less from spanish time
      const sendPrizeSchedule = '05 16 * * *';
      const createLotterySchedule = '10 16 * * *';
      const postSchedule = '0 9,15,21 * * *';
      logger.info('Schedule sendPrice process at: ', sendPrizeSchedule);
      logger.info('Schedule createLottery process at: ', createLotterySchedule);
      logger.info('Lottery minutes: ', minutes);

      cron.schedule(sendPrizeSchedule, async () => {
        await this.sendPrizeUseCase.execute();
        logger.info(`Send Prize finished`);
      });

      cron.schedule(createLotterySchedule, async () => {
        await this.createLotteryUseCase.execute(minutes);
        logger.info(`Create lottery finished`);
      });

      cron.schedule(postSchedule, async () => {
        await this.autoPostUseCase.execute();
        logger.info(`Auto post finished`);
      });

      logger.info(`Cron jobs scheduled`);
      return true;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }


}

