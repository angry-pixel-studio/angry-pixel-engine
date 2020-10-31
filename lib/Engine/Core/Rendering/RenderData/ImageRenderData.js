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
exports.ImageRenderData = void 0;
var RenderData_1 = require("./RenderData");
var ImageRenderData = /** @class */ (function (_super) {
    __extends(ImageRenderData, _super);
    function ImageRenderData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = RenderData_1.RenderDataType.Image;
        _this.image = null;
        _this.width = 0;
        _this.height = 0;
        _this.slice = null;
        _this.flipHorizontal = false;
        _this.flipVertical = false;
        _this.rotation = null;
        _this.smooth = true;
        _this.alpha = 1;
        return _this;
    }
    return ImageRenderData;
}(RenderData_1.RenderData));
exports.ImageRenderData = ImageRenderData;
//# sourceMappingURL=ImageRenderData.js.map