import { expect } from 'chai';
import { ObjectId } from 'mongodb';
import { getValidObjectId } from './validObjectId';

describe('getValidObjectId', () => {
    it('should return an ObjectID if the id is valid', () => {
        const id = new ObjectId()
        const result = getValidObjectId(id);
        console.log(result)
        expect(result).to.deep.equal(id);
    });

    it('should return an ObjectID if the id is a valid string', () => {
        const id = new ObjectId().toHexString();
        const result = getValidObjectId(id);
        expect(result).to.be.instanceOf(ObjectId);
        expect(result.toHexString()).to.equal(id);
    });
});
