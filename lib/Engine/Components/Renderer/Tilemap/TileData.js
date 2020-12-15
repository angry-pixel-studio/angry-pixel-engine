"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileData = void 0;
var Vector2_1 = require("../../../Math/Vector2");
var TileData = /** @class */ (function () {
    function TileData(position, width, height) {
        this._position = new Vector2_1.Vector2();
        this._position.set(position.x, position.y);
        this._width = width;
        this._height = height;
    }
    Object.defineProperty(TileData.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TileData.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TileData.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: false,
        configurable: true
    });
    return TileData;
}());
exports.TileData = TileData;
//# sourceMappingURL=TileData.js.map