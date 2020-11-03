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
exports.RigidBody = exports.RigidBodyType = void 0;
var Component_1 = require("../Component");
var Game_1 = require("../Game");
var Vector2_1 = require("../Helper/Vector2");
var RigidBodyType;
(function (RigidBodyType) {
    RigidBodyType[RigidBodyType["Static"] = 0] = "Static";
    RigidBodyType[RigidBodyType["Dynamic"] = 1] = "Dynamic";
})(RigidBodyType = exports.RigidBodyType || (exports.RigidBodyType = {}));
var RigidBody = /** @class */ (function (_super) {
    __extends(RigidBody, _super);
    function RigidBody(_a) {
        var type = _a.type, colliders = _a.colliders, layersToCollide = _a.layersToCollide, _b = _a.gravity, gravity = _b === void 0 ? 1 : _b;
        var _this = _super.call(this) || this;
        _this._colliders = [];
        _this._gravity = 1;
        _this._layersToCollide = [];
        _this._velocity = new Vector2_1.Vector2(0, 0);
        _this.deltaVelocity = new Vector2_1.Vector2(0, 0);
        _this.gravityTime = 0;
        _this.collisions = [];
        _this.timeManager = Game_1.container.getSingleton("TimeManager");
        _this._type = type;
        _this._colliders = colliders;
        _this._layersToCollide = layersToCollide;
        _this._gravity = gravity;
        return _this;
    }
    Object.defineProperty(RigidBody.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RigidBody.prototype, "velocity", {
        get: function () {
            return this._velocity;
        },
        set: function (velocity) {
            this.velocity.set(velocity.x, velocity.y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RigidBody.prototype, "gravity", {
        get: function () {
            return this._gravity;
        },
        set: function (gravity) {
            this.gravity = gravity;
        },
        enumerable: false,
        configurable: true
    });
    RigidBody.prototype.update = function () {
        if (this._type === RigidBodyType.Static) {
            return;
        }
        this.applyGravityToVelocity();
        this.moveGameObject();
    };
    RigidBody.prototype.applyGravityToVelocity = function () {
        if (this._gravity > 0) {
            this.gravityTime += this.timeManager.deltaTime;
            this._velocity.y -= this._gravity * this.gravityTime;
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
        this.deltaVelocity.set(this._velocity.x * this.timeManager.deltaTime, 0);
        this.gameObject.transform.position.x += this.deltaVelocity.x;
        this.updateCollisions();
        var rollback = false;
        this.collisions.forEach(function (collision) {
            var rigidBody = collision.gameObject.getComponent("RigidBody");
            if (rigidBody !== null) {
                rollback || (rollback = (_this.deltaVelocity.x > 0 && collision.coordinates.x >= _this.gameObject.transform.position.x) ||
                    (_this.deltaVelocity.x < 0 && collision.coordinates.x <= _this.gameObject.transform.position.x));
                //rigidBody.velocity = new Vector2(rigidBody.velocity.x + this._velocity.x, rigidBody.velocity.y);
            }
        });
        if (rollback) {
            this.gameObject.transform.position.x -= this.deltaVelocity.x;
            this._velocity.x = 0;
        }
    };
    RigidBody.prototype.moveY = function () {
        var _this = this;
        this.deltaVelocity.set(0, this._velocity.y * this.timeManager.deltaTime);
        this.gameObject.transform.position.y += this.deltaVelocity.y;
        this.updateCollisions();
        var rollback = false;
        this.collisions.forEach(function (collision) {
            var rigidBody = collision.gameObject.getComponent("RigidBody");
            if (rigidBody !== null) {
                rollback || (rollback = (_this.deltaVelocity.y > 0 && collision.coordinates.y >= _this.gameObject.transform.position.y) ||
                    (_this.deltaVelocity.y < 0 && collision.coordinates.y <= _this.gameObject.transform.position.y));
                //rigidBody.velocity = new Vector2(rigidBody.velocity.x, rigidBody.velocity.y + this._velocity.y);
                if (collision.coordinates.y <= _this.gameObject.transform.position.y) {
                    _this.gravityTime = 0;
                }
            }
        });
        if (rollback) {
            this.gameObject.transform.position.y -= this.deltaVelocity.y;
            this._velocity.y = 0;
        }
    };
    RigidBody.prototype.updateCollisions = function () {
        var _this = this;
        this.collisions = [];
        this._colliders.forEach(function (collider) {
            return _this._layersToCollide.forEach(function (layer) {
                return collider.getCollisionsWithLayer(layer).forEach(function (collision) {
                    _this.collisions.push(collision);
                });
            });
        });
    };
    RigidBody.prototype.isTouchingLayers = function () {
        for (var _i = 0, _a = this._colliders; _i < _a.length; _i++) {
            var collider = _a[_i];
            for (var _b = 0, _c = this._layersToCollide; _b < _c.length; _b++) {
                var layer = _c[_b];
                if (collider.collidesWithLayer(layer)) {
                    return true;
                }
            }
        }
        return false;
    };
    return RigidBody;
}(Component_1.Component));
exports.RigidBody = RigidBody;
//# sourceMappingURL=RigidBody.js.map