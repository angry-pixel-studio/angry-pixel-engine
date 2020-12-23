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
var Game_1 = require("../../Game");
var RectangleCollider_1 = require("../../Core/Collision/Collider/RectangleCollider");
var ColliderComponent_1 = require("./ColliderComponent");
var ColliderRenderData_1 = require("../../Core/Rendering/RenderData/ColliderRenderData");
var Vector2_1 = require("../../Math/Vector2");
var Component_1 = require("../../Component");
exports.TYPE_BOX_COLLIDER = "BoxCollider";
var BoxCollider = /** @class */ (function (_super) {
    __extends(BoxCollider, _super);
    function BoxCollider(config) {
        var _a, _b, _c, _d;
        var _this = _super.call(this) || this;
        _this.debug = false;
        _this.offsetX = 0;
        _this.offsetY = 0;
        _this.realWidth = 0;
        _this.realHeight = 0;
        _this.realOffsetX = 0;
        _this.realOffsetY = 0;
        _this.type = exports.TYPE_BOX_COLLIDER;
        _this.width = config.width;
        _this.height = config.height;
        _this.offsetX = (_a = config.offsetX) !== null && _a !== void 0 ? _a : _this.offsetX;
        _this.offsetY = (_b = config.offsetY) !== null && _b !== void 0 ? _b : _this.offsetY;
        _this._physics = (_c = config.physics) !== null && _c !== void 0 ? _c : _this.physics;
        _this.debug = (_d = config.debug) !== null && _d !== void 0 ? _d : _this.debug;
        return _this;
    }
    BoxCollider.prototype.start = function () {
        var _this = this;
        this.updateRealSize();
        this.addCollider(new RectangleCollider_1.RectangleCollider(this.gameObject.transform.position, this.realWidth, this.realHeight, this._physics, this.gameObject));
        if (this.debug) {
            this.gameObject.addComponent(function () { return new BoxColliderRenderer(_this.colliders[0]); });
        }
    };
    BoxCollider.prototype.update = function () {
        this.updatePosition();
    };
    BoxCollider.prototype.updatePosition = function () {
        this.updateRealSize();
        this.colliders[0].width = this.realWidth;
        this.colliders[0].height = this.realHeight;
        this.colliders[0].position = this.gameObject.transform.position.add(new Vector2_1.Vector2(this.realOffsetX, this.realOffsetY));
    };
    BoxCollider.prototype.updateRealSize = function () {
        this.realWidth = this.width * Math.abs(this.gameObject.transform.scale.x);
        this.realHeight = this.height * Math.abs(this.gameObject.transform.scale.y);
        this.realOffsetX = this.offsetX * this.gameObject.transform.scale.x;
        this.realOffsetY = this.offsetY * this.gameObject.transform.scale.y;
    };
    return BoxCollider;
}(ColliderComponent_1.ColliderComponent));
exports.BoxCollider = BoxCollider;
var TYPE_BOX_COLLIDER_RENDERER = "BoxColliderRenderer";
var BoxColliderRenderer = /** @class */ (function (_super) {
    __extends(BoxColliderRenderer, _super);
    function BoxColliderRenderer(collider) {
        var _this = _super.call(this) || this;
        _this.renderManager = Game_1.container.getSingleton("RenderManager");
        _this.type = TYPE_BOX_COLLIDER_RENDERER;
        _this.renderData = new ColliderRenderData_1.ColliderRenderData();
        _this.renderData.debug = true;
        _this.renderData.layer = GameObject_1.LAYER_DEFAULT;
        _this.renderData.color = "#00FF00";
        _this.collider = collider;
        return _this;
    }
    BoxColliderRenderer.prototype.update = function () {
        this.renderData.position = this.collider.position;
        this.renderData.shape = this.collider.shape;
        this.renderManager.addToRenderStack(this.renderData);
    };
    return BoxColliderRenderer;
}(Component_1.RenderComponent));
//# sourceMappingURL=BoxCollider.js.map