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
exports.RigidBody = void 0;
var Component_1 = require("../Component");
var Game_1 = require("../Game");
var Vector2_1 = require("../Helper/Vector2");
var RigidBody = /** @class */ (function (_super) {
    __extends(RigidBody, _super);
    function RigidBody(_a) {
        var colliders = _a.colliders, layersToCollide = _a.layersToCollide, _b = _a.gravity, gravity = _b === void 0 ? 1 : _b;
        var _this = _super.call(this) || this;
        _this._colliders = [];
        _this._gravity = 1;
        _this._layersToCollide = [];
        _this._velocity = new Vector2_1.Vector2(0, 0);
        _this.deltaVelocity = new Vector2_1.Vector2(0, 0);
        _this.deltaGravity = 0;
        _this.timeManager = Game_1.container.getSingleton("TimeManager");
        _this._colliders = colliders;
        _this._layersToCollide = layersToCollide;
        _this._gravity = gravity;
        return _this;
    }
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
        this.applyGravityToVelocity();
        this.moveGameObject();
    };
    RigidBody.prototype.applyGravityToVelocity = function () {
        if (this._gravity > 0) {
            this.deltaGravity += this._gravity * this.timeManager.deltaTime;
            this._velocity.y -= this.deltaGravity;
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
        this.deltaVelocity.x = this._velocity.x * this.timeManager.deltaTime;
        this.gameObject.transform.position.x += this.deltaVelocity.x;
        if (this.isTouchingLayers()) {
            this.gameObject.transform.position.x -= this.deltaVelocity.x;
            this._velocity.x = 0;
            this.deltaVelocity.x = 0;
        }
    };
    RigidBody.prototype.moveY = function () {
        this.deltaVelocity.y = this._velocity.y * this.timeManager.deltaTime;
        this.gameObject.transform.position.y += this.deltaVelocity.y;
        if (this.isTouchingLayers()) {
            this.gameObject.transform.position.y -= this.deltaVelocity.y;
            // If the object is falling and it reaches a collision, we must reset deltaGravity
            if (this.velocity.y < 0 && this._gravity > 0) {
                this.deltaGravity = 0;
            }
            this._velocity.y = 0;
            this.deltaVelocity.y = 0;
        }
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