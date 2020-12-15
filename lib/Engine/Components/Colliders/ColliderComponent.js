"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColliderComponent = void 0;
var Component_1 = require("../../Component");
var Game_1 = require("../../Game");
var ColliderComponent = /** @class */ (function (_super) {
    __extends(ColliderComponent, _super);
    function ColliderComponent() {
        var _this = _super.call(this) || this;
        _this.collisionManager = Game_1.container.getSingleton("CollisionManager");
        _this.colliders = [];
        _this._physics = true;
        _this.collisionsCache = [];
        return _this;
    }
    Object.defineProperty(ColliderComponent.prototype, "physics", {
        get: function () {
            return this._physics;
        },
        enumerable: false,
        configurable: true
    });
    ColliderComponent.prototype.addCollider = function (collider) {
        this.colliders.push(collider);
        this.collisionManager.addCollider(collider);
    };
    ColliderComponent.prototype.collidesWithLayer = function (layer) {
        return this.getCollisionWithLayer(layer) !== null;
    };
    ColliderComponent.prototype.getCollisionWithLayer = function (layer) {
        this.updatePosition();
        for (var _i = 0, _a = this.colliders; _i < _a.length; _i++) {
            var collider = _a[_i];
            var collisions = this.collisionManager.getCollisionsForCollider(collider);
            for (var _b = 0, collisions_1 = collisions; _b < collisions_1.length; _b++) {
                var collision = collisions_1[_b];
                if (collision.remoteCollider.gameObject.layer === layer) {
                    return collision;
                }
            }
        }
        return null;
    };
    ColliderComponent.prototype.getCollisionsWithLayer = function (layer) {
        this.updatePosition();
        this.collisionsCache = [];
        for (var _i = 0, _a = this.colliders; _i < _a.length; _i++) {
            var collider = _a[_i];
            var collisions = this.collisionManager.getCollisionsForCollider(collider);
            for (var _b = 0, collisions_2 = collisions; _b < collisions_2.length; _b++) {
                var collision = collisions_2[_b];
                if (collision.remoteCollider.gameObject.layer === layer) {
                    this.collisionsCache.push(collision);
                }
            }
        }
        return __spreadArrays(this.collisionsCache);
    };
    ColliderComponent.prototype.setActive = function (active) {
        var _this = this;
        if (active === true && this.active === false) {
            this.colliders.forEach(function (collider) { return _this.collisionManager.addCollider(collider); });
        }
        else if (active === false && this.active === true) {
            this.colliders.forEach(function (collider) { return _this.collisionManager.removeCollider(collider); });
        }
        _super.prototype.setActive.call(this, active);
    };
    ColliderComponent.prototype.destroy = function () {
        var _this = this;
        this.colliders.forEach(function (collider) { return _this.collisionManager.removeCollider(collider); });
        _super.prototype.destroy.call(this);
    };
    return ColliderComponent;
}(Component_1.Component));
exports.ColliderComponent = ColliderComponent;
//# sourceMappingURL=ColliderComponent.js.map