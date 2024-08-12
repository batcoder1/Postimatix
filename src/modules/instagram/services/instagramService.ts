import { inject, injectable } from 'inversify';
import { Api } from '../../../infrastructure/api';
import { TYPES } from '../../../infrastructure/ioc2/types';
import { logger } from '../../../utils/Logger';

const apiVersion = process.env.INSTAGRAM_API_VERSION as string;
const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN as string;
const igUserId = 'web3software';
export interface IInstagramService {
  createPost(post: string, imageUrl?: string): Promise<any>;
}

@injectable()
export class InstagramService implements IInstagramService {
  @inject(TYPES.Api) private api!: Api;



  public async createPost(post: string,imageUrl: string): Promise<any> {
    try {
      const userId = await this.getMe();
      const url = `https://graph.facebook.com/${apiVersion}/${igUserId}/media?image_url=${imageUrl}&caption=${post}
      &access_token=${accessToken}`;
      const configRequest = {
        headers: {
          Authorization: `OAuth ${accessToken}`,
          'Content-Type': 'application/json',
        },
      };
      const response:any = await this.api.post(url, configRequest);

      if(!response.data && !response.data.id){
        return null;
      }
      this.publish(response.data.id);

      return response.data;
    } catch (error) {
      logger.error(error.response.data.error.message);
      return null;
    }
  }

  private async publish(imageId: string): Promise<any> {
    try {
      const url = `https://graph.facebook.com/${apiVersion}/${igUserId}/media_publish?creation_id=${imageId}&access_token=${accessToken}`;
      const configRequest = {
        headers: {
          Authorization: `OAuth ${accessToken}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await this.api.post(url, configRequest);

      return response.data;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
  private async getMe(): Promise<any> {
    try {
      const url = `https://graph.facebook.com/${apiVersion}/me/accounts?access_token=${accessToken}`;
      const configRequest = {
        headers: {
          Authorization: `OAuth ${accessToken}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await this.api.get(url, configRequest);

      return response.data;
    } catch (error) {
      logger.error(error.response.data.error.message);
      return null;
    }
  }
}
