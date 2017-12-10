// RotatedTranslatedTriangle.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
'attribute vec4 a_Position;\n' +
'uniform mat4 u_ModelMatrix;\n' +
'void main() {\n' +
'  gl_Position = u_ModelMatrix * a_Position;\n' +
'}\n';

// Fragment shader program
var FSHADER_SOURCE =
'void main() {\n' +
'  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
'}\n';

var ANGLE_STEP = 45.0;

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

// Create Matrix4 object for model transformation
var modelMatrix = new Matrix4();

// Calculate a model matrix
var ANGLE = 60.0; // The rotation angle
var Tx = 0.5;     // Translation distance
var curAngle = ANGLE;
// modelMatrix.setRotate(ANGLE, 0, 0, 1);  // Set rotation matrix
// modelMatrix.translate(Tx, 0, 0);        // Multiply modelMatrix by the calculated translation matrix
// modelMatrix.setTranslate(Tx, 0, 0);
// modelMatrix.rotate(ANGLE, 0, 0, 1);

// Pass the model matrix to the vertex shader
var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
if (!u_ModelMatrix) {
  console.log('Failed to get the storage location of u_xformMatrix');
  return;
}

var tick = function() {
    curAngle = animate(curAngle);
    draw(gl, n, curAngle, modelMatrix, u_ModelMatrix);
    requestAnimationFrame(tick);
};

tick();

// // Clear <canvas>
// gl.clear(gl.COLOR_BUFFER_BIT);

// // Draw the rectangle
// gl.drawArrays(gl.TRIANGLES, 0, n);
}

function draw(gl, n, curAngle, modelMatrix, u_ModelMatrix) {
    modelMatrix.setRotate(curAngle, 0, 0, 1);
    modelMatrix.translate(0.75, 0, 0);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

var g_last = Date.now();
function animate(angle) {
    var now = Date.now();
    var elapsed = now - g_last;
    g_last = now;

    var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
    return newAngle %= 360;
}

function initVertexBuffers(gl) {
var vertices = new Float32Array([
  0, 0.3,   -0.3, -0.3,   0.3, -0.3
]);
var n = 3; // The number of vertices

// Create a buffer object
var vertexBuffer = gl.createBuffer();
if (!vertexBuffer) {
  console.log('Failed to create the buffer object');
  return false;
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
// Assign the buffer object to a_Position variable
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

// Enable the assignment to a_Position variable
gl.enableVertexAttribArray(a_Position);

return n;
}

