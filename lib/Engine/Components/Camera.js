"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = exports.TYPE_CAMERA = void 0;
var Component_1 = require("../Component");
var Game_1 = require("../Game");
var GameObject_1 = require("../GameObject");
var Rectangle_1 = require("../Libs/Geometric/Shapes/Rectangle");
var DEFAULT_LAYERS = [GameObject_1.LAYER_DEFAULT];
exports.TYPE_CAMERA = "Camera";
var Camera = /** @class */ (function (_super) {
    __extends(Camera, _super);
    function Camera() {
        var _this = _super.call(this) || this;
        _this.renderManager = Game_1.container.getSingleton("RenderManager");
        _this.domManager = Game_1.container.getSingleton("DomManager");
        _this._vpHalfWidth = 0;
        _this._vpHalfHeight = 0;
        _this._viewportRect = new Rectangle_1.Rectangle(0, 0, 0, 0);
        _this._worldSpaceRect = new Rectangle_1.Rectangle(0, 0, 0, 0);
        _this._renderLayers = DEFAULT_LAYERS;
        _this.allowMultiple = false;
        _this.type = exports.TYPE_CAMERA;
        _this.gameCanvas = _this.domManager.gameCanvas;
        return _this;
    }
    Camera.prototype.start = function () {
        this.setupViewportRect();
    };
    Camera.prototype.setupViewportRect = function () {
        this._viewportRect.setPosition(-(this.gameCanvas.clientWidth / 2), this.gameCanvas.clientHeight / 2);
        this._viewportRect.width = this.gameCanvas.clientWidth;
        this._viewportRect.height = this.gameCanvas.clientHeight;
        this._vpHalfWidth = this._viewportRect.width / 2;
        this._vpHalfHeight = this._viewportRect.height / 2;
    };
    Camera.prototype.update = function () {
        this.updateWorldSpaceRect();
        this.renderManager.renderLayers = this._renderLayers;
        this.renderManager.viewportRect = this._viewportRect;
        this.renderManager.worldSpaceViewRect = this._worldSpaceRect;
    };
    Camera.prototype.updateWorldSpaceRect = function () {
        var position = this.gameObject.transform.position;
        this._worldSpaceRect.x = position.x - this._vpHalfWidth;
        this._worldSpaceRect.y = position.y + this._vpHalfHeight;
        this._worldSpaceRect.width = this._viewportRect.width;
        this._worldSpaceRect.height = this._viewportRect.height;
    };
    Camera.prototype.addLayerToRender = function (layer) {
        this._renderLayers.push(layer);
    };
    Object.defineProperty(Camera.prototype, "renderLayers", {
        get: function () {
            return this._renderLayers;
        },
        set: function (renderLayers) {
            this._renderLayers = __spreadArrays(DEFAULT_LAYERS, renderLayers);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "worldSpaceRect", {
        get: function () {
            return this._worldSpaceRect;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "viewportRect", {
        get: function () {
            return this._viewportRect;
        },
        enumerable: false,
        configurable: true
    });
    return Camera;
}(Component_1.Component));
exports.Camera = Camera;
//# sourceMappingURL=Camera.js.map