"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tileset = void 0;
var Vector2_1 = require("./Math/Vector2");
var Tile_1 = require("./Core/Tilemap/Tile");
var Tileset = /** @class */ (function () {
    function Tileset(config) {
        var _a, _b;
        this.image = null;
        this.offset = new Vector2_1.Vector2(0, 0);
        this.tileOffset = new Vector2_1.Vector2(0, 0);
        this._tiles = [];
        this.image = config.image;
        this.tileWidth = config.tileWidth;
        this.tileHeight = config.tileHeight;
        this.gridWidth = config.gridWidth;
        this.gridHeight = config.gridHeight;
        this.offset = (_a = config.offset) !== null && _a !== void 0 ? _a : this.offset;
        this.tileOffset = (_b = config.tileOffset) !== null && _b !== void 0 ? _b : this.tileOffset;
        this.generateTiles();
    }
    Tileset.prototype.generateTiles = function () {
        var index = 0;
        for (var row = 0; row < this.gridHeight; row++) {
            for (var col = 0; col < this.gridWidth; col++) {
                this._tiles[index] = new Tile_1.Tile(col * this.tileWidth + this.offset.x + this.tileOffset.x, row * this.tileHeight - this.offset.y - this.tileOffset.y, this.tileWidth, this.tileHeight);
                index++;
            }
        }
    };
    Tileset.prototype.getTile = function (index) {
        return this._tiles[index] ? this._tiles[index] : null;
    };
    Object.defineProperty(Tileset.prototype, "tiles", {
        get: function () {
            return this._tiles;
        },
        enumerable: false,
        configurable: true
    });
    return Tileset;
}());
exports.Tileset = Tileset;
//# sourceMappingURL=Tileset.js.map