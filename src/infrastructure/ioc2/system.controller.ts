import { inject } from 'inversify';
import { controller, interfaces, request, response, httpGet } from 'inversify-express-utils';
import { PingController } from '../../core/infrastructure/http/defaults/useCase/getPing/PingController';
import { TYPES } from './types';

import {
  Request,
  Response
} from 'express';

@controller('/ping')
export class SystemController implements interfaces.Controller {
  @inject(TYPES.PingController) private pingController!: PingController;

  @httpGet('/')
  public async ping(@request() req: Request, @response() res: Response) {
      await this.pingController.execute(req, res);
  }

}
