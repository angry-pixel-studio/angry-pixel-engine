"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollisionManager = void 0;
var GeometricRenderData_1 = require("../Rendering/RenderData/GeometricRenderData");
var GameObject_1 = require("./../../GameObject");
var Rectangle_1 = require("./../../Libs/Geometric/Shapes/Rectangle");
var Vector2_1 = require("./../../Helper/Vector2");
var QuadTree_1 = require("./QuadTree");
var CollisionManager = /** @class */ (function () {
    function CollisionManager(renderManager) {
        this.debug = true;
        this.colliders = [];
        this.renderManager = renderManager;
        // TODO: remove hardcoded quad size
        this.quad = new QuadTree_1.QuadTree(0, new Rectangle_1.Rectangle(-2500, -2500, 5000, 5000));
    }
    CollisionManager.prototype.prepare = function () {
        //this.debugQuads(this.quad);
        this.refreshQuad();
    };
    CollisionManager.prototype.addCollider = function (collider) {
        this.colliders.push(collider);
    };
    CollisionManager.prototype.removeCollider = function (collider) {
        var index = this.colliders.indexOf(collider);
        if (index !== -1) {
            delete this.colliders[index];
            this.colliders.splice(index, 1);
        }
    };
    CollisionManager.prototype.getCollisionsForCollider = function (collider) {
        var colliders = this.broadPhase(collider);
        return this.narrowPhase(collider, colliders);
    };
    // broadPhase takes care of looking for possible collisions
    CollisionManager.prototype.broadPhase = function (collider) {
        return this.quad.retrieve(collider);
    };
    // narrowPhase takes care of checking for actual collision
    CollisionManager.prototype.narrowPhase = function (collider, colliders) {
        var collisions = [];
        for (var _i = 0, colliders_1 = colliders; _i < colliders_1.length; _i++) {
            var c = colliders_1[_i];
            if (collider.hasCollision(c)) {
                collisions.push(c);
            }
        }
        return collisions;
    };
    CollisionManager.prototype.refreshQuad = function () {
        this.quad.clear();
        for (var _i = 0, _a = this.colliders; _i < _a.length; _i++) {
            var collider = _a[_i];
            this.quad.insert(collider);
        }
    };
    CollisionManager.prototype.debugQuads = function (quad) {
        if (!this.debug) {
            return;
        }
        var renderData = new GeometricRenderData_1.GeometricRenderData();
        renderData.position = new Vector2_1.Vector2(quad.bounds.x, quad.bounds.y);
        renderData.layer = GameObject_1.LAYER_DEFAULT;
        renderData.geometric = quad.bounds;
        renderData.geometricType = GeometricRenderData_1.GEOMETRIC_RECTANGLE;
        renderData.color = "#0000FF";
        this.renderManager.addToRenderStack(renderData);
        for (var _i = 0, _a = quad.quadrants; _i < _a.length; _i++) {
            var q = _a[_i];
            this.debugQuads(q);
        }
    };
    return CollisionManager;
}());
exports.CollisionManager = CollisionManager;
//# sourceMappingURL=CollisionManager.js.map