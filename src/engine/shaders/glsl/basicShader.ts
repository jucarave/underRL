import ShaderStruct from '../ShaderStruct';

const basicShader: ShaderStruct = {
  vertexShader: `
    precision mediump float;

    attribute vec3 aPosition;

    uniform mat4 uProjection;
    uniform mat4 uView;
    uniform vec3 uPosition;

    void main(void) {
      vec4 position = vec4(aPosition + uPosition, 1.0);

      gl_Position = uProjection * uView * position;
    }
  `,

  fragmentShader: `
    precision mediump float;

    uniform vec3 uColor;

    void main(void) {
      gl_FragColor = vec4(uColor, 1.0);
    }
  `
};

export default basicShader;
