import axios from 'axios';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../infrastructure/ioc2/types';
import { Api } from '../../../infrastructure/api';

export interface ICoinGeckoService {
  getCryptoTrends(): Promise<string[]>;
}

@injectable()
export class CoinGeckoService implements ICoinGeckoService {
  @inject(TYPES.Api) private api!: Api;

  constructor() {
  }
  async getCryptoTrends() {
    try {
      const response:any = await this.api.get('https://api.coingecko.com/api/v3/search/trending');
      const trends = response.data.coins.sort((a:any, b: any) => b.item.data.price_change_percentage_24h.usd - a.item.data.price_change_percentage_24h.usd);
      if(!trends){
        return null
      }
      return trends[0].item;
    } catch (error) {
      console.error('Error fetching crypto trends:', error);
      return [];
    }
  }
}
