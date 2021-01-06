"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
var Vector2_1 = require("./Vector2");
var Rectangle = /** @class */ (function () {
    function Rectangle(x, y, width, height) {
        this._position = new Vector2_1.Vector2();
        this._center = new Vector2_1.Vector2();
        this._width = 0;
        this._height = 0;
        this.set(x, y, width, height);
    }
    Object.defineProperty(Rectangle.prototype, "x", {
        get: function () {
            return this._position.x;
        },
        set: function (value) {
            this._position.set(value, this._position.y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "y", {
        get: function () {
            return this._position.y;
        },
        set: function (value) {
            this._position.set(this._position.x, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "x1", {
        get: function () {
            return this._position.x + this._width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "y1", {
        get: function () {
            return this._position.y + this._height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (position) {
            this._position.set(position.x, position.y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (width) {
            this._width = width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (height) {
            this._height = height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "center", {
        get: function () {
            this._center.set(this.x + this.width / 2, this.y + this.height / 2);
            return this._center;
        },
        enumerable: false,
        configurable: true
    });
    Rectangle.prototype.set = function (x, y, width, height) {
        this._position.set(x, y);
        this._width = width;
        this._height = height;
    };
    Rectangle.prototype.updateFromRect = function (rect) {
        this.set(rect.x, rect.y, rect.width, rect.height);
    };
    Rectangle.prototype.overlappingRectangle = function (rect) {
        return this.x1 >= rect.x && this.x <= rect.x1 && this.y1 >= rect.y && this.y <= rect.y1;
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
//# sourceMappingURL=Rectangle.js.map