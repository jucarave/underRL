import Entity from './entities/Entity';
import TilesMap from './entities/TilesMap';
import Texture from './Texture';
import Camera from './Camera';
import { Config } from 'Config';

class Scene {
  private _entities: Array<Entity>;
  private _tileMap: TilesMap;
  private _inited: boolean;
  private _camera: Camera;

  constructor() {
    this._entities = [];

    const texture = Texture.getTexture('tileset');
    this._tileMap = new TilesMap(texture);
    this._tileMap.uvs = texture.getUVS(0, 0, 16, 32);

    this._camera = Camera.createOrthographic(Config.SCREEN_WIDTH, Config.SCREEN_HEIGHT, 0.1, 100);
    this._camera.position.set(Config.SCREEN_WIDTH / 2.0, Config.SCREEN_HEIGHT / 2.0, 5);

    this._inited = false;
  }

  public addEntity(entity: Entity): Scene {
    this._entities.push(entity);

    entity.setScene(this);

    if (this._inited) {
      entity.init();
    }

    return this;
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

  public updateTileMap(): void {
    const tm = this._tileMap;

    tm.preRender(this._camera);

    for (let x = 0; x < Config.SCREEN_WIDTH; x += Config.TILE_WIDTH) {
      for (let y = 0; y < Config.SCREEN_HEIGHT; y += Config.TILE_HEIGHT) {
        tm.position.set(x, y, 0);

        let rgb = this.hslToRgb(Math.random(), 1, 0.5);
        tm.color.set(rgb[0], rgb[1], rgb[2]);

        rgb = this.hslToRgb(Math.random(), 1, 0.5);
        tm.background.set(rgb[0], rgb[1], rgb[2]);

        tm.render(this._camera);
      }
    }
  }

  public init(): void {
    if (this._inited) {
      return;
    }

    this._entities.forEach((entity: Entity) => {
      entity.init();
    });

    this._inited = true;
  }

  public render(): void {
    this._entities.forEach((entity: Entity) => {
      entity.update();
      entity.render(this._camera);
    });

    this.updateTileMap();
  }
}

export default Scene;
