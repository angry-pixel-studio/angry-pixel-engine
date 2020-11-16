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
var RenderManager = /** @class */ (function () {
    function RenderManager(gameRenderer, uiRenderer, debugRenderer) {
        if (uiRenderer === void 0) { uiRenderer = null; }
        if (debugRenderer === void 0) { debugRenderer = null; }
        this.gameRenderer = null;
        this.uiRenderer = null;
        this.debugRenderer = null;
        this.renderStack = [];
        this._renderLayers = [];
        this._worldSpaceViewRect = new Rectangle_1.Rectangle(0, 0, 0, 0);
        this._viewportRect = new Rectangle_1.Rectangle(0, 0, 0, 0);
        this.cacheRect = new Rectangle_1.Rectangle(0, 0, 0, 0);
        this.gameRenderer = gameRenderer;
        this.uiRenderer = uiRenderer;
        this.debugRenderer = debugRenderer;
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
        if (this.uiRenderer !== null) {
            this.uiRenderer.clearCanvas(null);
        }
        // If debug enabled
        if (this.debugRenderer !== null) {
            this.debugRenderer.clearCanvas(null);
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
            _this.setViewportPosition(renderData);
            if (_this.uiRenderer !== null && renderData.ui === true) {
                _this.uiRenderer.render(renderData);
            }
            else if (_this.debugRenderer !== null && renderData.debug === true) {
                _this.debugRenderer.render(renderData);
            }
            else if (renderData.ui !== true &&
                renderData.debug !== true &&
                _this.isInsideViewportRect(renderData) !== false) {
                _this.gameRenderer.render(renderData);
            }
        });
        this.clearRenderStack();
    };
    RenderManager.prototype.setViewportPosition = function (renderData) {
        if (renderData.ui !== true) {
            renderData.viewportPosition.x = Number((renderData.position.x - this._worldSpaceViewRect.x - this._worldSpaceViewRect.width / 2).toFixed(0));
            renderData.viewportPosition.y = Number((renderData.position.y - this._worldSpaceViewRect.y + this._worldSpaceViewRect.height / 2).toFixed(0));
        }
        else {
            renderData.viewportPosition = renderData.position;
        }
    };
    RenderManager.prototype.isInsideViewportRect = function (renderData) {
        this.cacheRect.set(renderData.viewportPosition.x - renderData.width / 2, renderData.viewportPosition.y + renderData.height / 2, renderData.width, renderData.height);
        return this._viewportRect.overlappingRectangle(this.cacheRect);
    };
    return RenderManager;
}());
exports.RenderManager = RenderManager;
//# sourceMappingURL=RenderManager.js.map