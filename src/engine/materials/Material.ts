import Camera from 'engine/Camera';
import Geometry from 'engine/Geometry';
import Renderer from 'engine/Renderer';
import Tile from 'engine/Tile';

abstract class Material {
  protected _renderer: Renderer;

  constructor(renderer: Renderer) {
    this._renderer = renderer;
  }

  public abstract render(camera: Camera, tile: Tile, geometry: Geometry): void;
}

export default Material;
