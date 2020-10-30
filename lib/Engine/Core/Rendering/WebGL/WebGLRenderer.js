"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebGLRenderer = void 0;
var Rectangle_1 = require("../../../Libs/Geometric/Shapes/Rectangle");
var Vector2_1 = require("../../../Helper/Vector2");
var RenderData_1 = require("../RenderData/RenderData");
var WebGLRenderer = /** @class */ (function () {
    function WebGLRenderer(canvas, imageRenderer) {
        this.renderPosition = new Vector2_1.Vector2(0, 0);
        this.cacheRect = new Rectangle_1.Rectangle(0, 0, 0, 0);
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
    WebGLRenderer.prototype.render = function (renderData, worldSpaceViewRect, viewportRect) {
        if (renderData.type === RenderData_1.RenderDataType.Image) {
            this.renderImage(renderData, renderData.ui === true ? viewportRect : worldSpaceViewRect);
        }
    };
    WebGLRenderer.prototype.renderImage = function (renderData, viewRect) {
        if (this.isInsideViewRect(renderData, viewRect) === false) {
            return;
        }
        this.updateRenderPosition(renderData, viewRect);
        this.imageRenderer.renderImage(renderData.image, this.renderPosition, renderData.width, renderData.height, renderData.slice, renderData.rotation, renderData.flipHorizontal, renderData.flipVertical, renderData.alpha, renderData.smooth);
    };
    WebGLRenderer.prototype.isInsideViewRect = function (renderData, viewRect) {
        this.cacheRect.set(renderData.position.x - renderData.width / 2, renderData.position.y + renderData.height / 2, renderData.width, renderData.height);
        return viewRect.overlappingRectangle(this.cacheRect);
    };
    WebGLRenderer.prototype.updateRenderPosition = function (renderData, viewRect) {
        this.renderPosition.x = Number((renderData.position.x - viewRect.x - viewRect.width / 2).toFixed(0));
        this.renderPosition.y = Number((renderData.position.y - viewRect.y + viewRect.height / 2).toFixed(0));
    };
    return WebGLRenderer;
}());
exports.WebGLRenderer = WebGLRenderer;
//# sourceMappingURL=WebGLRenderer.js.map