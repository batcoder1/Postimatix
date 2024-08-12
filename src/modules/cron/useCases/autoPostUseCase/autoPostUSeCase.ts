import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../infrastructure/ioc2/types';
import { logger } from '../../../../utils/Logger';
import { IOpenAiService } from '../../../common/services/openaiService';
import { IXService } from '../../../twitter/services/xService';
import { ILinkedinService } from '../../../linkedin/services/linkedinService';
import { IInstagramService } from '../../../instagram/services/instagramService';

export interface IAutoPostUseCase {
  execute(): void;
}

@injectable()
export class AutoPostUseCase {
  @inject(TYPES.OpenAiService) private openAiService!: IOpenAiService;
  @inject(TYPES.XService) private xService!: IXService;
  @inject(TYPES.LinkedinService) private linkedinService!: ILinkedinService;
  @inject(TYPES.InstagramService) private instagramService!: IInstagramService;

  public async execute() {
    try {
      //  const trending = await this.xService.getCryptoTrends();
      const posts = [];
     /*  const accounts = ['telo_official', 'cryptonews', 'CriptoNoticias'];
      for (const account of accounts) {
        const lastPost = await this.xService.getTweetsByAccount(account);
        posts.push(lastPost);
      } */
      let post;
      const randomNumber = Math.random();

      if (randomNumber < 0.5) {
        post = await this.openAiService.prompt();
      } else {
        post = await this.openAiService.trendingPrompt();
      }
      if(post){
        const imageUrl = await this.openAiService.generateImage(post);

        await this.instagramService.createPost(post, imageUrl);
        // await this.xService.createPost(post, imageUrl);
      }

      // await this.linkedinService.createPost(post, imageUrl);
    } catch (error) {
      logger.error('AutoPostUseCase error: ', error.message);
    }
  }
}
