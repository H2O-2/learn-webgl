// Vertex shader program
var VSHADER_SOURCE =
'attribute vec4 a_Position;\n' +
// 'uniform float u_CosB, u_SinB;\n' +
'uniform mat4 u_xformMatrix;\n' +
'void main() {\n' +
'   gl_Position = u_xformMatrix * a_Position;\n' +
// '   gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;\n' +
// '   gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;\n' +
// '   gl_Position.z = a_Position.z;\n' +
// '   gl_Position.w = a_Position.w;\n' +
'}\n';

// Fragment shader program
var FSHADER_SOURCE =
'void main() {\n' +
'  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
'}\n';

var Tx = 0.5, Ty = 0.5, Tz = 0.0;
var angle = 180.0;

function main() {
// Retrieve <canvas> element
var canvas = document.getElementById('webgl');

// Get the rendering context for WebGL
var gl = getWebGLContext(canvas);
if (!gl) {
  console.log('Failed to get the rendering context for WebGL');
  return;
}

// Initialize shaders
if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
  console.log('Failed to intialize shaders.');
  return;
}

// Write the positions of vertices to a vertex shader
var n = initVertexBuffers(gl);
if (n < 0) {
  console.log('Failed to set the positions of the vertices');
  return;
}

// Specify the color for clearing <canvas>
gl.clearColor(0, 0, 0, 1);

// Clear <canvas>
gl.clear(gl.COLOR_BUFFER_BIT);

// Draw three points
gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}

function initVertexBuffers(gl) {
var vertices = new Float32Array([
  0, 0.5,   -0.5, -0.5,   0.5, -0.5
]);
var n = 3; // The number of vertices

// Create a buffer object
var vertexBuffer = gl.createBuffer();
if (!vertexBuffer) {
  console.log('Failed to create the buffer object');
  return -1;
}

// Bind the buffer object to target
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
// Write date into the buffer object
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
if (a_Position < 0) {
  console.log('Failed to get the storage location of a_Position');
  return -1;
}

// var u_CosB = gl.getUniformLocation(gl.program, 'u_CosB');
// if (u_CosB < 0) {
//   console.log('Failed to get the storage location of u_CosB');
//   return -1;
// }

// var u_SinB = gl.getUniformLocation(gl.program, 'u_SinB');
// if (u_SinB < 0) {
//   console.log('Failed to get the storage location of u_SinB');
//   return -1;
// }

var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
if (u_xformMatrix < 0) {
  console.log('Failed to get the storage location of u_xformMatrix');
  return -1;
}

// Assign the buffer object to a_Position variable
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

var radian = Math.PI * angle / 180;
var cosB = Math.cos(radian);
var sinB = Math.sin(radian);

var xformMatrix = new Float32Array([
    cosB,  sinB,  0.0,  0.0,
    -sinB, cosB,  0.0,  0.0,
    0.0,   0.0,   1.0,  0.0,
    0.0,   0.0,   0.0,  1.0
]);

// gl.uniform1f(u_CosB, cosB);
// gl.uniform1f(u_SinB, sinB);

gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);

// Enable the assignment to a_Position variable
gl.enableVertexAttribArray(a_Position);

return n;
}
