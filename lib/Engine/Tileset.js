"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tileset = void 0;
var Vector2_1 = require("./Helper/Vector2");
var Rectangle_1 = require("./Libs/Geometric/Shapes/Rectangle");
var Tileset = /** @class */ (function () {
    function Tileset(_a) {
        var _this = this;
        var image = _a.image, tileWidth = _a.tileWidth, tileHeight = _a.tileHeight, gridWidth = _a.gridWidth, gridHeight = _a.gridHeight, offset = _a.offset, tileOffset = _a.tileOffset;
        this.image = null;
        this.offset = new Vector2_1.Vector2(0, 0);
        this.gridWidth = 0; // in number of tails
        this.gridHeight = 0; // in number of tails
        this.tileWidth = 0;
        this.tileHeight = 0;
        this.tileOffset = new Vector2_1.Vector2(0, 0);
        this._tiles = [];
        this._loaded = false;
        // required
        this.image = image;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        // optional
        this.offset = offset ? offset : this.offset;
        this.tileOffset = tileOffset ? tileOffset : this.tileOffset;
        if (this.image.naturalWidth) {
            this.generateTiles();
        }
        else {
            this.image.addEventListener("load", function () { return _this.generateTiles(); });
        }
    }
    Tileset.prototype.generateTiles = function () {
        var index = 0;
        for (var row = 0; row < this.gridHeight; row++) {
            for (var col = 0; col < this.gridWidth; col++) {
                this._tiles[index] = new Rectangle_1.Rectangle(col * this.tileWidth + this.offset.x + this.tileOffset.x, row * this.tileHeight - this.offset.y - this.tileOffset.y, this.tileWidth, this.tileHeight);
                index++;
            }
        }
        this._loaded = true;
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
    Object.defineProperty(Tileset.prototype, "loaded", {
        get: function () {
            return this._loaded;
        },
        enumerable: false,
        configurable: true
    });
    return Tileset;
}());
exports.Tileset = Tileset;
//# sourceMappingURL=Tileset.js.map