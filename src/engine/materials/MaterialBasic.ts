import Material from './Material';
import Camera from 'engine/Camera';
import Geometry from 'engine/Geometry';
import Tile from 'engine/Tile';

class MaterialBasic extends Material {
  private _renderGeometry(geometry: Geometry) {
    const gl = this._renderer.gl;
    const shader = this._renderer.shader;

    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vertexBuffer);

    gl.vertexAttribPointer(shader.attributes['aPosition'], 3, gl.FLOAT, false, 3 * 4, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.indexBuffer);
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
  }

  public render(camera: Camera, tile: Tile, geometry: Geometry): void {
    const gl = this._renderer.gl;

    this._renderGeometry(geometry);
    this._renderTileProperties(tile);
    this._renderCameraProperties(camera);

    gl.drawElements(gl.TRIANGLES, geometry.trianglesSize, gl.UNSIGNED_SHORT, 0);
  }
}

export default MaterialBasic;
