import { inject, injectable } from 'inversify';
import { Api } from '../../../infrastructure/api';
import { TYPES } from '../../../infrastructure/ioc2/types';
import { logger } from '../../../utils/Logger';

export interface ILinkedinService {
  createPost(post: string, imageUrl?: string): Promise<any>;
}

@injectable()
export class LinkedinService implements ILinkedinService {
  @inject(TYPES.Api) private api!: Api;

  public async createPost(post: string, imageUrl?: string): Promise<any> {
    try {
      const url = 'https://api.linkedin.com/rest/posts';

      const postData = {
        author: 'urn:li:organization:104031591',
        commentary: post,
        visibility: 'PUBLIC',
        distribution: {
          feedDistribution: 'MAIN_FEED',
          targetEntities: [],
          thirdPartyDistributionChannels: [],
        },

        lifecycleState: 'PUBLISHED',
        isReshareDisabledByAuthor: false,
      };

      const configRequest = {
        headers: {
          Authorization: `Bearer ${process.env.LINKEDIN_TOKEN as string}`,
          'X-Restli-Protocol-Version': '2.0.0',
          'LinkedIn-Version': 202401,
          'Content-Type': 'application/json',
        },
        data: postData
      }
      const response = await this.api.post(url, postData, configRequest);

      logger.info('Post created:', response);
      return true;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
}
