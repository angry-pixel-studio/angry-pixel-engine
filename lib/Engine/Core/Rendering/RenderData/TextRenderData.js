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
exports.TextRenderData = void 0;
var RenderData_1 = require("./RenderData");
var TextRenderData = /** @class */ (function (_super) {
    __extends(TextRenderData, _super);
    function TextRenderData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = RenderData_1.RenderDataType.Text;
        _this.color = null;
        _this.text = null;
        _this.font = null;
        _this.textSize = null;
        _this.lineSeparation = null;
        _this.bold = false;
        _this.italic = false;
        return _this;
    }
    return TextRenderData;
}(RenderData_1.RenderData));
exports.TextRenderData = TextRenderData;
//# sourceMappingURL=TextRenderData.js.map