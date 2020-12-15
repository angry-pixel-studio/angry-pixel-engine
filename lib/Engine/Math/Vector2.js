"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Vector2.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (x) {
            this._x = x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (y) {
            this._y = y;
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
    Vector2.prototype.add = function (vector) {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    };
    Vector2.prototype.substract = function (vector) {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    };
    Vector2.prototype.mult = function (number) {
        return new Vector2(this.x * number, this.y * number);
    };
    Vector2.prototype.normal = function () {
        return new Vector2(-this.y, this.x).unit();
    };
    Vector2.prototype.unit = function () {
        if (this.magnitude === 0) {
            return new Vector2(0, 0);
        }
        else {
            return new Vector2(Math.round(this.x / this.magnitude), Math.round(this.y / this.magnitude));
        }
    };
    Vector2.prototype.clone = function () {
        return new Vector2(this._x, this._y);
    };
    Vector2.dot = function (vector1, vector2) {
        return vector1.x * vector2.x + vector1.y * vector2.y;
    };
    Vector2.cross = function (vector1, vector2) {
        return vector1.x * vector2.y - vector1.y * vector2.x;
    };
    return Vector2;
}());
exports.Vector2 = Vector2;
//# sourceMappingURL=Vector2.js.map