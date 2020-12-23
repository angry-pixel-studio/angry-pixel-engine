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
var Component_1 = require("../../Component");
var Vector2_1 = require("../../Math/Vector2");
exports.TYPE_TILEMAP_COLLIDER = "TilemapCollider";
var TilemapCollider = /** @class */ (function (_super) {
    __extends(TilemapCollider, _super);
    function TilemapCollider(config) {
        var _a;
        var _this = _super.call(this) || this;
        _this.tilemapRenderer = null;
        _this.debug = false;
        _this.needsCollider = function (tileData) {
            _this.cacheVertex[0].set(tileData.position.x, tileData.position.y + tileData.height);
            _this.cacheVertex[1].set(tileData.position.x + tileData.width, tileData.position.y);
            _this.cacheVertex[2].set(tileData.position.x, tileData.position.y - tileData.height);
            _this.cacheVertex[3].set(tileData.position.x - tileData.width, tileData.position.y);
            var _loop_1 = function (i) {
                if (_this.tilemapRenderer.tilesData.find(function (tileData2) {
                    return tileData2.position.sameAs(_this.cacheVertex[i]);
                }) === undefined) {
                    return { value: true };
                }
            };
            for (var i = 0; i < _this.cacheVertex.length; i++) {
                var state_1 = _loop_1(i);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            return false;
        };
        _this.type = exports.TYPE_TILEMAP_COLLIDER;
        _this.tilemapRenderer = config.tilemapRenderer;
        _this.debug = (_a = config.debug) !== null && _a !== void 0 ? _a : _this.debug;
        _this._physics = true; // todo: fix this shit
        _this.cacheVertex = [new Vector2_1.Vector2(), new Vector2_1.Vector2(), new Vector2_1.Vector2(), new Vector2_1.Vector2()];
        return _this;
    }
    TilemapCollider.prototype.start = function () {
        var _this = this;
        this.tilemapRenderer.tilesData.filter(this.needsCollider).forEach(function (tileData) {
            _this.addCollider(new RectangleCollider_1.RectangleCollider(tileData.position, tileData.width, tileData.height, _this._physics, _this.gameObject));
        });
        if (this.debug) {
            this.gameObject.addComponent(function () { return new TilemapColliderRenderer(_this.colliders); });
        }
    };
    TilemapCollider.prototype.updatePosition = function () {
        // Tilemap does not update cooliders coordinates;
    };
    return TilemapCollider;
}(ColliderComponent_1.ColliderComponent));
exports.TilemapCollider = TilemapCollider;
var TYPE_TILEMAP_COLLIDER_RENDERER = "TilemapColliderRenderer";
var TilemapColliderRenderer = /** @class */ (function (_super) {
    __extends(TilemapColliderRenderer, _super);
    function TilemapColliderRenderer(colliders) {
        var _this = _super.call(this) || this;
        _this.renderManager = Game_1.container.getSingleton("RenderManager");
        _this.renderData = [];
        _this.colliders = [];
        _this.type = TYPE_TILEMAP_COLLIDER_RENDERER;
        _this.colliders = colliders;
        _this.colliders.forEach(function (collider, index) {
            _this.renderData[index] = new ColliderRenderData_1.ColliderRenderData();
            _this.renderData[index].debug = true;
            _this.renderData[index].layer = GameObject_1.LAYER_DEFAULT;
            _this.renderData[index].color = "#00FF00";
        });
        return _this;
    }
    TilemapColliderRenderer.prototype.update = function () {
        var _this = this;
        this.colliders.forEach(function (collider, index) {
            _this.renderData[index].position = collider.position;
            _this.renderData[index].shape = collider.shape;
            _this.renderManager.addToRenderStack(_this.renderData[index]);
        });
    };
    return TilemapColliderRenderer;
}(Component_1.RenderComponent));
//# sourceMappingURL=TilemapCollider.js.map