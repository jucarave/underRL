import Vector3 from 'engine/math/Vector3';
import Material from 'engine/materials/Material';
import Camera from 'engine/Camera';
import Geometry from 'engine/Geometry';
import MaterialBasic from './materials/MaterialBasic';
import Renderer from './Renderer';

class Tile {
  private _material: Material;
  private _geometry: Geometry;

  public position: Vector3;
  public color: Vector3;

  constructor(position: Vector3) {
    this.color = new Vector3(1, 1, 1);
    this.position = position;
    this._material = new MaterialBasic(Renderer.instance);

    this._buildGeometry();
  }

  private _buildGeometry() {
    const geometry = new Geometry();

    geometry.addVertex(0, 32, 0.0);
    geometry.addVertex(16, 32, 0.0);
    geometry.addVertex(0, 0, 0.0);
    geometry.addVertex(16, 0, 0.0);

    geometry.addTriangle(0, 1, 2).addTriangle(1, 3, 2);
    geometry.build(Renderer.instance);

    this._geometry = geometry;
  }

  public render(camera: Camera): void {
    this._material.render(camera, this, this._geometry);
  }
}

export default Tile;
