"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Vector2.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "magnitude", {
        get: function () {
            return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
        },
        enumerable: false,
        configurable: true
    });
    Vector2.prototype.set = function (x, y) {
        this._x = x;
        this._y = y;
    };
    Vector2.prototype.add = function (v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    };
    Vector2.prototype.substract = function (v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    };
    Vector2.prototype.mult = function (n) {
        return new Vector2(this.x * n, this.y * n);
    };
    Vector2.prototype.normal = function () {
        return new Vector2(-this.y, this.x).unit();
    };
    Vector2.prototype.unit = function () {
        if (this.magnitude === 0) {
            return new Vector2(0, 0);
        }
        else {
            return new Vector2(this.x / this.magnitude, this.y / this.magnitude);
        }
    };
    Vector2.dot = function (v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    };
    Vector2.cross = function (v1, v2) {
        return v1.x * v2.y - v1.y * v2.x;
    };
    return Vector2;
}());
exports.Vector2 = Vector2;
//# sourceMappingURL=Vector2.js.map