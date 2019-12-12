declare const Stats: any;

import Renderer from 'engine/Renderer';
import { Config } from 'Config';
import Texture from 'engine/Texture';
import Scene from 'engine/Scene';
import { TestMap } from 'data/TestMap';

const stats = new Stats();

class Game {
  init() {
    new Renderer(Config.SCREEN_WIDTH, Config.SCREEN_HEIGHT, document.getElementById('divGame'));

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
    const scene = new Scene();

    scene.setMapData(TestMap);
    scene.init();

    this.loopRender(scene);
  }

  private loopRender(scene: Scene) {
    stats.begin();

    scene.render();

    stats.end();

    requestAnimationFrame(() => this.loopRender(scene));
  }
}

window.onload = () => {
  const game = new Game();
  game.init();
};
