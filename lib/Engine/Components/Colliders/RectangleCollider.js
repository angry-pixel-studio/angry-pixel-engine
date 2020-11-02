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
exports.RectangleCollider = void 0;
var GameObject_1 = require("../../GameObject");
var GeometricRenderData_1 = require("../../Core/Rendering/RenderData/GeometricRenderData");
var Game_1 = require("../../Game");
var RectangleCollider_1 = require("../../Core/Collision/Collider/RectangleCollider");
var Vector2_1 = require("../../Helper/Vector2");
var Collider_1 = require("./Collider");
var RectangleCollider = /** @class */ (function (_super) {
    __extends(RectangleCollider, _super);
    function RectangleCollider(_a) {
        var width = _a.width, height = _a.height, _b = _a.offsetX, offsetX = _b === void 0 ? 0 : _b, _c = _a.offsetY, offsetY = _c === void 0 ? 0 : _c, _d = _a.debug, debug = _d === void 0 ? false : _d;
        var _this = _super.call(this) || this;
        _this.renderManager = Game_1.container.getSingleton("RenderManager");
        _this.debug = false;
        _this.renderData = new GeometricRenderData_1.GeometricRenderData();
        _this.width = width;
        _this.height = height;
        _this.offsetX = offsetX;
        _this.offsetY = offsetY;
        _this.debug = debug;
        return _this;
    }
    RectangleCollider.prototype.start = function () {
        this.addCollider(new RectangleCollider_1.RectangleCollider(new Vector2_1.Vector2(this.gameObject.transform.position.x - Math.floor(this.width / 2) - this.offsetX, this.gameObject.transform.position.y + Math.floor(this.height / 2) - this.offsetY), this.width, this.height, this.gameObject));
    };
    RectangleCollider.prototype.update = function () {
        this.updateCoordinates();
        if (this.debug) {
            this.updateRenderData();
            this.renderManager.addToRenderStack(this.renderData);
        }
    };
    RectangleCollider.prototype.updateCoordinates = function () {
        this.colliders[0].coordinates = new Vector2_1.Vector2(this.gameObject.transform.position.x - Math.floor(this.width / 2) - this.offsetX, this.gameObject.transform.position.y + Math.floor(this.height / 2) - this.offsetY);
    };
    RectangleCollider.prototype.updateRenderData = function () {
        this.renderData.position = this.colliders[0].coordinates;
        this.renderData.layer = GameObject_1.LAYER_DEFAULT;
        this.renderData.geometric = this.colliders[0];
        this.renderData.geometricType = GeometricRenderData_1.GEOMETRIC_RECTANGLE;
        this.renderData.color = "#00FF00";
    };
    return RectangleCollider;
}(Collider_1.Collider));
exports.RectangleCollider = RectangleCollider;
//# sourceMappingURL=RectangleCollider.js.map