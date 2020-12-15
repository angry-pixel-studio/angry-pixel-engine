"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix2 = void 0;
var Vector2_1 = require("./Vector2");
var Matrix2 = /** @class */ (function () {
    function Matrix2(data) {
        if (data === void 0) { data = null; }
        this._data = [
            [0, 0],
            [0, 0],
        ];
        this._data = data !== null && data !== void 0 ? data : this._data;
    }
    Object.defineProperty(Matrix2.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
        },
        enumerable: false,
        configurable: true
    });
    Matrix2.prototype.multiplyVector2 = function (vector) {
        return new Vector2_1.Vector2(this._data[0][0] * vector.x + this._data[0][1] * vector.y, this._data[1][0] * vector.x + this._data[1][1] * vector.y);
    };
    Matrix2.prototype.rotate = function (angle) {
        this._data[0][0] = Math.cos(angle);
        this._data[0][1] = -Math.sin(angle);
        this._data[1][0] = Math.sin(angle);
        this._data[1][1] = Math.cos(angle);
    };
    return Matrix2;
}());
exports.Matrix2 = Matrix2;
//# sourceMappingURL=Matrix2.js.map