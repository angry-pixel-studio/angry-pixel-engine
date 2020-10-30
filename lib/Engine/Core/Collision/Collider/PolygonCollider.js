"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonCollider = void 0;
var Vector2_1 = require("../../../Helper/Vector2");
var ICollider_1 = require("./ICollider");
var PolygonCollider = /** @class */ (function () {
    function PolygonCollider(position, points, gameObject) {
        this.type = ICollider_1.ColliderType.Polygon;
        this._coordinates = new Vector2_1.Vector2(0, 0);
        if (points.length < 3) {
            throw new Error("PolygonCollider needs at least three points");
        }
        this.gameObject = gameObject;
        this._coordinates.set(position.x, position.y);
        this._points = points;
        this.createRealPoints();
    }
    Object.defineProperty(PolygonCollider.prototype, "points", {
        get: function () {
            return this._points;
        },
        set: function (points) {
            this._points = points;
            this.createRealPoints();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PolygonCollider.prototype, "coordinates", {
        get: function () {
            return this._coordinates;
        },
        set: function (coordinates) {
            this._coordinates.set(coordinates.x, coordinates.y);
            this.updateRealPoints();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PolygonCollider.prototype, "bottomLeftPoint", {
        get: function () {
            return null; // TODO: implement
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PolygonCollider.prototype, "bottomRightPoint", {
        get: function () {
            return null; // TODO: implement
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PolygonCollider.prototype, "topLeftPoint", {
        get: function () {
            return null; // TODO: implement
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PolygonCollider.prototype, "topRightPoint", {
        get: function () {
            return null; // TODO: implement
        },
        enumerable: false,
        configurable: true
    });
    PolygonCollider.prototype.createRealPoints = function () {
        var _this = this;
        this.realPoints = [];
        this._points.forEach(function (point) { return _this.realPoints.push(new Vector2_1.Vector2(point.x, point.y)); });
    };
    PolygonCollider.prototype.updateRealPoints = function () {
        var _this = this;
        this.realPoints.forEach(function (point, index) {
            return point.set(_this._points[index].x + _this._coordinates.x, _this._points[index].y + _this._coordinates.y);
        });
    };
    PolygonCollider.prototype.hasCollision = function (collider) {
        // TODO: implement
        return false;
    };
    PolygonCollider.prototype.lineIntersection = function (p11, p12, p21, p22) {
        var det = (p12.x - p11.x) * (p22.y - p21.y) - (p22.x - p21.x) * (p12.y - p11.y);
        var lambda = ((p22.y - p21.y) * (p22.x - p11.x) + (p21.x - p22.x) * (p22.y - p11.y)) / det;
        var gamma = ((p11.y - p12.y) * (p22.x - p11.x) + (p12.x - p11.x) * (p22.y - p11.y)) / det;
        return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
    };
    return PolygonCollider;
}());
exports.PolygonCollider = PolygonCollider;
//# sourceMappingURL=PolygonCollider.js.map