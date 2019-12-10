import Vector3 from 'engine/math/Vector3';
import Camera from 'engine/Camera';
import Geometry from 'engine/Geometry';
import MaterialTileMap from 'engine/materials/MaterialTileMap';
import Renderer from 'engine/Renderer';
import Texture from 'engine/Texture';
import { Config } from 'Config';
import Entity from './Entity';

class TilesMap extends Entity {
  public position: Vector3;
  public background: Vector3;
  public color: Vector3;
  public uvs: Array<number>;

  constructor(texture: Texture, position: Vector3) {
    super(position);

    this.position = position;
    this.background = new Vector3(1, 1, 1);
    this.color = new Vector3(1, 1, 1);
    this.uvs = [0, 0, 1, 1];

    this._material = new MaterialTileMap(Renderer.instance, texture);

    this._buildGeometry();
  }

  private hslToRgb(h: number, s: number, l: number) {
    let r, g, b;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      function hue2rgb(p: number, q: number, t: number) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r, g, b];
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
    const mat = <MaterialTileMap>this._material;

    mat.renderGeometry(this._geometry);
    mat.renderCameraProperties(camera);
    mat.renderTexture();

    for (let x = 0; x < Config.SCREEN_WIDTH; x += Config.TILE_WIDTH) {
      for (let y = 0; y < Config.SCREEN_HEIGHT; y += Config.TILE_HEIGHT) {
        this.position.set(x, y, 0);

        let rgb = this.hslToRgb(Math.random(), 1, 0.5);
        this.color.set(rgb[0], rgb[1], rgb[2]);

        rgb = this.hslToRgb(Math.random(), 1, 0.5);
        this.background.set(rgb[0], rgb[1], rgb[2]);

        mat.render(camera, this, this._geometry);
      }
    }
  }
}

export default TilesMap;
