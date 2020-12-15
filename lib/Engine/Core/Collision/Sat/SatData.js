"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatData = void 0;
var SatData = /** @class */ (function () {
    function SatData(penetration, direction, contactVertex) {
        this._penetration = penetration;
        this._direction = direction;
        this._contactVertex = contactVertex;
    }
    Object.defineProperty(SatData.prototype, "penetration", {
        get: function () {
            return this._penetration;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SatData.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SatData.prototype, "contactVertex", {
        get: function () {
            return this._contactVertex;
        },
        enumerable: false,
        configurable: true
    });
    return SatData;
}());
exports.SatData = SatData;
//# sourceMappingURL=SatData.js.map