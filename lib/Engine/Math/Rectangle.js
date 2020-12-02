"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
var Vector2_1 = require("./Vector2");
var Rectangle = /** @class */ (function () {
    function Rectangle(x, y, width, height) {
        this.position = new Vector2_1.Vector2(0, 0);
        this.width = 0;
        this.height = 0;
        this.set(x, y, width, height);
    }
    Object.defineProperty(Rectangle.prototype, "x", {
        get: function () {
            return this.position.x;
        },
        set: function (value) {
            this.position.set(value, this.position.y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "y", {
        get: function () {
            return this.position.y;
        },
        set: function (value) {
            this.position.set(this.position.x, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "x1", {
        get: function () {
            return this.position.x + this.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "y1", {
        get: function () {
            return this.position.y - this.height;
        },
        enumerable: false,
        configurable: true
    });
    Rectangle.prototype.set = function (x, y, width, height) {
        this.setPosition(x, y);
        this.width = width;
        this.height = height;
    };
    Rectangle.prototype.setPosition = function (x, y) {
        this.position.set(x, y);
    };
    Rectangle.prototype.updateFromRect = function (rect) {
        this.set(rect.x, rect.y, rect.width, rect.height);
    };
    Rectangle.prototype.overlappingRectangle = function (rect) {
        return this.x1 >= rect.x && this.x <= rect.x1 && this.y1 <= rect.y && this.y >= rect.y1;
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
//# sourceMappingURL=Rectangle.js.map