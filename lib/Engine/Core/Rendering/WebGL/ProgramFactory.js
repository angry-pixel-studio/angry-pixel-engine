"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramFactory = void 0;
var ProgramFactory = /** @class */ (function () {
    function ProgramFactory(shaderLoader) {
        this.shaderLoader = shaderLoader;
    }
    ProgramFactory.prototype.create = function (gl, vertexShaderSource, fragmentShaderSource) {
        var program = gl.createProgram();
        var vertexShader = this.shaderLoader.load(gl, gl.VERTEX_SHADER, vertexShaderSource);
        var fragmentShader = this.shaderLoader.load(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        this.link(gl, program, vertexShader, fragmentShader);
        return program;
    };
    ProgramFactory.prototype.link = function (gl, program, vertexShader, fragmentShader) {
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        var status = gl.LINK_STATUS;
        if (!gl.getProgramParameter(program, status)) {
            var error = gl.getProgramInfoLog(program);
            gl.deleteProgram(program);
            throw new Error("Unable to initialize the Program: " + error);
        }
    };
    return ProgramFactory;
}());
exports.ProgramFactory = ProgramFactory;
//# sourceMappingURL=ProgramFactory.js.map