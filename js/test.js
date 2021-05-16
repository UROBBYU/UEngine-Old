function main() {
  gl = display.getContext('webgl2');
  if (!gl)
    return new Error("Couldn't initialize WebGL");

  var vertexShaderSource = `#version 300 es
in vec2 a_position;

uniform vec2 u_resolution;

out vec2 v_texCoord;

void main() {
  v_texCoord = a_position / u_resolution;
  gl_Position = vec4(a_position / u_resolution * 2. - 1., 0, 1);
  gl_Position.y = -gl_Position.y;
}
`;
  var fragmentShaderSource = `#version 300 es
precision mediump float;

in vec2 v_texCoord;

uniform sampler2D u_texture;

out vec4 fragColor;

void main() {
  vec2 texSize = vec2(textureSize(u_texture, 0));
  float ratio = texSize.y / texSize.x;
  fragColor = texture(u_texture, vec2(v_texCoord.x * ratio, v_texCoord.y));
}
`;

  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  gl.clearColor(0, 0, 0, 1);

  positionBuffer = gl.createBuffer();

  writeBuffer(gl, positionBuffer, 'a_position', 2, [
    0, 0,
    1000, 0,
    0, 1000,
    0, 1000,
    1000, 0,
    1000, 1000
  ]);

  texture1 = gl.createTexture();
  var image1 = new Image();
  image1.onload = () => {
    writeTexture(gl, texture1, 0, image1);
    render();
  }
  image1.src = './img/Backgrounds/Background1.jpg';

  texture2 = gl.createTexture();
  var image2 = new Image();
  image2.onload = () => {
    writeTexture(gl, texture2, 1, image2);
  }
  image2.src = './img/Backgrounds/Background2.jpg';

  texture3 = gl.createTexture();
  var image3 = new Image();
  image3.onload = () => {
    writeTexture(gl, texture3, 2, image3);
  }
  image3.src = './img/Backgrounds/Background3_back.jpg';
}

function render() {
  gl.useProgram(program);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT);
  writeUniformF(gl, 'u_resolution', gl.canvas.width, gl.canvas.height);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  requestAnimationFrame(render);
}

function writeTexture(gl, texture, index, image) {
  gl.activeTexture(gl.TEXTURE0 + index);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
}

function writeBuffer(gl, buffer, name, size, data) {
  var location = gl.getAttribLocation(program, name);
  gl.enableVertexAttribArray(location);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
}

function writeUniformF(gl, name, ...data) {
  var size = data.length;
  var location = gl.getUniformLocation(program, name);
  switch (size) {
    case 1:
      gl.uniform1fv(location, data);
      break;
    case 2:
      gl.uniform2fv(location, data);
      break;
    case 3:
      gl.uniform3fv(location, data);
      break;
    case 4:
      gl.uniform4fv(location, data);
      break;
    default:
      return new Error('Invalid data');
  }
}

function writeUniformI(gl, name, ...data) {
  var size = data.length;
  var location = gl.getUniformLocation(program, name);
  switch (size) {
    case 1:
      gl.uniform1iv(location, data);
      break;
    case 2:
      gl.uniform2iv(location, data);
      break;
    case 3:
      gl.uniform3iv(location, data);
      break;
    case 4:
      gl.uniform4iv(location, data);
      break;
    default:
      return new Error('Invalid data');
  }
}

function writeUniformUI(gl, name, ...data) {
  var size = data.length;
  var location = gl.getUniformLocation(program, name);
  switch (size) {
    case 1:
      gl.uniform1uiv(location, data);
      break;
    case 2:
      gl.uniform2uiv(location, data);
      break;
    case 3:
      gl.uniform3uiv(location, data);
      break;
    case 4:
      gl.uniform4uiv(location, data);
      break;
    default:
      return new Error('Invalid data');
  }
}

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    return shader;

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

main();
