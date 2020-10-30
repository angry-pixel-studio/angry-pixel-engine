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
exports.TilemapRenderer = void 0;
var AbstractTilemapRenderer_1 = require("./Tilemap/AbstractTilemapRenderer");
var TilemapRenderer = /** @class */ (function (_super) {
    __extends(TilemapRenderer, _super);
    function TilemapRenderer(config) {
        var _a, _b, _c;
        var _this = _super.call(this) || this;
        _this.alpha = 1;
        _this.tileset = config.tileset;
        _this.tilemapData = config.tilemapData;
        _this.tileScale = (_a = config.tileScale) !== null && _a !== void 0 ? _a : _this.tileScale;
        _this.smooth = (_b = config.smooth) !== null && _b !== void 0 ? _b : _this.smooth;
        _this.alpha = (_c = config.alpha) !== null && _c !== void 0 ? _c : _this.alpha;
        return _this;
    }
    TilemapRenderer.prototype.processTilemap = function () {
        var _this = this;
        var data = this.tilemapData.trim().split("\n");
        data.forEach(function (rowData, row) {
            var parsedRow = rowData.match(/.{1,5}/g);
            if (parsedRow) {
                parsedRow.forEach(function (colData, col) {
                    var stringId = colData.trim().replace("[", "").replace("]", "");
                    var tile = _this.tileset.getTile(parseInt(stringId));
                    if (tile !== null) {
                        _this.processTile(tile, col, row, _this.alpha);
                    }
                });
            }
        });
        this.tilemapProcessed = true;
    };
    return TilemapRenderer;
}(AbstractTilemapRenderer_1.AbstractTilemapRenderer));
exports.TilemapRenderer = TilemapRenderer;
//# sourceMappingURL=TilemapRenderer.js.map