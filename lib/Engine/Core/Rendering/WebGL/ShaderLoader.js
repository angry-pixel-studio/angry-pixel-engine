"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShaderLoader = void 0;
var ShaderLoader = /** @class */ (function () {
    function ShaderLoader() {
    }
    ShaderLoader.prototype.load = function (gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        var status = gl.COMPILE_STATUS;
        if (!gl.getShaderParameter(shader, status)) {
            var error = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw new Error("Unable to initialize the shader program: " + error);
        }
        return shader;
    };
    return ShaderLoader;
}());
exports.ShaderLoader = ShaderLoader;
//# sourceMappingURL=ShaderLoader.js.map