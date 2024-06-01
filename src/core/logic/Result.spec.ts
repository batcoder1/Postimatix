import { expect } from 'chai';

import { Result } from './Result';
import { ResultError } from '../../tests/fixtures/Result';
describe('#getValue', () => {
  it('should return the value of a successful result', () => {
    const result = new Result<number>(true, undefined, 10);
    expect(result.getValue()).to.equal(10);
  });

  it('should throw an error for a failed result', () => {
    const result = new Result<number>(false, 'Error');
    expect(() => result.getValue()).to.throw(ResultError.ErrorValue);
  });
});
