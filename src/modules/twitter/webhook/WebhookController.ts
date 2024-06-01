import {
  inject, injectable
} from 'inversify';

import { HttpController } from '../../../core/infrastructure';
import { TYPES } from '../../../infrastructure/ioc2/types';
import { logger } from '../../../utils/Logger';
import { WebhookErrors } from './WebhookErrors';
import { WebhookUseCase } from './WebhookUseCase';


@injectable()
export class WebhookController extends HttpController {
  @inject(TYPES.WebhookUseCase)  private useCase!: WebhookUseCase;

  constructor() {
    super();
  }

  public async executeImpl(): Promise<any> {
    try {
      const event =  this.req.body.tweet_create_events;

      const result = await this.useCase.execute(event);

      if (result.isRight()) {
        return this.ok(this.res, result.value.getValue());
      }

      const err = result.value;
      logger.error(err.error);
      switch (err.constructor) {
        case WebhookErrors.TokenNotFound:
          return this.badRequest(err.errorValue().message);
        default:
          return this.fail(err.errorValue());
      }
    } catch (error) {
      if (error instanceof Error){
        logger.error(error.message);
        logger.error(`Webhook signature verification failed.`);
        this.res.status(400).send(`Webhook Error: ${error.message}`);
      }
    }
  }
}
