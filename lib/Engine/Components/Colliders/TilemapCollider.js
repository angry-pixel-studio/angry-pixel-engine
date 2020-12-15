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
var Game_1 = require("../../Game");
var GameObject_1 = require("../../GameObject");
var ColliderComponent_1 = require("./ColliderComponent");
var ColliderRenderData_1 = require("../../Core/Rendering/RenderData/ColliderRenderData");
exports.TYPE_TILEMAP_COLLIDER = "TilemapCollider";
var TilemapCollider = /** @class */ (function (_super) {
    __extends(TilemapCollider, _super);
    function TilemapCollider(config) {
        var _a;
        var _this = _super.call(this) || this;
        _this.renderManager = Game_1.container.getSingleton("RenderManager");
        _this.tilemapRenderer = null;
        _this.debug = false;
        _this.renderData = [];
        _this.type = exports.TYPE_TILEMAP_COLLIDER;
        _this.tilemapRenderer = config.tilemapRenderer;
        _this.debug = (_a = config.debug) !== null && _a !== void 0 ? _a : _this.debug;
        return _this;
    }
    TilemapCollider.prototype.start = function () {
        var _this = this;
        this.tilemapRenderer.tilesData.forEach(function (tileData) {
            _this.addCollider(new RectangleCollider_1.RectangleCollider(tileData.position, tileData.width, tileData.height, _this.gameObject));
            _this.renderData.push(new ColliderRenderData_1.ColliderRenderData());
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
        renderData.position = collider.position;
        renderData.layer = GameObject_1.LAYER_DEFAULT;
        renderData.shape = collider.shape;
        renderData.color = "#00FF00";
    };
    TilemapCollider.prototype.updatePosition = function () {
        // Tilemap does not update cooliders coordinates;
    };
    return TilemapCollider;
}(ColliderComponent_1.ColliderComponent));
exports.TilemapCollider = TilemapCollider;
//# sourceMappingURL=TilemapCollider.js.map