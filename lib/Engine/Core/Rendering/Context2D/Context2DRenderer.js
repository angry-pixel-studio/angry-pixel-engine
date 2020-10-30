"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context2DRenderer = void 0;
var Rectangle_1 = require("../../../Libs/Geometric/Shapes/Rectangle");
var Vector2_1 = require("../../../Helper/Vector2");
var GeometricRenderData_1 = require("../RenderData/GeometricRenderData");
var RenderData_1 = require("../RenderData/RenderData");
var DEFAULT_COLOR = "#000000";
var Context2DRenderer = /** @class */ (function () {
    function Context2DRenderer(canvas) {
        this.canvas = null;
        this.canvasContext = null;
        this.renderPosition = new Vector2_1.Vector2(0, 0);
        this.imagePosition = new Vector2_1.Vector2(0, 0);
        this.cacheRect = new Rectangle_1.Rectangle(0, 0, 0, 0);
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
    Context2DRenderer.prototype.render = function (renderData, worldSpaceViewRect, viewportRect) {
        if (renderData.type === RenderData_1.RenderDataType.Image) {
            this.renderImage(renderData, renderData.ui === true ? viewportRect : worldSpaceViewRect);
        }
        if (renderData.type === RenderData_1.RenderDataType.Text && renderData.ui === true) {
            this.renderText(renderData, viewportRect);
        }
        if (renderData.type === RenderData_1.RenderDataType.Geometric) {
            this.renderGeometric(renderData, renderData.ui === true ? viewportRect : worldSpaceViewRect);
        }
    };
    Context2DRenderer.prototype.renderImage = function (renderData, viewRect) {
        if (this.isInsideViewRect(renderData, viewRect) === false) {
            return;
        }
        this.updateRenderPosition(renderData, viewRect);
        this.imagePosition.set(0, 0);
        this.canvasContext.save();
        if (renderData.rotation) {
            this.canvasContext.translate(this.renderPosition.x + renderData.width / 2, this.renderPosition.y + renderData.height / 2);
            this.imagePosition.set(-renderData.width / 2, -renderData.height / 2);
            this.canvasContext.rotate(-(renderData.rotation * Math.PI) / 180);
        }
        else {
            this.canvasContext.translate(this.renderPosition.x, this.renderPosition.y);
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
    Context2DRenderer.prototype.renderText = function (renderData, viewRect) {
        var _this = this;
        this.updateRenderPosition(renderData, viewRect);
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
            var first_1 = true;
            var lineSeparation_1 = 0;
            renderData.text.forEach(function (text) {
                lineSeparation_1 = first_1 ? lineSeparation_1 : renderData.lineSeparation + renderData.textSize;
                _this.canvasContext.fillText(text, _this.renderPosition.x, _this.renderPosition.y + lineSeparation_1);
                first_1 = false;
            });
        }
        else {
            this.canvasContext.fillText(renderData.text, this.renderPosition.x, this.renderPosition.y);
        }
        this.canvasContext.restore();
    };
    Context2DRenderer.prototype.renderGeometric = function (renderData, viewRect) {
        this.canvasContext.save();
        this.updateRenderPosition(renderData, viewRect);
        switch (renderData.geometricType) {
            case GeometricRenderData_1.GEOMETRIC_RECTANGLE:
                this.canvasContext.strokeStyle = renderData.color;
                this.canvasContext.strokeRect(this.renderPosition.x, this.renderPosition.y, renderData.geometric.width, renderData.geometric.height);
                break;
            case GeometricRenderData_1.GEOMETRIC_POLYGON:
                this.canvasContext.strokeStyle = renderData.color;
                this.canvasContext.beginPath();
                this.canvasContext.moveTo(renderData.geometric[0].x - viewRect.x, viewRect.y - renderData.geometric[0].y);
                this.canvasContext.lineTo(renderData.geometric[1].x - viewRect.x, viewRect.y - renderData.geometric[1].y);
                this.canvasContext.lineTo(renderData.geometric[3].x - viewRect.x, viewRect.y - renderData.geometric[3].y);
                this.canvasContext.lineTo(renderData.geometric[2].x - viewRect.x, viewRect.y - renderData.geometric[2].y);
                this.canvasContext.closePath();
                this.canvasContext.stroke();
                break;
        }
        this.canvasContext.restore();
    };
    Context2DRenderer.prototype.isInsideViewRect = function (renderData, viewRect) {
        this.cacheRect.set(renderData.position.x, renderData.position.y, renderData.width, renderData.height);
        return viewRect.overlappingRectangle(this.cacheRect);
    };
    Context2DRenderer.prototype.updateRenderPosition = function (renderData, viewRect) {
        this.renderPosition.x = renderData.position.x;
        this.renderPosition.y = renderData.position.y;
        if (renderData.type === RenderData_1.RenderDataType.Image) {
            this.centerImage(renderData);
        }
        this.renderPosition.x = Number((this.renderPosition.x - viewRect.x).toFixed(0));
        this.renderPosition.y = Number((viewRect.y - this.renderPosition.y).toFixed(0));
    };
    Context2DRenderer.prototype.centerImage = function (renderData) {
        this.renderPosition.x -= Math.floor(renderData.width / 2);
        this.renderPosition.y += Math.floor(renderData.height / 2);
    };
    return Context2DRenderer;
}());
exports.Context2DRenderer = Context2DRenderer;
//# sourceMappingURL=Context2DRenderer.js.map