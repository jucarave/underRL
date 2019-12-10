import Entity from './entities/Entity';

abstract class Component {
  protected _entity: Entity;

  public setEntity(entity: Entity): void {
    this._entity = entity;
  }

  public init(): void {}
  public update(): void {}
  public destroy(): void {}

  public get entity(): Entity {
    return this._entity;
  }
}

export default Component;
