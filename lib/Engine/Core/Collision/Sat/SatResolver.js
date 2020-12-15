"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatResolver = void 0;
var Vector2_1 = require("../../../Math/Vector2");
var Shape_1 = require("../Shape/Shape");
var SatData_1 = require("./SatData");
var ShapeAxisProjection_1 = require("./ShapeAxisProjection");
var SatResolver = /** @class */ (function () {
    function SatResolver() {
    }
    SatResolver.prototype.getSatData = function (shape1, shape2) {
        var minOverlap = null;
        var smallestAxis;
        var vertexObj;
        var axes = this.findAxes(shape1, shape2);
        var firstShapeAxes = this.getShapeAxes(shape1);
        for (var i = 0; i < axes.length; i++) {
            var proj1 = this.projShapeOntoAxis(axes[i], shape1);
            var proj2 = this.projShapeOntoAxis(axes[i], shape2);
            var overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
            if (overlap < 0) {
                return null;
            }
            if ((proj1.max > proj2.max && proj1.min < proj2.min) || (proj1.max < proj2.max && proj1.min > proj2.min)) {
                var mins = Math.abs(proj1.min - proj2.min);
                var maxs = Math.abs(proj1.max - proj2.max);
                if (mins < maxs) {
                    overlap += mins;
                }
                else {
                    overlap += maxs;
                    axes[i] = axes[i].mult(-1);
                }
            }
            if (overlap < minOverlap || minOverlap === null) {
                minOverlap = overlap;
                smallestAxis = axes[i];
                if (i < firstShapeAxes) {
                    vertexObj = shape2;
                    if (proj1.max > proj2.max) {
                        smallestAxis = axes[i].mult(-1);
                    }
                }
                else {
                    vertexObj = shape1;
                    if (proj1.max < proj2.max) {
                        smallestAxis = axes[i].mult(-1);
                    }
                }
            }
        }
        var contactVertex = this.projShapeOntoAxis(smallestAxis, vertexObj).collisionVertex;
        if (vertexObj === shape2) {
            smallestAxis = smallestAxis.mult(-1);
        }
        return new SatData_1.SatData(minOverlap, smallestAxis, contactVertex);
    };
    SatResolver.prototype.findAxes = function (shape1, shape2) {
        var axes = [];
        if (shape1.type === Shape_1.ShapeType.Rectangle) {
            axes.push(shape1.direction.normal());
            axes.push(shape1.direction);
        }
        if (shape2.type === Shape_1.ShapeType.Rectangle) {
            axes.push(shape2.direction.normal());
            axes.push(shape2.direction);
        }
        return axes;
    };
    // returns the number of the axes that belong to an object
    SatResolver.prototype.getShapeAxes = function (shape) {
        if (shape.type === Shape_1.ShapeType.Rectangle) {
            return 2;
        }
    };
    //returns the min and max projection values of a shape onto an axis
    SatResolver.prototype.projShapeOntoAxis = function (axis, shape) {
        var min = Vector2_1.Vector2.dot(axis, shape.vertex[0]);
        var max = min;
        var collisionVertex = shape.vertex[0];
        for (var i = 0; i < shape.vertex.length; i++) {
            var p = Vector2_1.Vector2.dot(axis, shape.vertex[i]);
            if (p < min) {
                min = p;
                collisionVertex = shape.vertex[i];
            }
            if (p > max) {
                max = p;
            }
        }
        return new ShapeAxisProjection_1.ShapeAxisProjection(min, max, collisionVertex);
    };
    return SatResolver;
}());
exports.SatResolver = SatResolver;
//# sourceMappingURL=SatResolver.js.map