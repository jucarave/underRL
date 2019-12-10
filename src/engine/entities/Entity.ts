import Vector3 from 'engine/math/Vector3';
import Geometry from 'engine/Geometry';
import Material from 'engine/materials/Material';
import Camera from 'engine/Camera';

class Entity {
  protected _geometry: Geometry;
  protected _material: Material;

  public position: Vector3;

  constructor(position: Vector3, geometry?: Geometry, material?: Material) {
    this.position = position;
    this._geometry = geometry;
    this._material = material;
  }

  public render(camera: Camera) {
    this._material.render(camera, this, this._geometry);
  }
}

export default Entity;
