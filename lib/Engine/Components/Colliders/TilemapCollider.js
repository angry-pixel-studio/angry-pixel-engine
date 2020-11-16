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
exports.TilemapCollider = exports.TYPE_TILEMAP_COLLIDER = void 0;
var RectangleCollider_1 = require("../../Core/Collision/Collider/RectangleCollider");
var GeometricRenderData_1 = require("../../Core/Rendering/RenderData/GeometricRenderData");
var Game_1 = require("../../Game");
var GameObject_1 = require("../../GameObject");
var Vector2_1 = require("../../Helper/Vector2");
var ColliderComponent_1 = require("./ColliderComponent");
exports.TYPE_TILEMAP_COLLIDER = "TilemapCollider";
var TilemapCollider = /** @class */ (function (_super) {
    __extends(TilemapCollider, _super);
    function TilemapCollider(_a) {
        var tilemapRenderer = _a.tilemapRenderer, _b = _a.debug, debug = _b === void 0 ? false : _b;
        var _this = _super.call(this) || this;
        _this.renderManager = Game_1.container.getSingleton("RenderManager");
        _this.tilemapRenderer = null;
        _this.debug = false;
        _this.renderData = [];
        _this.type = exports.TYPE_TILEMAP_COLLIDER;
        _this.tilemapRenderer = tilemapRenderer;
        _this.debug = debug;
        return _this;
    }
    TilemapCollider.prototype.start = function () {
        var _this = this;
        this.tilemapRenderer.tilesData.forEach(function (tileData) {
            _this.addCollider(new RectangleCollider_1.RectangleCollider(new Vector2_1.Vector2(tileData.x, tileData.y), tileData.width, tileData.height, _this.gameObject));
            _this.renderData.push(new GeometricRenderData_1.GeometricRenderData());
        });
    };
    TilemapCollider.prototype.update = function () {
        var _this = this;
        this.colliders.forEach(function (collider, index) {
            if (_this.debug) {
                _this.updateRenderData(_this.renderData[index], collider);
                _this.renderManager.addToRenderStack(_this.renderData[index]);
            }
        });
    };
    TilemapCollider.prototype.updateRenderData = function (renderData, collider) {
        renderData.debug = true;
        renderData.position = collider.coordinates;
        renderData.layer = GameObject_1.LAYER_DEFAULT;
        renderData.geometric = collider;
        renderData.geometricType = GeometricRenderData_1.GEOMETRIC_RECTANGLE;
        renderData.color = "#00FF00";
    };
    TilemapCollider.prototype.updateCoordinates = function () {
        // Tilemap does not update cooliders coordinates;
    };
    return TilemapCollider;
}(ColliderComponent_1.ColliderComponent));
exports.TilemapCollider = TilemapCollider;
//# sourceMappingURL=TilemapCollider.js.map