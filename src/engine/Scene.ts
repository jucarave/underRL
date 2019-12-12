import Entity from './entities/Entity';
import TilesMap from './entities/TilesMap';
import Texture from './Texture';
import Camera from './Camera';
import { Config } from 'Config';
import MapData from './system/MapData';
import Renderer from './Renderer';

class Scene {
  private _entities: Array<Entity>;
  private _tileMap: TilesMap;
  private _inited: boolean;
  private _camera: Camera;
  private _mapData: MapData;

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

  public setMapData(map: MapData) {
    this._mapData = map;
  }

  public updateTileMap(): void {
    const tm = this._tileMap;

    Renderer.instance.clear();
    tm.preRender(this._camera);

    for (let x = 0; x < Config.SCREEN_WIDTH; x += Config.TILE_WIDTH) {
      for (let y = 0; y < Config.SCREEN_HEIGHT; y += Config.TILE_HEIGHT) {
        const tile = this._mapData.map[y / Config.TILE_HEIGHT][x / Config.TILE_WIDTH];
        if (tile === 0) {
          continue;
        }

        tm.position.set(x, Config.SCREEN_HEIGHT - y - Config.TILE_HEIGHT, 0);

        const pal = this._mapData.palette[tile];
        tm.setMapTile(pal);

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
