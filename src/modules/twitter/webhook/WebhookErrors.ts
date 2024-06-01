/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable max-classes-per-file */

import { Result, UseCaseError } from '../../../core/logic';


export namespace WebhookErrors {
  export class UnknownError extends Result<UseCaseError> {
    constructor(id: string) {
      super(false, {
        code: 'API001',
        message: {
          en: `Unknown Error: ${id}`,
          es: `Error desconocido: ${id}`,
        }
      });
    }
  }
  export class TokenNotFound extends Result<UseCaseError> {
    constructor() {
      super(false, UseCaseError.TOKEN_NOT_FOUND);
    }
  }

  export class errorDoingWebhook extends Result<UseCaseError> {
    constructor() {
      super(false, UseCaseError.ERROR_GETTING_XLM_PRICE)
    }
  }
  export class invalidDestinationPublicKey extends Result<UseCaseError> {
    constructor() {
      super(false, UseCaseError.INVALID_DESTINATION);
    }
  }
}
