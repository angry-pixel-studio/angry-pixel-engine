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
exports.Transform = void 0;
var Component_1 = require("../Component");
var Vector2_1 = require("../Helper/Vector2");
var Transform = /** @class */ (function (_super) {
    __extends(Transform, _super);
    function Transform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.position = new Vector2_1.Vector2(0, 0);
        _this.innerPosition = new Vector2_1.Vector2(0, 0);
        _this.scale = new Vector2_1.Vector2(1, 1);
        _this.rotation = 0;
        _this.parentTransform = null;
        return _this;
    }
    Transform.prototype.start = function () {
        this.update();
    };
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
            this.innerPosition.x = this.position.x;
            this.innerPosition.y = this.position.y;
        }
    };
    Transform.prototype.translateFromParent = function () {
        var parentRad = (this.parentTransform.rotation * Math.PI) / 180.0;
        var thisRad = Math.atan2(this.innerPosition.x, this.innerPosition.y);
        var radius = Math.hypot(this.innerPosition.x, this.innerPosition.y);
        this.position.x = this.parentTransform.position.x + radius * Math.sin(thisRad - parentRad);
        this.position.y = this.parentTransform.position.y + radius * Math.cos(thisRad - parentRad);
        this.rotation = this.parentTransform.rotation;
    };
    Transform.prototype.forceUpdate = function () {
        this.update();
    };
    return Transform;
}(Component_1.Component));
exports.Transform = Transform;
//# sourceMappingURL=Transform.js.map