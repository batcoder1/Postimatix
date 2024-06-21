
import { inject, injectable } from 'inversify';
import * as cron from 'node-cron';
import { TYPES } from '../../../infrastructure/ioc2/types';
import { logger } from '../../../utils/Logger';
import { rounded } from '../../../utils/Rounded';
import { IRepliesUseCase } from '../useCases/RepliesUseCase/repliesUseCase';
import { IAutoPostUseCase } from '../useCases/autoPostUseCase/autoPostUSeCase';
import { ISendPrizeUseCase } from '../useCases/sendPrizesUseCase/sendPrizeUseCase';

export interface ICronService {
  start(): Promise<boolean>;
}

@injectable()
export class CronService {
  @inject(TYPES.AutoPostUseCase) private autoPostUseCase!: IAutoPostUseCase;
  @inject(TYPES.SendPrizeUseCase) private sendPrizeUseCase!: ISendPrizeUseCase;
  @inject(TYPES.RepliesUseCase) private repliesUseCase!: IRepliesUseCase;


  public async start(): Promise<boolean> {
    try {
      const hours = 24;
      const minutes = rounded(60 * hours, 0);

      // contabo server 2h less from spanish time
      const sendPrizeSchedule = '*/3 * * * *';
      const createLotterySchedule = '10 16 * * *';
      const postSchedule = '0 9,15,21 * * *';
      const repliesSchedule = '* * * * *';
      logger.info('Schedule sendPrice process at: ', sendPrizeSchedule);
      logger.info('Schedule createLottery process at: ', createLotterySchedule);
      logger.info('Lottery minutes: ', minutes);

      cron.schedule(sendPrizeSchedule, async () => {
        await this.sendPrizeUseCase.execute(minutes);
        logger.info(`Send Prize finished`);
      });
      await this.sendPrizeUseCase.execute(minutes);

       cron.schedule(postSchedule, async () => {
          await this.autoPostUseCase.execute();
          logger.info(`Auto post finished`);
        });
    /*   cron.schedule(repliesSchedule, async () => {
        await this.repliesUseCase.execute();
      }); */

      logger.info(`Cron jobs scheduled`);
      return true;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }


}

