import Material from './Material';
import Camera from 'engine/Camera';
import Geometry from 'engine/Geometry';
import Tile from 'engine/Tile';
import Texture from 'engine/Texture';
import Renderer from 'engine/Renderer';

class MaterialBasic extends Material {
  private _texture: Texture;

  private static _lastGeometry: Geometry = null;

  constructor(renderer: Renderer, texture: Texture) {
    super(renderer);

    this._texture = texture;
  }

  private _renderGeometry(geometry: Geometry) {
    if (MaterialBasic._lastGeometry === geometry) {
      return;
    }

    const gl = this._renderer.gl;
    const shader = this._renderer.shader;

    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vertexBuffer);

    gl.vertexAttribPointer(shader.attributes['aPosition'], 3, gl.FLOAT, false, 5 * 4, 0);
    gl.vertexAttribPointer(shader.attributes['aTexCoords'], 2, gl.FLOAT, false, 5 * 4, 3 * 4);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.indexBuffer);

    MaterialBasic._lastGeometry = geometry;
  }

  private _renderCameraProperties(camera: Camera) {
    const gl = this._renderer.gl;
    const shader = this._renderer.shader;

    gl.uniformMatrix4fv(shader.uniforms['uProjection'], false, camera.projection.data);
    gl.uniformMatrix4fv(shader.uniforms['uView'], false, camera.viewMatrix.data);
  }

  private _renderTileProperties(tile: Tile) {
    const gl = this._renderer.gl;
    const shader = this._renderer.shader;
    const p = tile.position;
    const c = tile.color;

    gl.uniform3f(shader.uniforms['uPosition'], p.x, p.y, p.z);
    gl.uniform3f(shader.uniforms['uColor'], c.x, c.y, c.z);
    gl.uniform4fv(shader.uniforms['uUVs'], tile.uvs);
  }

  private _renderTexture() {
    const shader = this._renderer.shader;

    this._renderer.bindTexture(this._texture, shader.uniforms['uTexture']);
  }

  public render(camera: Camera, tile: Tile, geometry: Geometry): void {
    const gl = this._renderer.gl;

    this._renderGeometry(geometry);
    this._renderTileProperties(tile);
    this._renderCameraProperties(camera);
    this._renderTexture();

    gl.drawElements(gl.TRIANGLES, geometry.trianglesSize, gl.UNSIGNED_SHORT, 0);
  }
}

export default MaterialBasic;
