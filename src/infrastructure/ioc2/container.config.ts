import { Container } from 'inversify';
import './loader';

import { UseCase } from '../../core/domain';
import {
  Response,
} from '../../core/domain/UseCase';
import { PingController } from '../../core/infrastructure/http/defaults/useCase/getPing';
import { PingUseCase } from '../../core/infrastructure/http/defaults/useCase/getPing/PingUseCase';
import { WebhookController } from '../../modules/twitter/webhook/WebhookController';
import { WebhookUseCase } from '../../modules/twitter/webhook/WebhookUseCase';
import { Api } from '../api';
import { TYPES } from './types';
import { TwitterApi } from 'twitter-api-v2';
import Web3 from 'web3';
import OpenAI from 'openai';
import { RPC_MAINNET, RPC_TESTNET } from '../../constants/constant';
import { SendPrizeUseCase } from '../../modules/cron/useCases/sendPrizesUseCase/sendPrizeUseCase';
import { CreateLotteryUseCase } from '../../modules/cron/useCases/lotteryUseCase/createLotteryUseCase';
import { ILotteryService, LotteryService } from '../../modules/cron/services/lotteryService';
import { IXService, XService } from '../../modules/twitter/services/xService';
import { CronService, ICronService } from '../../modules/cron/services/cronService';
import { ICoinGeckoService, CoinGeckoService } from '../../modules/twitter/services/coingeckoService';
import { OpenAiService } from '../../modules/common/services/openaiService';
import { AutoPostUseCase } from '../../modules/cron/useCases/autoPostUseCase/autoPostUSeCase';
const rpc = process.env.NODE_ENV === 'production' ? RPC_MAINNET : RPC_TESTNET;


const container = new Container();

container.bind<Web3>(TYPES.Web3).toDynamicValue(() => {
  const  web3 = new Web3(rpc)
  return web3;
}).inSingletonScope();

// middleware
/* container.bind<express.RequestHandler>('isAuthenticatedMiddleware').toConstantValue(
  (req: any, res: any, next: any) => isAuthenticatedMiddleware(req, res, next)
);
 */

// Controllers

container.bind<PingController>(TYPES.PingController).to(PingController).inRequestScope();
container.bind<WebhookController>(TYPES.WebhookController).to(WebhookController).inRequestScope();
// UseCases

container.bind<UseCase<any, Response>>(TYPES.PingUseCase).to(PingUseCase).inRequestScope();
container.bind<UseCase<any, Response>>(TYPES.WebhookUseCase).to(WebhookUseCase).inRequestScope();

container.bind(TYPES.SendPrizeUseCase).to(SendPrizeUseCase).inSingletonScope();
container.bind(TYPES.CreateLotteryUseCase).to(CreateLotteryUseCase).inSingletonScope();
container.bind(TYPES.AutoPostUseCase).to(AutoPostUseCase).inSingletonScope();

container.bind<Api>(TYPES.Api).to(Api).inSingletonScope();


// Services

container.bind<ILotteryService>(TYPES.LotteryService).to(LotteryService).inSingletonScope();
container.bind<IXService>(TYPES.XService).to(XService).inSingletonScope();
container.bind<ICoinGeckoService>(TYPES.CoinGeckoService).to(CoinGeckoService).inSingletonScope();
container.bind<OpenAiService>(TYPES.OpenAiService).to(OpenAiService).inSingletonScope();

container.bind<ICronService>(TYPES.CronService).to(CronService).inSingletonScope();


const twitterApi =  new TwitterApi({
  appKey: process.env.X_APP_KEY as string,
  appSecret: process.env.X_APP_SECRET as string,
  accessToken: process.env.X_ACCESS_TOKEN as string,
  accessSecret: process.env.X_ACCESS_SECRET as string,
});
container.bind<TwitterApi>(TYPES.TwitterApi).toConstantValue(twitterApi);

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY2,
  organization: 'org-zILcrNFbTAvNXrxryPMQnBdI',
  project: 'proj_4FJgEgNhwUSLNqad6hVJdSBi',
});
container.bind<OpenAI>(TYPES.OpenAi).toConstantValue(openAi);


export default container;
