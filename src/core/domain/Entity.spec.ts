import { expect } from 'chai';
import { Entity } from './Entity';

class TestEntity extends Entity<{ test: string }> {
  constructor() {
    super({ test: 'test' });
  }
}

describe('Entity', () => {
  it('should have an _id property', () => {
    const entity = new TestEntity();
    expect(entity).to.have.property('_id');
  });

  it('should have a props property', () => {
    const entity = new TestEntity();
    expect(entity).to.have.property('props');
    expect(entity.props).to.be.an('object');
    expect(entity.props).to.have.property('test', 'test');
  });

  it('should return false when comparing two entities with different _id', () => {
    const entity1 = new TestEntity();
    const entity2 = new TestEntity();
    const result = entity1.equals(entity2)
    expect(result).to.be.equal(false)
  });

});
