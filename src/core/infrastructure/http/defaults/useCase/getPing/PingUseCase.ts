import { injectable } from 'inversify';
import { UseCase } from '../../../../../domain';
import {
  Either,
  GenericErrors,
  Result,
  right,
} from '../../../../../logic';
import { PingDTO } from './PingDTO';
import { PingResponse } from './PingResponse';
import { Response } from '../../../../../domain/UseCase';


@injectable()
export class PingUseCase implements UseCase<PingDTO, Response> {

  // eslint-disable-next-line @typescript-eslint/require-await
  public async execute(req: PingDTO): Promise<Response> {
    return right(
      Result.OK<PingResponse>({
        name: process.env.npm_package_name as string,
        version: process.env.npm_package_version as string,
        result: 'OK'
      })
    ) as Response;
  }
}
