import { expect } from 'chai';

import { Validator } from './';
import { en } from './messages/en';
import { es } from './messages/es';
import { UseCaseError } from './UseCaseError';
import { IValidatorResult } from './Validator';

describe('Core:', () => {
  describe('UseCaseError', () => {
    it('error CANNOT_READ_DOC should be equal', () => {
      const error: UseCaseError = {
        code: 'API000',
        message: {
         en: 'The Document cannot be read',
         es: 'El documento no puede ser leído',

        }
      }
      const r = UseCaseError.CANNOT_READ_DOC;

      expect(r).to.be.deep.equals(error);
    });

  })

});
