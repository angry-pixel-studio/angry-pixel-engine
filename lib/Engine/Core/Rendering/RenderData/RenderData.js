"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderData = exports.RenderDataType = void 0;
var Vector2_1 = require("../../../Math/Vector2");
var RenderDataType;
(function (RenderDataType) {
    RenderDataType[RenderDataType["Image"] = 0] = "Image";
    RenderDataType[RenderDataType["Text"] = 1] = "Text";
    RenderDataType[RenderDataType["Geometric"] = 2] = "Geometric";
    RenderDataType[RenderDataType["Collider"] = 3] = "Collider";
})(RenderDataType = exports.RenderDataType || (exports.RenderDataType = {}));
var RenderData = /** @class */ (function () {
    function RenderData() {
        this.ui = false;
        this.debug = false;
        this.layer = null;
        this._position = new Vector2_1.Vector2(0, 0);
        this._viewportPosition = new Vector2_1.Vector2(0, 0);
    }
    Object.defineProperty(RenderData.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (position) {
            this._position.set(position.x, position.y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderData.prototype, "viewportPosition", {
        get: function () {
            return this._viewportPosition;
        },
        set: function (position) {
            this._viewportPosition.set(position.x, position.y);
        },
        enumerable: false,
        configurable: true
    });
    return RenderData;
}());
exports.RenderData = RenderData;
//# sourceMappingURL=RenderData.js.map