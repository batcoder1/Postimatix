// eslint-disable-next-line max-classes-per-file
import { Result } from './Result';
import { UseCaseError } from './UseCaseError';

// tslint:disable-next-line: no-namespace
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace GenericErrors {
  export class UnexpectedError extends Result<UseCaseError> {
    constructor(err: any) {
      super(false, {
        message: {
          en:'Unexpected error occurred.',
          es: 'Ha ocurrido un error inesperado'
        },
        code: 'API000',
        error: err
      } as UseCaseError);
    }

    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }

  export class InvalidIdError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: {
          en:'Invalid ObjectId',
          es: 'Invalid ObjectId'
        },
        code: 'API000',

      } as UseCaseError);
    }
  }

}

