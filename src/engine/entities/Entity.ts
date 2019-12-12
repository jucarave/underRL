import Vector3 from 'engine/math/Vector3';
import Geometry from 'engine/Geometry';
import Material from 'engine/materials/Material';
import Camera from 'engine/Camera';
import Component from 'engine/Component';
import Scene from 'engine/Scene';

class Entity {
  protected _geometry: Geometry;
  protected _material: Material;
  protected _components: Array<Component>;
  protected _scene: Scene;
  protected _inited: boolean;

  public position: Vector3;

  constructor(position: Vector3, geometry?: Geometry, material?: Material) {
    this.position = position;
    this._geometry = geometry;
    this._material = material;
    this._components = [];
    this._inited = false;
  }

  public addComponent(component: Component): Entity {
    this._components.push(component);

    component.setEntity(this);

    if (this._inited) {
      component.init();
    }

    return this;
  }

  public setScene(scene: Scene): void {
    this._scene = scene;
  }

  public init(): void {
    if (this._inited) {
      return;
    }

    this._components.forEach((component: Component) => {
      component.init();
    });

    this._inited = true;
  }

  public destroy(): void {
    this._components.forEach((component: Component) => {
      component.destroy();
    });

    this._components = null;
  }

  public update(): Entity {
    this._components.forEach((component: Component) => {
      component.update();
    });

    return this;
  }

  public render(camera: Camera): void {
    if (!this._material || !this._geometry) {
      return;
    }

    this._material.render(camera, this, this._geometry);
  }
}

export default Entity;
