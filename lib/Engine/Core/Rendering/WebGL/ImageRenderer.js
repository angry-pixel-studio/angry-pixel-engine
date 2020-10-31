"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRenderer = void 0;
var vertexShader_1 = require("./Shader/Image/vertexShader");
var fragmentShader_1 = require("./Shader/Image/fragmentShader");
var gl_matrix_1 = require("gl-matrix");
var js_sha256_1 = require("js-sha256");
var ImageRenderer = /** @class */ (function () {
    function ImageRenderer(canvas, programFactory, textureFactory) {
        this.texcache = new Map();
        this.gl = canvas.getContext("webgl2");
        this.textureFactory = textureFactory;
        this.program = programFactory.create(this.gl, vertexShader_1.vertexShader, fragmentShader_1.fragmentShader);
        this.positionBuffer = this.gl.createBuffer();
        this.textureBuffer = this.gl.createBuffer();
        this.positionCoordsAttr = this.gl.getAttribLocation(this.program, "positionCoords");
        this.texCoordsAttr = this.gl.getAttribLocation(this.program, "textureCoords");
        this.modelMatrixUniform = this.gl.getUniformLocation(this.program, "modelMatrix");
        this.projectionMatrixUniform = this.gl.getUniformLocation(this.program, "projectionMatrix");
        this.textureMatrixUniform = this.gl.getUniformLocation(this.program, "textureMatrix");
        this.textureUniform = this.gl.getUniformLocation(this.program, "texImage");
        this.alphaUniform = this.gl.getUniformLocation(this.program, "alpha");
        this.projectionMatrix = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.ortho(this.projectionMatrix, -canvas.width / 2, canvas.width / 2, -canvas.height / 2, canvas.height / 2, -1, 1); // todo: sacar esto de la camara y no el canvas
        this.gl.useProgram(this.program);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        var triangleCoords = [-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5];
        var textureCoords = [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0];
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(triangleCoords), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoords), this.gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(this.positionCoordsAttr);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.vertexAttribPointer(this.positionCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.texCoordsAttr);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureBuffer);
        this.gl.vertexAttribPointer(this.texCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);
    }
    ImageRenderer.prototype.renderImage = function (image, position, width, height, slice, rotation, flipHorizontal, flipVertical, alpha, smooth) {
        if (slice === void 0) { slice = null; }
        if (rotation === void 0) { rotation = 0; }
        if (flipHorizontal === void 0) { flipHorizontal = false; }
        if (flipVertical === void 0) { flipVertical = false; }
        if (alpha === void 0) { alpha = 1; }
        if (smooth === void 0) { smooth = true; }
        var textureHash = js_sha256_1.sha256(image.src);
        if (this.texcache.has(textureHash) === false) {
            this.texcache.set(textureHash, this.textureFactory.createFromImage(this.gl, image, smooth));
        }
        var texture = this.texcache.get(textureHash);
        this.modelMatrix = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.translate(this.modelMatrix, this.modelMatrix, [position.x, position.y, 0]);
        gl_matrix_1.mat4.scale(this.modelMatrix, this.modelMatrix, [
            width * (flipHorizontal ? -1 : 1),
            height * (flipVertical ? -1 : 1),
            0,
        ]);
        gl_matrix_1.mat4.rotateZ(this.modelMatrix, this.modelMatrix, rotation * (Math.PI / 180));
        this.textureMatrix = gl_matrix_1.mat4.create();
        if (slice !== null) {
            gl_matrix_1.mat4.translate(this.textureMatrix, this.textureMatrix, [
                slice.x / image.naturalWidth,
                slice.y / image.naturalHeight,
                0,
            ]);
            gl_matrix_1.mat4.scale(this.textureMatrix, this.textureMatrix, [
                slice.width / image.naturalWidth,
                slice.height / image.naturalHeight,
                0,
            ]);
        }
        this.gl.uniformMatrix4fv(this.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.textureMatrixUniform, false, this.textureMatrix);
        if (alpha < 1) {
            this.gl.enable(this.gl.BLEND);
        }
        else {
            this.gl.disable(this.gl.BLEND);
        }
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.uniform1i(this.textureUniform, 0);
        this.gl.uniform1f(this.alphaUniform, alpha);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    };
    return ImageRenderer;
}());
exports.ImageRenderer = ImageRenderer;
//# sourceMappingURL=ImageRenderer.js.map