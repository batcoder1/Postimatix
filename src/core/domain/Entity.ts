
const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  public readonly props: T;

  constructor(props: T) {
    this.props = props;
  }

 
}
