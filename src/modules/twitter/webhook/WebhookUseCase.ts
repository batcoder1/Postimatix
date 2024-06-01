import {
  inject,
  injectable,
} from 'inversify';
import { WebhookDTO } from './WebhookDTO';
import { WebhookErrors } from './WebhookErrors';
import { WebhookResponse } from './WebhookResponse';
import { WebhookMap } from '../mappers/WebhookMap';
import { Webhook } from '../domain/Webhook';
import { TYPES } from '../../../infrastructure/ioc2/types';
import {
  Result,
  right,
  wrong
} from '../../../core/logic';
import { Response } from '../../../core/domain/UseCase';
import { UseCase } from '../../../core/domain';
import { IXService } from '../services/xService';

@injectable()
export class WebhookUseCase implements UseCase<WebhookDTO, Response> {
  @inject(TYPES.XService) private xService!: IXService;

  public async execute(req: any): Promise<Response> {

    const webhookMap = WebhookMap.toBackend(req);
    const webhookOrError = Webhook.New(webhookMap);

    if (webhookOrError.isFailure) {
      return wrong(
        new WebhookErrors.UnknownError(webhookOrError.error as string)
      ) as Response;
    }


    try {
      const r:any = await this.xService.replyToTweet(webhookMap.originalTweetId, webhookMap.user)

      const result: WebhookResponse = {
        data: {
          message: 'Webhook successfully completed',
          transaction: r,
        },
      };

      return right(Result.OK<any>(result)) as Response;
    } catch (e) {
      return wrong(new WebhookErrors.UnknownError(e as string)) as Response;
    }
  }
}
