import { TYPES } from '../../../../../../infrastructure/ioc2/types';
import { HttpController } from '../../../../HttpController';
import { PingDTO } from './PingDTO';
import { PingUseCase } from './PingUseCase';
import { inject, injectable } from 'inversify';
import { getClientIp } from '@supercharge/request-ip';
import { logger } from '../../../../../../utils/Logger';

@injectable()
export class PingController extends HttpController {
  @inject(TYPES.PingUseCase)  private useCase!: PingUseCase;


  public async executeImpl(): Promise<any> {
    const dto = this.req.body as PingDTO;
    dto.ip =  getClientIp(this.req) as string;
    logger.info(
      `${'Request '}`,
      this.req.method,
      ` ${this.req.path}`,
      ` params:`,
      this.req.params,
      `query:`,
      this.req.query,
      `body:`,
      this.req.body,
      {
        ip: dto.ip
      }
    );
    dto.ip = getClientIp(this.req) as string;
    const result = await this.useCase.execute(dto);

    return this.ok(this.res, result.value.getValue());
  }
}
