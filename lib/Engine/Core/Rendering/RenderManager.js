"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderManager = void 0;
var Rectangle_1 = require("../../Math/Rectangle");
var RenderManager = /** @class */ (function () {
    function RenderManager(gameRenderer, uiRenderer, debugRenderer) {
        if (uiRenderer === void 0) { uiRenderer = null; }
        if (debugRenderer === void 0) { debugRenderer = null; }
        this.gameRenderer = null;
        this.uiRenderer = null;
        this.debugRenderer = null;
        this.renderStack = [];
        this.cameras = [];
        this.cacheRect = new Rectangle_1.Rectangle(0, 0, 0, 0);
        this.gameRenderer = gameRenderer;
        this.uiRenderer = uiRenderer;
        this.debugRenderer = debugRenderer;
    }
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
    RenderManager.prototype.addCameraData = function (cameraData) {
        this.cameras.push(cameraData);
    };
    RenderManager.prototype.render = function () {
        var _this = this;
        this.cameras
            .sort(function (a, b) { return a.depth - b.depth; })
            .forEach(function (camera) { return _this.renderByCamera(camera); });
        this.clear();
    };
    RenderManager.prototype.clear = function () {
        this.renderStack = [];
        this.cameras = [];
    };
    RenderManager.prototype.renderByCamera = function (camera) {
        var _this = this;
        this.renderStack.forEach(function (renderData) {
            if (camera.layers.includes(renderData.layer) === false) {
                return;
            }
            _this.setViewportPosition(camera, renderData);
            if (_this.uiRenderer !== null && renderData.ui === true) {
                _this.uiRenderer.render(camera, renderData);
            }
            else if (_this.debugRenderer !== null && renderData.debug === true) {
                _this.debugRenderer.render(camera, renderData);
            }
            else if (renderData.ui !== true &&
                renderData.debug !== true &&
                _this.isInsideViewportRect(camera, renderData) !== false) {
                _this.gameRenderer.render(camera, renderData);
            }
        });
    };
    RenderManager.prototype.setViewportPosition = function (camera, renderData) {
        if (renderData.ui !== true) {
            renderData.viewportPosition.set(Number((renderData.position.x - camera.worldSpaceRect.x - camera.worldSpaceRect.width / 2).toFixed(0)), Number((renderData.position.y - camera.worldSpaceRect.y - camera.worldSpaceRect.height / 2).toFixed(0)));
        }
        else {
            renderData.viewportPosition = renderData.position;
        }
    };
    RenderManager.prototype.isInsideViewportRect = function (camera, renderData) {
        this.cacheRect.set(renderData.viewportPosition.x - renderData.width / 2, renderData.viewportPosition.y - renderData.height / 2, renderData.width, renderData.height);
        return camera.viewportRect.overlappingRectangle(this.cacheRect);
    };
    return RenderManager;
}());
exports.RenderManager = RenderManager;
//# sourceMappingURL=RenderManager.js.map