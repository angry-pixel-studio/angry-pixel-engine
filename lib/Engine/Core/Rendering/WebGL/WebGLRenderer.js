"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebGLRenderer = void 0;
var RenderData_1 = require("../RenderData/RenderData");
var WebGLRenderer = /** @class */ (function () {
    function WebGLRenderer(canvas, imageRenderer) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext("webgl2");
        this.imageRenderer = imageRenderer;
    }
    WebGLRenderer.prototype.clearCanvas = function (color) {
        var rgb = this.hexToRgb(color);
        this.gl.clearColor(rgb.r, rgb.g, rgb.b, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    };
    WebGLRenderer.prototype.hexToRgb = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                r: parseInt(result[1], 16) / 256,
                g: parseInt(result[2], 16) / 256,
                b: parseInt(result[3], 16) / 256,
            }
            : null;
    };
    WebGLRenderer.prototype.render = function (renderData) {
        if (renderData.type === RenderData_1.RenderDataType.Image) {
            this.renderImage(renderData);
        }
    };
    WebGLRenderer.prototype.renderImage = function (renderData) {
        this.imageRenderer.renderImage(renderData.image, renderData.viewportPosition, renderData.width, renderData.height, renderData.slice, renderData.rotation, renderData.flipHorizontal, renderData.flipVertical, renderData.alpha, renderData.smooth);
    };
    return WebGLRenderer;
}());
exports.WebGLRenderer = WebGLRenderer;
//# sourceMappingURL=WebGLRenderer.js.map