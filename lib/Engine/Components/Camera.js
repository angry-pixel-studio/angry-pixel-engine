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
var CameraData_1 = require("../Core/Rendering/CameraData");
var Game_1 = require("../Game");
var GameObject_1 = require("../GameObject");
var Rectangle_1 = require("../Math/Rectangle");
var DEFAULT_LAYERS = [GameObject_1.LAYER_DEFAULT];
exports.TYPE_CAMERA = "Camera";
var Camera = /** @class */ (function (_super) {
    __extends(Camera, _super);
    function Camera() {
        var _this = _super.call(this) || this;
        _this.renderManager = Game_1.container.getSingleton("RenderManager");
        _this.domManager = Game_1.container.getSingleton("DomManager");
        _this._layers = DEFAULT_LAYERS;
        _this._depth = 0;
        _this._zoom = 1;
        _this._viewportRect = new Rectangle_1.Rectangle(0, 0, 0, 0);
        _this._worldSpaceRect = new Rectangle_1.Rectangle(0, 0, 0, 0);
        _this.cameraData = new CameraData_1.CameraData();
        _this.allowMultiple = false;
        _this.type = exports.TYPE_CAMERA;
        _this.canvas = _this.domManager.gameCanvas;
        return _this;
    }
    Object.defineProperty(Camera.prototype, "layers", {
        get: function () {
            return this._layers;
        },
        set: function (layers) {
            this._layers = __spreadArrays(DEFAULT_LAYERS, layers);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "depth", {
        get: function () {
            return this._depth;
        },
        set: function (depth) {
            this._depth = depth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "zoom", {
        get: function () {
            return this._zoom;
        },
        set: function (zoom) {
            if (this.zoom <= 0) {
                throw new Error("zoom must be greather than 0");
            }
            this._zoom = zoom;
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
    Camera.prototype.addLayer = function (layer) {
        this._layers.push(layer);
    };
    Camera.prototype.update = function () {
        this.updateViewportRect();
        this.updateWorldSpaceRect();
        this.updateCameraData();
    };
    Camera.prototype.updateViewportRect = function () {
        var inverseZoom = 1 / this.zoom;
        this._viewportRect.x = (-this.canvas.width / 2) * inverseZoom;
        this._viewportRect.y = (-this.canvas.height / 2) * inverseZoom;
        this._viewportRect.width = this.canvas.width * inverseZoom;
        this._viewportRect.height = this.canvas.height * inverseZoom;
    };
    Camera.prototype.updateWorldSpaceRect = function () {
        this._worldSpaceRect.x = this.gameObject.transform.position.x - this._viewportRect.width / 2;
        this._worldSpaceRect.y = this.gameObject.transform.position.y - this._viewportRect.height / 2;
        this._worldSpaceRect.width = this._viewportRect.width;
        this._worldSpaceRect.height = this._viewportRect.height;
    };
    Camera.prototype.updateCameraData = function () {
        this.cameraData.depth = this._depth;
        this.cameraData.layers = this._layers;
        this.cameraData.viewportRect = this._viewportRect;
        this.cameraData.worldSpaceRect = this._worldSpaceRect;
        this.renderManager.addCameraData(this.cameraData);
    };
    return Camera;
}(Component_1.RenderComponent));
exports.Camera = Camera;
//# sourceMappingURL=Camera.js.map