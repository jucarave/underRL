declare const Stats: any;

import Renderer from 'engine/Renderer';
import Camera from 'engine/Camera';
import Tile from 'engine/Tile';
import Vector3 from 'engine/math/Vector3';
import { Config } from 'Config';
import Texture from 'engine/Texture';

const stats = new Stats();

class Game {
  private _renderer: Renderer;

  init() {
    this._renderer = new Renderer(Config.SCREEN_WIDTH, Config.SCREEN_HEIGHT, document.getElementById('divGame'));

    stats.showPanel(1);
    document.body.appendChild(stats.dom);

    this._loadResources();
  }

  private _loadResources() {
    new Texture('tileset', 'img/tileset.png');

    const wait = () => {
      if (Texture.areTexturesReady()) {
        this.renderTestScene();
      } else {
        requestAnimationFrame(wait);
      }
    };

    wait();
  }

  private renderTestScene() {
    const camera = Camera.createOrthographic(Config.SCREEN_WIDTH, Config.SCREEN_HEIGHT, 0.1, 100.0);
    camera.position.set(Config.SCREEN_WIDTH / 2.0, Config.SCREEN_HEIGHT / 2.0, 5);

    const texture = Texture.getTexture('tileset');

    const tile = new Tile(texture, Vector3.zero);
    tile.uvs = texture.getUVS(32, 0, 16, 32);

    this.loopRender(tile, camera);
  }

  private loopRender(tile: Tile, camera: Camera) {
    stats.begin();

    this._renderer.clear();

    for (let x = 0; x < Config.SCREEN_WIDTH; x += Config.TILE_WIDTH) {
      for (let y = 0; y < Config.SCREEN_HEIGHT; y += Config.TILE_HEIGHT) {
        tile.position.set(x, y, 0);
        tile.color.set(Math.random(), Math.random(), Math.random());
        tile.render(camera);
      }
    }

    stats.end();

    requestAnimationFrame(() => this.loopRender(tile, camera));
  }
}

window.onload = () => {
  const game = new Game();
  game.init();
};
