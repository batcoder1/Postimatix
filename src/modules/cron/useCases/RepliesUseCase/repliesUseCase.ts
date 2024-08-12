import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../infrastructure/ioc2/types';
import { logger } from '../../../../utils/Logger';
import { IOpenAiService } from '../../../common/services/openaiService';
import { IXService } from '../../../twitter/services/xService';

export interface IRepliesUseCase {
  execute(): void;
}

@injectable()
export class RepliesUseCase {
  @inject(TYPES.OpenAiService) private openAiService!: IOpenAiService;
  @inject(TYPES.XService) private xService!: IXService;


  public async execute() {
    try {


      const replies = await this.xService.getReplies();
      for (const reply of replies) {

        await this.xService.replyToTweet(reply.id, reply.author_id)
      }

    } catch (error) {
      logger.error('AutoPostUseCase error: ', error.message);
    }
  }
}
