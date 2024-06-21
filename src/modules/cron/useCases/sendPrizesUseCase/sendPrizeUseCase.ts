import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../infrastructure/ioc2/types';
import { logger } from '../../../../utils/Logger';
import { ILotteriesService } from '../../services/lotteriesService';

export interface ISendPrizeUseCase {
  execute(minutes: number): Promise<void>;
}
@injectable()
export class SendPrizeUseCase {
  @inject(TYPES.LotteriesService) private lotteriesService!: ILotteriesService;

  async execute(minutes: number): Promise<void> {
    try {
      let success = false;
      let count = 0;

      while (!success && count < 3) {
        success = await this.lotteriesService.sendPrize(minutes);
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
