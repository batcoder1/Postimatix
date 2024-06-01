import { en } from './messages/en';
import { es } from './messages/es';

export interface IUseCaseErrorError {
  message: IErrorMessage;
  code: string;
}
export interface IErrorMessage{
  es: string,
  en: string,
}

export abstract class UseCaseError implements IUseCaseErrorError {
  public readonly message: IErrorMessage;
  public readonly code: string;

  constructor(data: any) {
    this.message = data.message;
    this.code = data.code;
  }


  public static CANNOT_READ_DOC: UseCaseError = Object.freeze({
    code: "API000",
    message: {
      en: en[0],
      es: es[0],
    }
  })
  public static TOKEN_NOT_FOUND: UseCaseError = Object.freeze({
    code: "API001",
    message: {
      en: en[0],
      es: es[0],
    }
  })
}
