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
exports.TiledRenderer = void 0;
var AbstractTilemapRenderer_1 = require("./Tilemap/AbstractTilemapRenderer");
var TiledRenderer = /** @class */ (function (_super) {
    __extends(TiledRenderer, _super);
    function TiledRenderer(config) {
        var _a, _b;
        var _this = _super.call(this) || this;
        _this.tileset = config.tileset;
        _this.tiledTilemap = config.tilemapData;
        _this.tileScale = (_a = config.tileScale) !== null && _a !== void 0 ? _a : _this.tileScale;
        _this.smooth = (_b = config.smooth) !== null && _b !== void 0 ? _b : _this.smooth;
        return _this;
    }
    TiledRenderer.prototype.processTilemap = function () {
        var _this = this;
        this.tiledTilemap.layers.forEach(function (layer) {
            return _this.tiledTilemap.infinite === true
                ? layer.chunks.forEach(function (chunk) { return _this.processChunk(chunk, layer.opacity); })
                : _this.processChunk(layer, layer.opacity);
        });
        this.tilemapProcessed = true;
    };
    TiledRenderer.prototype.processChunk = function (chunk, alpha) {
        if (alpha === void 0) { alpha = 1; }
        var dataIndex = 0;
        for (var row = 0; row < chunk.height; row++) {
            for (var col = 0; col < chunk.width; col++) {
                var tile = this.tileset.getTile(chunk.data[dataIndex] - 1);
                if (tile !== null) {
                    this.processTile(tile, col + chunk.x, row + chunk.y, alpha);
                }
                dataIndex++;
            }
        }
    };
    return TiledRenderer;
}(AbstractTilemapRenderer_1.AbstractTilemapRenderer));
exports.TiledRenderer = TiledRenderer;
//# sourceMappingURL=TiledRenderer.js.map