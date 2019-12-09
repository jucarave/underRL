import Camera from 'engine/Camera';
import Geometry from 'engine/Geometry';
import Renderer from 'engine/Renderer';
import TilesMap from 'engine/TilesMap';

abstract class Material {
  protected _renderer: Renderer;

  constructor(renderer: Renderer) {
    this._renderer = renderer;
  }

  public abstract render(camera: Camera, tile: TilesMap, geometry: Geometry): void;
}

export default Material;
