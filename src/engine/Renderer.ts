import Shader from './shaders/Shader';
import basicShader from './shaders/glsl/basicShader';
import Texture from './Texture';

class Renderer {
  private canvas: HTMLCanvasElement;
  private _gl: WebGLRenderingContext;
  private _basicShader: Shader;
  private _shader: Shader;
  private _lastTexture: string;

  public static instance: Renderer;

  constructor(width: number, height: number, container?: HTMLElement) {
    this._createCanvas(width, height, container);
    this._initGL();
    this._loadBasicShader();

    Renderer.instance = this;
  }

  private _createCanvas(width: number, height: number, container?: HTMLElement) {
    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    if (container) {
      container.appendChild(canvas);
    }

    this.canvas = canvas;
  }

  private _initGL() {
    const gl = this.canvas.getContext('webgl');

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.BLEND);

    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 1.0);

    this._gl = gl;
  }

  private _loadBasicShader() {
    this._basicShader = new Shader(basicShader, this);
    this._basicShader.useProgram();

    this._shader = this._basicShader;
  }

  public clear() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  public bindTexture(texture: Texture, uniform: WebGLUniformLocation) {
    if (this._lastTexture === texture.key) {
      return;
    }

    this.gl.bindTexture(this.gl.TEXTURE_2D, texture.texture);
    this.gl.uniform1i(uniform, 0);
  }

  public get gl(): WebGLRenderingContext {
    return this._gl;
  }

  public get shader(): Shader {
    return this._shader;
  }
}

export default Renderer;
