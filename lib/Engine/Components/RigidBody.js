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
exports.RigidBody = exports.TYPE_RIGIDBODY = exports.RigidBodyType = void 0;
var Component_1 = require("../Component");
var Game_1 = require("../Game");
var Vector2_1 = require("../Math/Vector2");
var ColliderComponent_1 = require("./Colliders/ColliderComponent");
var RigidBodyType;
(function (RigidBodyType) {
    RigidBodyType[RigidBodyType["Static"] = 0] = "Static";
    RigidBodyType[RigidBodyType["Dynamic"] = 1] = "Dynamic";
})(RigidBodyType = exports.RigidBodyType || (exports.RigidBodyType = {}));
exports.TYPE_RIGIDBODY = "RigidBody";
var RigidBody = /** @class */ (function (_super) {
    __extends(RigidBody, _super);
    function RigidBody(config) {
        var _a;
        var _this = _super.call(this) || this;
        _this.velocityScale = 60;
        _this.gravityScale = 9.8;
        _this._colliderComponents = [];
        _this._layersToCollide = [];
        _this._velocity = new Vector2_1.Vector2();
        _this._gravity = new Vector2_1.Vector2();
        _this.collisions = [];
        _this.penetrationPerDirection = {
            x: new Map(),
            y: new Map(),
        };
        _this.timeManager = Game_1.container.getSingleton("TimeManager");
        _this.type = exports.TYPE_RIGIDBODY;
        _this.allowMultiple = false;
        _this._rigidBodyType = config.rigidBodyType;
        _this._layersToCollide = config.layersToCollide;
        _this._gravity.set(0, (_a = config.gravity) !== null && _a !== void 0 ? _a : _this._gravity.y);
        return _this;
    }
    Object.defineProperty(RigidBody.prototype, "rigidBodyType", {
        get: function () {
            return this._rigidBodyType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RigidBody.prototype, "velocity", {
        get: function () {
            return this._velocity;
        },
        set: function (velocity) {
            this._velocity.set(velocity.x, velocity.y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RigidBody.prototype, "gravity", {
        get: function () {
            return this._gravity.y;
        },
        set: function (gravity) {
            this._gravity.set(this._gravity.x, gravity);
        },
        enumerable: false,
        configurable: true
    });
    RigidBody.prototype.start = function () {
        var _this = this;
        this.gameObject
            .getComponents()
            .forEach(function (component) {
            return component instanceof ColliderComponent_1.ColliderComponent && component.physics
                ? _this._colliderComponents.push(component)
                : null;
        });
    };
    RigidBody.prototype.update = function () {
        if (this._rigidBodyType === RigidBodyType.Static) {
            return;
        }
        this.applyGravity();
        this.applyVelocity();
    };
    RigidBody.prototype.applyGravity = function () {
        if (this._gravity.y > 0) {
            this._velocity = this._velocity.add(this._gravity.mult(-this.gravityScale * this.timeManager.deltaTime));
        }
    };
    RigidBody.prototype.applyVelocity = function () {
        this.deltaVelocity = this._velocity.mult(this.velocityScale * this.timeManager.deltaTime);
        if (this._velocity.x !== 0) {
            this.moveX();
        }
        if (this._velocity.y !== 0) {
            this.moveY();
        }
    };
    RigidBody.prototype.moveX = function () {
        var _this = this;
        this.penetrationPerDirection.x.clear();
        this.gameObject.transform.position.set(this.gameObject.transform.position.x + this.deltaVelocity.x, this.gameObject.transform.position.y);
        this.updateCollisions();
        this.collisions.forEach(function (collision) {
            var _a;
            if (collision.remoteCollider.physics === true &&
                collision.remoteCollider.gameObject.getComponentByType(exports.TYPE_RIGIDBODY) !== null &&
                collision.collisionData.direction.x !== 0) {
                _this.penetrationPerDirection.x.set(collision.collisionData.direction.x, Math.max((_a = _this.penetrationPerDirection.x.get(collision.collisionData.direction.x)) !== null && _a !== void 0 ? _a : 0, collision.collisionData.penetration));
            }
        });
        this.penetrationPerDirection.x.forEach(function (penetration, direction) {
            var pen = direction * penetration;
            _this.gameObject.transform.position.set(_this.gameObject.transform.position.x + pen, _this.gameObject.transform.position.y);
            if (_this._velocity.unit().x !== direction) {
                _this._velocity.set(0, _this._velocity.y);
            }
        });
    };
    RigidBody.prototype.moveY = function () {
        var _this = this;
        this.penetrationPerDirection.y.clear();
        this.gameObject.transform.position.set(this.gameObject.transform.position.x, this.gameObject.transform.position.y + this.deltaVelocity.y);
        this.updateCollisions();
        this.collisions.forEach(function (collision) {
            var _a;
            if (collision.remoteCollider.physics === true &&
                collision.remoteCollider.gameObject.getComponentByType(exports.TYPE_RIGIDBODY) !== null &&
                collision.collisionData.direction.y !== 0) {
                _this.penetrationPerDirection.y.set(collision.collisionData.direction.y, Math.max((_a = _this.penetrationPerDirection.y.get(collision.collisionData.direction.y)) !== null && _a !== void 0 ? _a : 0, collision.collisionData.penetration));
            }
        });
        this.penetrationPerDirection.y.forEach(function (penetration, direction) {
            var pen = direction * penetration;
            _this.gameObject.transform.position.set(_this.gameObject.transform.position.x, _this.gameObject.transform.position.y + pen);
            if (_this._velocity.unit().y !== direction) {
                _this._velocity.set(_this._velocity.x, 0);
            }
        });
    };
    RigidBody.prototype.updateCollisions = function () {
        var _this = this;
        this.collisions = [];
        this._colliderComponents.forEach(function (collider) {
            return _this._layersToCollide.forEach(function (layer) {
                return collider.getCollisionsWithLayer(layer).forEach(function (collision) {
                    _this.collisions.push(collision);
                });
            });
        });
    };
    return RigidBody;
}(Component_1.PhysicsComponent));
exports.RigidBody = RigidBody;
//# sourceMappingURL=RigidBody.js.map