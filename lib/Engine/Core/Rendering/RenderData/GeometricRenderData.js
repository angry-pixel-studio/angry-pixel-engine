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
exports.GeometricRenderData = exports.GEOMETRIC_POLYGON = exports.GEOMETRIC_RECTANGLE = void 0;
var RenderData_1 = require("./RenderData");
exports.GEOMETRIC_RECTANGLE = "Rectangle";
exports.GEOMETRIC_POLYGON = "Polygon";
var GeometricRenderData = /** @class */ (function (_super) {
    __extends(GeometricRenderData, _super);
    function GeometricRenderData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = RenderData_1.RenderDataType.Geometric;
        _this.color = null;
        _this.geometric = null;
        _this.geometricType = null;
        _this.geometricUsePosition = false;
        return _this;
    }
    return GeometricRenderData;
}(RenderData_1.RenderData));
exports.GeometricRenderData = GeometricRenderData;
//# sourceMappingURL=GeometricRenderData.js.map