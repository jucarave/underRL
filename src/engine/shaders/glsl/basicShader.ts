import ShaderStruct from '../ShaderStruct';

const basicShader: ShaderStruct = {
  vertexShader: `
    precision mediump float;

    attribute vec3 aPosition;
    attribute vec2 aTexCoords;

    uniform mat4 uProjection;
    uniform mat4 uView;
    uniform vec3 uPosition;

    varying vec2 vTexCoords;

    void main(void) {
      vec4 position = vec4(aPosition + uPosition, 1.0);

      gl_Position = uProjection * uView * position;

      vTexCoords = aTexCoords;
    }
  `,

  fragmentShader: `
    precision mediump float;

    uniform sampler2D uTexture;
    uniform vec3 uBackgroundColor;
    uniform vec3 uForegroundColor;
    uniform vec4 uUVs;

    varying vec2 vTexCoords;

    void main(void) {
      vec2 coords = mod(vTexCoords * uUVs.zw + uUVs.xy, 1.0);

      vec4 tex = texture2D(uTexture, coords);
      gl_FragColor = vec4(uBackgroundColor, 1.0) * (1.0 - tex.a) + vec4(uForegroundColor, 1.0) * tex.a;
    }
  `
};

export default basicShader;
