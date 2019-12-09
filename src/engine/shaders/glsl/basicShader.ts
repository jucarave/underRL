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
    uniform vec3 uColor;
    uniform vec4 uUVs;

    varying vec2 vTexCoords;

    void main(void) {
      vec2 coords = mod(vTexCoords * uUVs.zw + uUVs.xy, 1.0);

      gl_FragColor = texture2D(uTexture, coords) * vec4(uColor, 1.0);
    }
  `
};

export default basicShader;
