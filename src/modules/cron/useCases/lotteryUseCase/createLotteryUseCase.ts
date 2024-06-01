import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../infrastructure/ioc2/types';
import { logger } from '../../../../utils/Logger';
import { ILotteryService } from '../../services/lotteryService';

export interface ICreateLotteryUseCase {
  execute(minutes: number): Promise<void>;
}
@injectable()
export class CreateLotteryUseCase {
  @inject(TYPES.LotteryService) private lotteryService!: ILotteryService;

  async execute(minutes: number) {
    try {

        await this.lotteryService.createLottery(minutes);

    } catch (error) {
      logger.error('LotteryUseCase error: ', error.message);
    }
  }
}
