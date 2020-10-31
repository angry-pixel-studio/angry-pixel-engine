"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circumference = void 0;
var Vector2_1 = require("./Vector2");
var Circumference = /** @class */ (function () {
    function Circumference(x, y, radius) {
        this.position = new Vector2_1.Vector2(0, 0);
        this.radius = 0;
        this.position = new Vector2_1.Vector2(x, y);
        this.radius = radius;
    }
    return Circumference;
}());
exports.Circumference = Circumference;
//# sourceMappingURL=Circumference.js.map