import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../infrastructure/ioc2/types';
import { logger } from '../../../../utils/Logger';
import { ILotteryService } from '../../services/lotteryService';

export interface ISendPrizeUseCase {
  execute(): Promise<void>;
}
@injectable()
export class SendPrizeUseCase {
  @inject(TYPES.LotteryService) private lotteryService!: ILotteryService;

  async execute() {
    try {
      let success = false;
      let count = 0;

      while (!success && count < 3) {
        success = await this.lotteryService.sendPrize();
        count++;
        if (!success && count < 3) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
      if (success) {
        logger.info('MMLOT: Prize sent successfully!!!');
      } else {
        logger.info('Error: The MMLOT prize could not be sent after 3 attempts');
      }


    } catch (error) {
      logger.error('SendPrizeUseCase error: ', error.message);
    }
  }
}
