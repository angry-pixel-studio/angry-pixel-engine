"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeAxisProjection = void 0;
var ShapeAxisProjection = /** @class */ (function () {
    function ShapeAxisProjection(min, max, collisionVertex) {
        this._min = min;
        this._max = max;
        this._collisionVertex = collisionVertex;
    }
    Object.defineProperty(ShapeAxisProjection.prototype, "min", {
        get: function () {
            return this._min;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShapeAxisProjection.prototype, "max", {
        get: function () {
            return this._max;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShapeAxisProjection.prototype, "collisionVertex", {
        get: function () {
            return this._collisionVertex;
        },
        enumerable: false,
        configurable: true
    });
    return ShapeAxisProjection;
}());
exports.ShapeAxisProjection = ShapeAxisProjection;
//# sourceMappingURL=ShapeAxisProjection.js.map