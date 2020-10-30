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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractColliderComponent = void 0;
var Component_1 = require("../../Component");
var Game_1 = require("../../Game");
var AbstractColliderComponent = /** @class */ (function (_super) {
    __extends(AbstractColliderComponent, _super);
    function AbstractColliderComponent() {
        var _this = _super.call(this) || this;
        _this.collisionManager = Game_1.container.getSingleton("CollisionManager");
        _this.colliders = [];
        return _this;
    }
    AbstractColliderComponent.prototype.addCollider = function (collider) {
        this.colliders.push(collider);
        this.collisionManager.addCollider(collider);
    };
    AbstractColliderComponent.prototype.collidesWithLayer = function (layer) {
        return this.getCollisionWithLayer(layer) !== null;
    };
    AbstractColliderComponent.prototype.getCollisionWithLayer = function (layer) {
        this.updateCoordinates();
        for (var _i = 0, _a = this.colliders; _i < _a.length; _i++) {
            var collider = _a[_i];
            var collisions = this.collisionManager.getCollisionsForCollider(collider);
            for (var _b = 0, collisions_1 = collisions; _b < collisions_1.length; _b++) {
                var foreignCollider = collisions_1[_b];
                if (foreignCollider.gameObject.layer === layer) {
                    return foreignCollider;
                }
            }
        }
        return null;
    };
    AbstractColliderComponent.prototype.setActive = function (active) {
        var _this = this;
        if (active === true && this.active === false) {
            this.colliders.forEach(function (collider) { return _this.collisionManager.addCollider(collider); });
        }
        else if (active === false && this.active === true) {
            this.colliders.forEach(function (collider) { return _this.collisionManager.removeCollider(collider); });
        }
        _super.prototype.setActive.call(this, active);
    };
    AbstractColliderComponent.prototype.destroy = function () {
        var _this = this;
        this.colliders.forEach(function (collider) { return _this.collisionManager.removeCollider(collider); });
        _super.prototype.destroy.call(this);
    };
    return AbstractColliderComponent;
}(Component_1.Component));
exports.AbstractColliderComponent = AbstractColliderComponent;
//# sourceMappingURL=AbstractColliderComponent.js.map