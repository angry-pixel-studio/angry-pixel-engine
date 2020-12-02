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
exports.Transform = exports.TYPE_TRANSFORM = void 0;
var Component_1 = require("../Component");
var Vector2_1 = require("../Math/Vector2");
exports.TYPE_TRANSFORM = "Transform";
var Transform = /** @class */ (function (_super) {
    __extends(Transform, _super);
    function Transform() {
        var _this = _super.call(this) || this;
        _this._position = new Vector2_1.Vector2(0, 0);
        _this._innerPosition = new Vector2_1.Vector2(0, 0);
        _this._scale = new Vector2_1.Vector2(1, 1);
        _this._rotation = 0;
        _this.parentTransform = null;
        _this.allowMultiple = false;
        _this.type = exports.TYPE_TRANSFORM;
        return _this;
    }
    Object.defineProperty(Transform.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (position) {
            this._position.set(position.x, position.y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "innerPosition", {
        get: function () {
            return this._innerPosition;
        },
        set: function (innerPosition) {
            this._innerPosition.set(innerPosition.x, innerPosition.y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        set: function (scale) {
            this._scale.set(scale.x, scale.y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "rotation", {
        get: function () {
            return this._rotation;
        },
        set: function (rotation) {
            this._rotation = rotation;
        },
        enumerable: false,
        configurable: true
    });
    Transform.prototype.update = function () {
        if (this.parentTransform === null && this.gameObject.parent !== null) {
            this.parentTransform = this.gameObject.parent.transform;
        }
        if (this.parentTransform !== null && this.gameObject.parent === null) {
            this.parentTransform = null;
        }
        if (this.parentTransform !== null) {
            this.translateFromParent();
        }
        else {
            this._innerPosition.set(this._position.x, this._position.y);
        }
    };
    Transform.prototype.translateFromParent = function () {
        var parentRad = (this.parentTransform._rotation * Math.PI) / 180.0;
        var thisRad = Math.atan2(this._innerPosition.x, this._innerPosition.y);
        var radius = Math.hypot(this._innerPosition.x, this._innerPosition.y);
        this._position.set(this.parentTransform._position.x + radius * Math.sin(thisRad - parentRad), this.parentTransform._position.y + radius * Math.cos(thisRad - parentRad));
        this._rotation = this.parentTransform._rotation;
    };
    Transform.prototype.forceUpdate = function () {
        this.update();
    };
    return Transform;
}(Component_1.Component));
exports.Transform = Transform;
//# sourceMappingURL=Transform.js.map