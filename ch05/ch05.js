// RotatedTranslatedTriangle.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
'attribute vec4 a_Position;\n' +
// 'attribute float a_PointSize;\n' +
'attribute vec4 a_Color;\n' +
'varying vec4 v_Color;\n' +
'void main() {\n' +
'   gl_Position = a_Position;\n' +
'   gl_PointSize = 10.0;\n' +
// '   gl_PointSize = a_PointSize;\n' +
'   v_Color = a_Color;\n' +
'}\n';

// Fragment shader program
var FSHADER_SOURCE =
'precision mediump float;\n' +
'varying vec4 v_Color;\n' +
'void main() {\n' +
'  gl_FragColor = v_Color;\n' +
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

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw the rectangle
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
  // var vertices = new Float32Array([
  //   0, 0.3,   -0.3, -0.3,   0.3, -0.3
  // ]);
  // var sizes = new Float32Array([
  //     10.0, 20.0, 30.0
  // ])

  // var verticesInfo = new Float32Array([
  //   0.0, 0.5, 10.0,
  //   -0.5, -0.5, 20.0,
  //   0.5, -0.5, 30
  // ]);

  var verticesInfo = new Float32Array([
    0.0, 0.5, 1.0, 0.0, 0.0,
    -0.5, -0.5, 0.0, 1.0, 0.0,
    0.5, -0.5, 0.0, 0.0, 1.0
  ]);
  var n = 3; // The number of vertices

  // Create a buffer object
  // var vertexBuffer = gl.createBuffer();
  // if (!vertexBuffer) {
  //   console.log('Failed to create the vertex buffer');
  //   return false;
  // }

  // var sizeBuffer = gl.createBuffer();
  // if (!sizeBuffer) {
  //   console.log('Failed to create the size buffer');
  //   return false;
  // }

  var verticesInfoBuffer = gl.createBuffer();

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, verticesInfoBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, verticesInfo, gl.STATIC_DRAW);

  var FSIZE = verticesInfo.BYTES_PER_ELEMENT;

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  // gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
  // gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);

  // var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  // if (a_PointSize < 0) {
  //   console.log('Failed to get the storage location of a_Position');
  //   return -1;
  // }

  // gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2);
  // gl.enableVertexAttribArray(a_PointSize);

  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if (a_Color < 0) {
      console.log('Failed to get the storage location of a_Color');
      return -1;
  }

  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
  gl.enableVertexAttribArray(a_Color);

  return n;
}

