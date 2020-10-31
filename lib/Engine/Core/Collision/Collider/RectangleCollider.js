"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RectangleCollider = void 0;
var Vector2_1 = require("../../../Helper/Vector2");
var ICollider_1 = require("./ICollider");
var RectangleCollider = /** @class */ (function () {
    function RectangleCollider(coordinates, width, height, gameObject) {
        this.type = ICollider_1.ColliderType.Rectangle;
        this.points = [new Vector2_1.Vector2(0, 0), new Vector2_1.Vector2(0, 0), new Vector2_1.Vector2(0, 0), new Vector2_1.Vector2(0, 0)];
        this._coordinates = new Vector2_1.Vector2(0, 0);
        this._width = 0;
        this._height = 0;
        this._coordinates.set(coordinates.x, coordinates.y);
        this._width = width;
        this._height = height;
        this.gameObject = gameObject;
        this.updatePoints();
    }
    Object.defineProperty(RectangleCollider.prototype, "coordinates", {
        get: function () {
            return this._coordinates;
        },
        set: function (coordinates) {
            this._coordinates.set(coordinates.x, coordinates.y);
            this.updatePoints();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RectangleCollider.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (width) {
            this._width = width;
            this.updatePoints();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RectangleCollider.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (height) {
            this._height = height;
            this.updatePoints();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RectangleCollider.prototype, "bottomLeftPoint", {
        get: function () {
            return this.points[3];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RectangleCollider.prototype, "bottomRightPoint", {
        get: function () {
            return this.points[2];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RectangleCollider.prototype, "topLeftPoint", {
        get: function () {
            return this.points[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RectangleCollider.prototype, "topRightPoint", {
        get: function () {
            return this.points[1];
        },
        enumerable: false,
        configurable: true
    });
    RectangleCollider.prototype.hasCollision = function (collider) {
        switch (collider.type) {
            case ICollider_1.ColliderType.Rectangle:
                return (this.topRightPoint.x >= collider.topLeftPoint.x &&
                    this.topLeftPoint.x <= collider.topRightPoint.x &&
                    this.bottomLeftPoint.y <= collider.topLeftPoint.y &&
                    this.topLeftPoint.y >= collider.bottomLeftPoint.y);
            case ICollider_1.ColliderType.Polygon:
                return false;
            case ICollider_1.ColliderType.Circle:
                return false;
        }
    };
    RectangleCollider.prototype.updatePoints = function () {
        this.points[0].set(this._coordinates.x, this._coordinates.y);
        this.points[1].set(this._coordinates.x + this._width, this._coordinates.y);
        this.points[2].set(this._coordinates.x + this._width, this._coordinates.y - this._height);
        this.points[3].set(this._coordinates.x, this._coordinates.y - this._height);
    };
    return RectangleCollider;
}());
exports.RectangleCollider = RectangleCollider;
//# sourceMappingURL=RectangleCollider.js.map