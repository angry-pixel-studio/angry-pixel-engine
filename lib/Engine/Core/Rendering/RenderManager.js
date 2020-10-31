"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderManager = void 0;
var Rectangle_1 = require("../../Libs/Geometric/Shapes/Rectangle");
var RenderData_1 = require("./RenderData/RenderData");
var RenderManager = /** @class */ (function () {
    function RenderManager(gameRenderer, UIRenderer) {
        this.gameRenderer = null;
        this.UIRenderer = null;
        this.renderStack = [];
        this._renderLayers = [];
        this._worldSpaceViewRect = new Rectangle_1.Rectangle(0, 0, 0, 0);
        this._viewportRect = new Rectangle_1.Rectangle(0, 0, 0, 0);
        this.gameRenderer = gameRenderer;
        this.UIRenderer = UIRenderer;
    }
    Object.defineProperty(RenderManager.prototype, "renderLayers", {
        set: function (renderLayers) {
            this._renderLayers = __spreadArrays(renderLayers);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderManager.prototype, "worldSpaceViewRect", {
        set: function (worldSpaceRect) {
            this._worldSpaceViewRect.updateFromRect(worldSpaceRect);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderManager.prototype, "viewportRect", {
        set: function (viewportRect) {
            this._viewportRect.updateFromRect(viewportRect);
        },
        enumerable: false,
        configurable: true
    });
    RenderManager.prototype.clearCanvas = function (color) {
        if (color === void 0) { color = null; }
        this.gameRenderer.clearCanvas(color);
        // If UI enabled
        if (this.UIRenderer) {
            this.UIRenderer.clearCanvas(null);
        }
    };
    RenderManager.prototype.addToRenderStack = function (renderData) {
        this.renderStack.push(renderData);
    };
    RenderManager.prototype.clearRenderStack = function () {
        this.renderStack = [];
    };
    RenderManager.prototype.render = function () {
        var _this = this;
        this.renderStack.forEach(function (renderData) {
            if (_this._renderLayers.includes(renderData.layer) === false) {
                return;
            }
            if (renderData.ui !== true) {
                // TODO: temporary solution until resolve this with WebGL
                if (renderData.type === RenderData_1.RenderDataType.Geometric && _this.UIRenderer) {
                    _this.UIRenderer.render(renderData, _this._worldSpaceViewRect, _this._viewportRect);
                }
                else {
                    _this.gameRenderer.render(renderData, _this._worldSpaceViewRect, _this._viewportRect);
                }
            }
            else if (_this.UIRenderer && renderData.ui === true) {
                _this.UIRenderer.render(renderData, _this._worldSpaceViewRect, _this._viewportRect);
            }
        });
        this.clearRenderStack();
    };
    return RenderManager;
}());
exports.RenderManager = RenderManager;
//# sourceMappingURL=RenderManager.js.map