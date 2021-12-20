var canvas = document.querySelector("#c");
var gl = canvas.getContext("webgl");

function createShader(gl, type, source) {
  var shader = gl.createShader(type); // 创建着色器对象
  gl.shaderSource(shader, source); // 提供数据源
  gl.compileShader(shader); // 编译 -> 生成着色器
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;
 
var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
   
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }

  var program = createProgram(gl, vertexShader, fragmentShader);

  var positionAttributeLocation = gl.getAttribLocation(program, "a_position")