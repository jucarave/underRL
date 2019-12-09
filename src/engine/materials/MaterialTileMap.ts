import Material from './Material';
import Camera from 'engine/Camera';
import Geometry from 'engine/Geometry';
import TilesMap from 'engine/TilesMap';
import Texture from 'engine/Texture';
import Renderer from 'engine/Renderer';

class MaterialTileMap extends Material {
  private _texture: Texture;

  constructor(renderer: Renderer, texture: Texture) {
    super(renderer);

    this._texture = texture;
  }

  public renderGeometry(geometry: Geometry) {
    const gl = this._renderer.gl;
    const shader = this._renderer.shader;

    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vertexBuffer);

    gl.vertexAttribPointer(shader.attributes['aPosition'], 3, gl.FLOAT, false, 5 * 4, 0);
    gl.vertexAttribPointer(shader.attributes['aTexCoords'], 2, gl.FLOAT, false, 5 * 4, 3 * 4);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.indexBuffer);
  }

  public renderCameraProperties(camera: Camera) {
    const gl = this._renderer.gl;
    const shader = this._renderer.shader;

    gl.uniformMatrix4fv(shader.uniforms['uProjection'], false, camera.projection.data);
    gl.uniformMatrix4fv(shader.uniforms['uView'], false, camera.viewMatrix.data);
  }

  private _renderTileProperties(tile: TilesMap) {
    const gl = this._renderer.gl;
    const shader = this._renderer.shader;
    const p = tile.position;
    const c = tile.color;

    gl.uniform3f(shader.uniforms['uPosition'], p.x, p.y, p.z);
    gl.uniform3f(shader.uniforms['uColor'], c.x, c.y, c.z);
    gl.uniform4fv(shader.uniforms['uUVs'], tile.uvs);
  }

  public renderTexture() {
    const shader = this._renderer.shader;

    this._renderer.bindTexture(this._texture, shader.uniforms['uTexture']);
  }

  public render(_camera: Camera, tile: TilesMap, geometry: Geometry): void {
    const gl = this._renderer.gl;

    this._renderTileProperties(tile);

    gl.drawElements(gl.TRIANGLES, geometry.trianglesSize, gl.UNSIGNED_SHORT, 0);
  }
}

export default MaterialTileMap;
