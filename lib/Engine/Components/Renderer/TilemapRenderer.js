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
exports.TilemapRenderer = exports.TYPE_TILEMAP_RENDERER = void 0;
var AbstractTilemapRenderer_1 = require("./Tilemap/AbstractTilemapRenderer");
var MAX_TILES = 999;
var FLIP_H = 1; // flip horizontal
var FLIP_V = 2; // flip vertical
var FLIP_B = 3; // flip both horizontal and vertical
exports.TYPE_TILEMAP_RENDERER = "TilemapRenderer";
var TilemapRenderer = /** @class */ (function (_super) {
    __extends(TilemapRenderer, _super);
    function TilemapRenderer(_a) {
        var tileset = _a.tileset, tilemapData = _a.tilemapData, _b = _a.tileScale, tileScale = _b === void 0 ? 1 : _b, _c = _a.smooth, smooth = _c === void 0 ? true : _c, _d = _a.alpha, alpha = _d === void 0 ? 1 : _d;
        var _this = _super.call(this) || this;
        _this.alpha = 1;
        _this.type = exports.TYPE_TILEMAP_RENDERER;
        _this.tileset = tileset;
        _this.tilemapData = tilemapData;
        _this.tileScale = tileScale;
        _this.smooth = smooth;
        _this.alpha = alpha;
        return _this;
    }
    TilemapRenderer.prototype.processTilemap = function () {
        var _this = this;
        var rows = this.tilemapData.trim().split("\n");
        rows.forEach(function (rowData, row) {
            var parsedRow = rowData.split(",");
            parsedRow.forEach(function (data, col) {
                var parsed = parseInt(data.trim());
                if (isNaN(parsed) === false) {
                    var id = parsed > MAX_TILES ? parsed % 1000 : parsed;
                    var flipDigit = Math.round(parsed / 1000);
                    var tile = _this.tileset.getTile(id);
                    var flip = { h: [FLIP_H, FLIP_B].includes(flipDigit), v: [FLIP_V, FLIP_B].includes(flipDigit) };
                    if (flipDigit > 0) {
                        console.log(flip);
                    }
                    if (tile !== null) {
                        _this.processTile(tile, col, row, _this.alpha, flip);
                    }
                }
            });
        });
        this.tilemapProcessed = true;
    };
    return TilemapRenderer;
}(AbstractTilemapRenderer_1.AbstractTilemapRenderer));
exports.TilemapRenderer = TilemapRenderer;
//# sourceMappingURL=TilemapRenderer.js.map