import Vector3 from 'engine/math/Vector3';
import Material from 'engine/materials/Material';
import Camera from 'engine/Camera';
import Geometry from 'engine/Geometry';
import MaterialBasic from './materials/MaterialBasic';
import Renderer from './Renderer';
import Texture from './Texture';
import { Config } from 'Config';

class Tile {
  private _material: Material;
  private _geometry: Geometry;

  public position: Vector3;
  public color: Vector3;
  public uvs: Array<number>;

  constructor(texture: Texture, position: Vector3) {
    this.position = position;
    this.color = new Vector3(1, 1, 1);
    this.uvs = [0, 0, 1, 1];

    this._material = new MaterialBasic(Renderer.instance, texture);

    this._buildGeometry();
  }

  private _buildGeometry() {
    const geometry = new Geometry();

    geometry.addVertex(0.0, 0.0, 0.0).addTexCoord(0, 1);
    geometry.addVertex(Config.TILE_WIDTH, 0.0, 0.0).addTexCoord(1, 1);
    geometry.addVertex(0.0, Config.TILE_HEIGHT, 0.0).addTexCoord(0, 0);
    geometry.addVertex(Config.TILE_WIDTH, Config.TILE_HEIGHT, 0.0).addTexCoord(1, 0);

    geometry.addTriangle(0, 1, 2).addTriangle(1, 3, 2);
    geometry.build(Renderer.instance);

    this._geometry = geometry;
  }

  public render(camera: Camera): void {
    this._material.render(camera, this, this._geometry);
  }
}

export default Tile;
