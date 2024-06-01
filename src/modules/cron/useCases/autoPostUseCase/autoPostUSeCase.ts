import { inject, injectable } from 'inversify';
import { IOpenAiService } from '../../../common/services/openaiService';
import { IXService } from '../../../twitter/services/xService';
import { TYPES } from '../../../../infrastructure/ioc2/types';
import { logger } from '../../../../utils/Logger';

export interface IAutoPostUseCase {
  execute(): void;
}

@injectable()
export class AutoPostUseCase {
  @inject(TYPES.OpenAiService) private openAiService!: IOpenAiService;
  @inject(TYPES.XService) private xService!: IXService;


  public async execute() {
    try {
      //  const trending = await this.xService.getCryptoTrends();
      /*   const posts = [];
       const accounts = ['telo_official', 'cryptonews', 'CriptoNoticias'];
      for (const account of accounts) {

        const lastPost = await this.xService.getTweetsByAccount(account);
        posts.push(lastPost)
      }  */
      const post = await this.openAiService.prompt('crypto');
      const imageUrl = await this.openAiService.generateImage(post);


      await this.xService.createPost(post, imageUrl);
    } catch (error) {
      logger.error('AutoPostUseCase error: ', error.message);
    }
  }
}
