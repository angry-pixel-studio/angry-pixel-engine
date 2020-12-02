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
        _this._colliderComponents = [];
        _this._gravity = 1;
        _this._layersToCollide = [];
        _this._velocity = new Vector2_1.Vector2(0, 0);
        _this.deltaVelocity = 0;
        _this.collisions = [];
        _this.timeManager = Game_1.container.getSingleton("TimeManager");
        _this.type = exports.TYPE_RIGIDBODY;
        _this.allowMultiple = false;
        _this._rigidBodyType = config.rigidBodyType;
        _this._colliderComponents = config.colliders;
        _this._layersToCollide = config.layersToCollide;
        _this._gravity = (_a = config.gravity) !== null && _a !== void 0 ? _a : _this._gravity;
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
            return this._gravity;
        },
        set: function (gravity) {
            this._gravity = gravity;
        },
        enumerable: false,
        configurable: true
    });
    RigidBody.prototype.update = function () {
        if (this._rigidBodyType === RigidBodyType.Static) {
            return;
        }
        this.applyGravityToVelocity();
        this.moveGameObject();
    };
    RigidBody.prototype.applyGravityToVelocity = function () {
        if (this._gravity > 0) {
            this._velocity.set(this._velocity.x, this._velocity.y - this._gravity * this.timeManager.deltaTime);
        }
    };
    RigidBody.prototype.moveGameObject = function () {
        if (this._velocity.x !== 0) {
            this.moveX();
        }
        if (this._velocity.y !== 0) {
            this.moveY();
        }
    };
    RigidBody.prototype.moveX = function () {
        var _this = this;
        this.deltaVelocity = this._velocity.x * this.timeManager.deltaTime;
        this.gameObject.transform.position.set(this.gameObject.transform.position.x + this.deltaVelocity, this.gameObject.transform.position.y);
        this.updateCollisions();
        var rollback = false;
        this.collisions.forEach(function (collision) {
            var rigidBody = collision.remoteCollider.gameObject.getComponentByType(exports.TYPE_RIGIDBODY);
            if (rigidBody !== null) {
                rollback || (rollback = (_this.deltaVelocity > 0 &&
                    collision.remoteCollider.coordinates.x >= collision.localCollider.coordinates.x) ||
                    (_this.deltaVelocity < 0 &&
                        collision.remoteCollider.coordinates.x <= collision.localCollider.coordinates.x));
            }
        });
        if (rollback) {
            this.gameObject.transform.position.set(this.gameObject.transform.position.x - this.deltaVelocity, this.gameObject.transform.position.y);
            this._velocity.set(0, this._velocity.y);
        }
    };
    RigidBody.prototype.moveY = function () {
        var _this = this;
        this.deltaVelocity = this._velocity.y * this.timeManager.deltaTime;
        this.gameObject.transform.position.set(this.gameObject.transform.position.x, this.gameObject.transform.position.y + this.deltaVelocity);
        this.updateCollisions();
        var rollback = false;
        this.collisions.forEach(function (collision) {
            var rigidBody = collision.remoteCollider.gameObject.getComponentByType(exports.TYPE_RIGIDBODY);
            if (rigidBody !== null) {
                rollback || (rollback = (_this.deltaVelocity > 0 &&
                    collision.remoteCollider.coordinates.y >= collision.localCollider.coordinates.y) ||
                    (_this.deltaVelocity < 0 &&
                        collision.remoteCollider.coordinates.y <= collision.localCollider.coordinates.y));
            }
        });
        if (rollback) {
            this.gameObject.transform.position.set(this.gameObject.transform.position.x, this.gameObject.transform.position.y - this.deltaVelocity);
            this._velocity.set(this._velocity.x, 0);
        }
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