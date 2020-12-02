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
exports.BoxCollider = exports.TYPE_BOX_COLLIDER = void 0;
var GameObject_1 = require("../../GameObject");
var GeometricRenderData_1 = require("../../Core/Rendering/RenderData/GeometricRenderData");
var Game_1 = require("../../Game");
var RectangleCollider_1 = require("../../Core/Collision/Collider/RectangleCollider");
var Vector2_1 = require("../../Math/Vector2");
var ColliderComponent_1 = require("./ColliderComponent");
exports.TYPE_BOX_COLLIDER = "BoxCollider";
var BoxCollider = /** @class */ (function (_super) {
    __extends(BoxCollider, _super);
    function BoxCollider(config) {
        var _a, _b, _c;
        var _this = _super.call(this) || this;
        _this.renderManager = Game_1.container.getSingleton("RenderManager");
        _this.offsetX = 0;
        _this.offsetY = 0;
        _this.debug = false;
        _this.realWidth = 0;
        _this.realHeight = 0;
        _this.realOffsetX = 0;
        _this.realOffsetY = 0;
        _this.renderData = new GeometricRenderData_1.GeometricRenderData();
        _this.type = exports.TYPE_BOX_COLLIDER;
        _this.width = config.width;
        _this.height = config.height;
        _this.offsetX = (_a = config.offsetX) !== null && _a !== void 0 ? _a : _this.offsetX;
        _this.offsetY = (_b = config.offsetY) !== null && _b !== void 0 ? _b : _this.offsetY;
        _this.debug = (_c = config.debug) !== null && _c !== void 0 ? _c : _this.debug;
        return _this;
    }
    BoxCollider.prototype.start = function () {
        this.updateRealSize();
        this.addCollider(new RectangleCollider_1.RectangleCollider(new Vector2_1.Vector2(this.gameObject.transform.position.x - Math.floor(this.realWidth / 2) - this.offsetX, this.gameObject.transform.position.y + Math.floor(this.realHeight / 2) - this.offsetY), this.realWidth, this.realHeight, this.gameObject));
    };
    BoxCollider.prototype.update = function () {
        this.updateCoordinates();
        if (this.debug) {
            this.updateRenderData();
            this.renderManager.addToRenderStack(this.renderData);
        }
    };
    BoxCollider.prototype.updateCoordinates = function () {
        this.updateRealSize();
        this.colliders[0].width = this.realWidth;
        this.colliders[0].height = this.realHeight;
        this.colliders[0].coordinates = new Vector2_1.Vector2(this.gameObject.transform.position.x - Math.floor(this.realWidth / 2) - this.realOffsetX, this.gameObject.transform.position.y + Math.floor(this.realHeight / 2) + this.realOffsetY);
    };
    BoxCollider.prototype.updateRealSize = function () {
        this.realWidth = this.width * this.gameObject.transform.scale.x;
        this.realHeight = this.height * this.gameObject.transform.scale.y;
        this.realOffsetX = this.offsetX * this.gameObject.transform.scale.x;
        this.realOffsetY = this.offsetY * this.gameObject.transform.scale.y;
    };
    BoxCollider.prototype.updateRenderData = function () {
        this.renderData.debug = true;
        this.renderData.position = this.colliders[0].coordinates;
        this.renderData.layer = GameObject_1.LAYER_DEFAULT;
        this.renderData.geometric = this.colliders[0];
        this.renderData.geometricType = GeometricRenderData_1.GEOMETRIC_RECTANGLE;
        this.renderData.color = "#00FF00";
    };
    return BoxCollider;
}(ColliderComponent_1.ColliderComponent));
exports.BoxCollider = BoxCollider;
//# sourceMappingURL=BoxCollider.js.map