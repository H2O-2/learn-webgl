function main() {
    var canvas = document.getElementById('webgl');
    var gl = canvas.getContext('webgl');
    if (!gl) {
        console.log('fail');
        return;
    }

    var VSHADER_SOURCE =
        'attribute vec4 a_posn;\n' +
        'void main() {\n' +
        '   gl_Position = a_posn;\n' +
        '   gl_PointSize = 10.0;\n' +
        '}\n';

    var FSHADER_SOURCE =
        'void main() {\n' +
        '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
        '}\n';

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('init fail!');
        return;
    }

    var aPosn = gl.getAttribLocation(gl.program, 'a_posn');
    if (aPosn < 0) {
        console.log('locate attribute fail!');
        return;
    }

    gl.vertexAttrib3f(aPosn, 0.0, 0.0, 0.0);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);

    console.log(gl);
}
