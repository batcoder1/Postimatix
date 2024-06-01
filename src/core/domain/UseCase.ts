import { Either, GenericErrors, Result } from '../logic';


export type Response = Either<
  GenericErrors.UnexpectedError | Result<any>,
  Result<void>
>;
export interface UseCase<IRequest, IResponse> {
  execute(request?: IRequest | void): Promise<IResponse>;
}
