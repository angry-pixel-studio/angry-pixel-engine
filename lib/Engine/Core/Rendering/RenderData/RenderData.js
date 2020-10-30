"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderData = exports.RenderDataType = void 0;
var Vector2_1 = require("../../../Helper/Vector2");
var RenderDataType;
(function (RenderDataType) {
    RenderDataType["Image"] = "Image";
    RenderDataType["Text"] = "Text";
    RenderDataType["Geometric"] = "Geometric";
})(RenderDataType = exports.RenderDataType || (exports.RenderDataType = {}));
var RenderData = /** @class */ (function () {
    function RenderData() {
        this.ui = false;
        this.layer = null;
        this._position = new Vector2_1.Vector2(0, 0);
    }
    Object.defineProperty(RenderData.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (position) {
            this.position.set(position.x, position.y);
        },
        enumerable: false,
        configurable: true
    });
    return RenderData;
}());
exports.RenderData = RenderData;
//# sourceMappingURL=RenderData.js.map