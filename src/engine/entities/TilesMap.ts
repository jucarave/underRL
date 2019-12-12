import Vector3 from 'engine/math/Vector3';
import Camera from 'engine/Camera';
import Geometry from 'engine/Geometry';
import MaterialTileMap from 'engine/materials/MaterialTileMap';
import Renderer from 'engine/Renderer';
import Texture from 'engine/Texture';
import { Config } from 'Config';
import Entity from './Entity';
import { MapTile } from 'engine/system/MapData';

class TilesMap extends Entity {
  public position: Vector3;
  public background: Vector3;
  public color: Vector3;
  public uvs: Array<number>;

  constructor(texture: Texture) {
    super(Vector3.zero);

    this.background = new Vector3(1, 1, 1);
    this.color = new Vector3(1, 1, 1);
    this.uvs = [0, 0, 1, 1];

    this._material = new MaterialTileMap(Renderer.instance, texture);

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

  public setMapTile(tile: MapTile) {
    let rgb = tile.backgroundColor;
    this.background.set(rgb[0], rgb[1], rgb[2]);

    rgb = tile.foreGroundColor;
    this.color.set(rgb[0], rgb[1], rgb[2]);

    this.uvs = tile.uvs;
  }

  public preRender(camera: Camera): void {
    const mat = <MaterialTileMap>this._material;

    mat.renderGeometry(this._geometry);
    mat.renderCameraProperties(camera);
    mat.renderTexture();
  }

  public render(camera: Camera): void {
    const mat = <MaterialTileMap>this._material;

    mat.render(camera, this, this._geometry);
  }
}

export default TilesMap;
