"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shape = exports.ShapeType = void 0;
var ShapeType;
(function (ShapeType) {
    ShapeType[ShapeType["Rectangle"] = 0] = "Rectangle";
})(ShapeType = exports.ShapeType || (exports.ShapeType = {}));
var Shape = /** @class */ (function () {
    function Shape() {
        this._position = null;
        this._vertex = [];
        this._direction = null;
        this._height = 0;
        this._width = 0;
        this._angle = 0;
    }
    Object.defineProperty(Shape.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (position) {
            this._position.set(position.x, position.y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "angle", {
        get: function () {
            return this._angle;
        },
        set: function (angle) {
            this._angle = angle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "vertex", {
        get: function () {
            return this._vertex;
        },
        enumerable: false,
        configurable: true
    });
    return Shape;
}());
exports.Shape = Shape;
//# sourceMappingURL=Shape.js.map