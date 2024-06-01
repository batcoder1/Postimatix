import { TYPES } from '../../../../../../infrastructure/ioc2/types';
import { HttpController } from '../../../../HttpController';
import { PingDTO } from './PingDTO';
import { PingUseCase } from './PingUseCase';
import { inject, injectable } from 'inversify';

@injectable()
export class PingController extends HttpController {
  @inject(TYPES.PingUseCase)  private useCase!: PingUseCase;


  public async executeImpl(): Promise<any> {
    const dto = this.req.body as PingDTO;
    const result = await this.useCase.execute(dto);

    return this.ok(this.res, result.value.getValue());
  }
}
