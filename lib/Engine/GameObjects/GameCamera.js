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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCamera = void 0;
var GameObject_1 = require("../GameObject");
var Camera_1 = require("../Components/Camera");
var GameCamera = /** @class */ (function (_super) {
    __extends(GameCamera, _super);
    function GameCamera() {
        var _this = _super.call(this) || this;
        _this.transform.position.set(0, 0);
        _this.camera = _this.addComponent(function () { return new Camera_1.Camera(); });
        return _this;
    }
    Object.defineProperty(GameCamera.prototype, "layers", {
        get: function () {
            return this.camera.layers;
        },
        set: function (layers) {
            this.camera.layers = layers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameCamera.prototype, "depth", {
        get: function () {
            return this.camera.depth;
        },
        set: function (depth) {
            this.camera.depth = depth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameCamera.prototype, "zoom", {
        get: function () {
            return this.camera.zoom;
        },
        set: function (zoom) {
            this.camera.zoom = zoom;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameCamera.prototype, "worldSpaceRect", {
        get: function () {
            return this.camera.worldSpaceRect;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameCamera.prototype, "viewportRect", {
        get: function () {
            return this.camera.viewportRect;
        },
        enumerable: false,
        configurable: true
    });
    GameCamera.prototype.addLayer = function (layer) {
        this.camera.layers.push(layer);
    };
    return GameCamera;
}(GameObject_1.GameObject));
exports.GameCamera = GameCamera;
//# sourceMappingURL=GameCamera.js.map