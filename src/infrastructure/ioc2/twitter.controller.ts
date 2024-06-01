import { inject } from 'inversify';
import { controller, httpGet, httpPost, interfaces, request, response } from 'inversify-express-utils';
import { WebhookController } from '../../modules/twitter/webhook/WebhookController';
import { TYPES } from './types';
import {
  Request,
  Response
} from 'express';
import crypto from 'crypto';
@controller('/twitter')
export class MainController implements interfaces.Controller {
 @inject(TYPES.WebhookController) private webhookController!: WebhookController;

  @httpPost('/webhook',)
  public async replyPost(@request() req: Request, @response() res: Response) {
    await this.webhookController.execute(req, res);
  }
  @httpGet('/webhook',)
  public async verify(@request() req: Request, @response() res: Response) {
    const crc_token = req.query.crc_token as string;
    const consumerSecret =process.env.X_APP_SECRET as string;
    if (crc_token) {
      const hash = crypto.createHmac('sha256', consumerSecret).update(crc_token).digest('base64');
      res.status(200).send({ response_token: `sha256=${hash}` });
    } else {
      res.status(400).send('Error: crc_token missing');
    }
  }


}
