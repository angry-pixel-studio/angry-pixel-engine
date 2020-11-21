"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context2DRenderer = void 0;
var Vector2_1 = require("../../../Helper/Vector2");
var GeometricRenderData_1 = require("../RenderData/GeometricRenderData");
var RenderData_1 = require("../RenderData/RenderData");
var Context2DRenderer = /** @class */ (function () {
    function Context2DRenderer(canvas) {
        this.canvas = null;
        this.canvasContext = null;
        this.imagePosition = new Vector2_1.Vector2(0, 0);
        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d");
    }
    Context2DRenderer.prototype.clearCanvas = function (color) {
        if (color === void 0) { color = null; }
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (color !== null) {
            this.canvasContext.fillStyle = color;
            this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    };
    Context2DRenderer.prototype.render = function (renderData) {
        if (renderData.type === RenderData_1.RenderDataType.Image) {
            this.renderImage(renderData);
        }
        if (renderData.type === RenderData_1.RenderDataType.Text) {
            this.renderText(renderData);
        }
        if (renderData.type === RenderData_1.RenderDataType.Geometric) {
            this.renderGeometric(renderData);
        }
    };
    Context2DRenderer.prototype.renderImage = function (renderData) {
        this.updateRenderPosition(renderData);
        this.imagePosition.set(0, 0);
        this.canvasContext.save();
        if (renderData.rotation) {
            this.canvasContext.translate(renderData.viewportPosition.x + renderData.width / 2, renderData.viewportPosition.y + renderData.height / 2);
            this.imagePosition.set(-renderData.width / 2, -renderData.height / 2);
            this.canvasContext.rotate(-(renderData.rotation * Math.PI) / 180);
        }
        else {
            this.canvasContext.translate(renderData.viewportPosition.x, renderData.viewportPosition.y);
            this.imagePosition.x = renderData.flipHorizontal ? -renderData.width : this.imagePosition.x;
            this.imagePosition.y = renderData.flipVertical ? -renderData.height : this.imagePosition.y;
        }
        this.canvasContext.imageSmoothingEnabled = renderData.smooth;
        this.canvasContext.scale(renderData.flipHorizontal ? -1 : 1, renderData.flipVertical ? -1 : 1);
        if (renderData.slice !== undefined && renderData.slice !== null) {
            this.canvasContext.drawImage(renderData.image, renderData.slice.x, renderData.slice.y, renderData.slice.width, renderData.slice.height, this.imagePosition.x, this.imagePosition.y, renderData.width, renderData.height);
        }
        else {
            this.canvasContext.drawImage(renderData.image, this.imagePosition.x, this.imagePosition.y, renderData.width, renderData.height);
        }
        this.canvasContext.restore();
    };
    Context2DRenderer.prototype.renderText = function (renderData) {
        var _this = this;
        this.updateRenderPosition(renderData);
        this.canvasContext.save();
        var font = [
            renderData.bold ? "bold" : "",
            renderData.italic ? "italic" : "",
            renderData.textSize + "px",
            renderData.font,
        ];
        this.canvasContext.font = font.join(" ");
        this.canvasContext.fillStyle = renderData.color;
        this.canvasContext.textBaseline = "middle";
        if (Array.isArray(renderData.text)) {
            renderData.text.forEach(function (text, index) {
                _this.canvasContext.fillText(text, renderData.viewportPosition.x, renderData.viewportPosition.y + (renderData.lineSeparation + renderData.textSize) * index);
            });
        }
        else {
            this.canvasContext.fillText(renderData.text, renderData.viewportPosition.x, renderData.viewportPosition.y);
        }
        this.canvasContext.restore();
    };
    Context2DRenderer.prototype.renderGeometric = function (renderData) {
        this.canvasContext.save();
        this.updateRenderPosition(renderData);
        switch (renderData.geometricType) {
            case GeometricRenderData_1.GEOMETRIC_RECTANGLE:
                this.canvasContext.strokeStyle = renderData.color;
                this.canvasContext.strokeRect(renderData.viewportPosition.x, renderData.viewportPosition.y, renderData.geometric.width, renderData.geometric.height);
                break;
            case GeometricRenderData_1.GEOMETRIC_POLYGON:
                break;
        }
        this.canvasContext.restore();
    };
    Context2DRenderer.prototype.updateRenderPosition = function (renderData) {
        if (renderData.type === RenderData_1.RenderDataType.Image) {
            this.centerImage(renderData);
        }
        renderData.viewportPosition.x = Number((renderData.viewportPosition.x + this.canvas.width / 2).toFixed(0));
        renderData.viewportPosition.y = Number((this.canvas.height / 2 - renderData.viewportPosition.y).toFixed(0));
    };
    Context2DRenderer.prototype.centerImage = function (renderData) {
        renderData.viewportPosition.x -= Math.floor(renderData.width / 2);
        renderData.viewportPosition.y += Math.floor(renderData.height / 2);
    };
    return Context2DRenderer;
}());
exports.Context2DRenderer = Context2DRenderer;
//# sourceMappingURL=Context2DRenderer.js.map