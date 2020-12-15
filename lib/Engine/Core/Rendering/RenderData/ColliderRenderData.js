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
exports.ColliderRenderData = void 0;
var RenderData_1 = require("./RenderData");
var ColliderRenderData = /** @class */ (function (_super) {
    __extends(ColliderRenderData, _super);
    function ColliderRenderData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = RenderData_1.RenderDataType.Collider;
        _this.color = null;
        _this.shape = null;
        return _this;
    }
    return ColliderRenderData;
}(RenderData_1.RenderData));
exports.ColliderRenderData = ColliderRenderData;
//# sourceMappingURL=ColliderRenderData.js.map