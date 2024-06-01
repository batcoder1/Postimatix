import config from 'config';
import ioredis from 'ioredis';

import { injectable } from 'inversify';
import { RedisSalesUseCase } from '../../modules/main/handlers/redisMessageHandler/RedisSalesUseCase';
import { RedisTicketValidationUseCase } from '../../modules/main/handlers/redisMessageHandler/RedisTicketValidationUseCase';
import container from '../ioc2/container.config';
import { logger } from '../logger';
import { RedisStore } from './RedisStore';


// eslint-disable-next-line no-shadow
enum RedisError {
  ConnectionError = 'Unable to connect to redis',
}

@injectable()
export class RedisConnect {

  private publisher: RedisStore;
  private subscriber: RedisStore;
  constructor() {
    try {
      const redisConfig: any = config.get('redis.config');
      const redisChannelSubscribe: string = config.get('redis.channel.subscribe');
      const sub = new ioredis(redisConfig);
      this.subscriber = new RedisStore(sub);

      const pub = new ioredis(redisConfig);
      this.publisher = new RedisStore(pub);
      const redisSalesUseCase = container.resolve<RedisSalesUseCase>(RedisSalesUseCase);
      const redisTicketValidation =container.resolve<RedisTicketValidationUseCase>(RedisTicketValidationUseCase);

      const channels: string[] = [redisChannelSubscribe];
      void this.subscriber.subscribe(channels);
      logger.info(`[RedisConnect] Connected successful on ${redisConfig.host}:${redisConfig.port}`);

      sub.on('message', async (channel, message) => {
        logger.info(`Received ${message} from channel ${channel}`);
        const messageJson = JSON.parse(message);
        if (messageJson.id !== undefined) {
          await redisSalesUseCase.execute(messageJson);
        }
        if (messageJson.customerId !== undefined) {
          await redisTicketValidation.execute(messageJson);
        }
      });
    } catch (e) {
      logger.error(`[RedisConnect] ${RedisError.ConnectionError}`, e);
      throw new Error(RedisError.ConnectionError);
    }
  }
  publish(channel: string, message: any){
    return this.publisher.publish(channel,message)
  }
  getSubscriber(){
    return this.subscriber
  }
}

