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
exports.Rectangle = void 0;
var Matrix2_1 = require("../../../Math/Matrix2");
var Vector2_1 = require("../../../Math/Vector2");
var Shape_1 = require("./Shape");
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(x1, y1, x2, y2) {
        var _this = _super.call(this) || this;
        _this._rotationMatrix = new Matrix2_1.Matrix2();
        _this._type = Shape_1.ShapeType.Rectangle;
        _this._vertex[0] = new Vector2_1.Vector2(x1, y1);
        _this._vertex[1] = new Vector2_1.Vector2(x1, y2);
        _this._vertex[2] = new Vector2_1.Vector2(x2, y2);
        _this._vertex[3] = new Vector2_1.Vector2(x2, y1);
        _this._direction = _this._vertex[1].substract(_this._vertex[0]).unit();
        _this._refDirection = _this._direction.clone();
        _this._height = _this._vertex[1].substract(_this._vertex[0]).magnitude;
        _this._width = _this._vertex[2].substract(_this._vertex[1]).magnitude;
        _this._position = _this._vertex[0]
            .add(_this._direction.mult(_this._height / 2))
            .add(_this._direction.normal().mult(_this._width / 2));
        _this._angle = 0;
        return _this;
    }
    Rectangle.prototype.update = function () {
        this._rotationMatrix.rotate(this.angle);
        this._direction = this._rotationMatrix.multiplyVector2(this._refDirection);
        this._vertex[0] = this._position
            .add(this._direction.normal().mult(-this._width / 2))
            .add(this._direction.mult(-this._height / 2));
        this._vertex[1] = this._position
            .add(this._direction.normal().mult(-this._width / 2))
            .add(this._direction.mult(this._height / 2));
        this._vertex[2] = this._position
            .add(this._direction.normal().mult(this._width / 2))
            .add(this._direction.mult(this._height / 2));
        this._vertex[3] = this._position
            .add(this._direction.normal().mult(this._width / 2))
            .add(this._direction.mult(-this._height / 2));
    };
    Rectangle.prototype.clone = function () {
        return new Rectangle(this.vertex[0].x, this.vertex[0].y, this.vertex[2].x, this.vertex[2].y);
    };
    return Rectangle;
}(Shape_1.Shape));
exports.Rectangle = Rectangle;
//# sourceMappingURL=Rectangle.js.map