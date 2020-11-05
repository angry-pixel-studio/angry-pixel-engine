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
exports.TextRenderer = exports.TYPE_TEXT_RENDERER = void 0;
var Component_1 = require("../../Component");
var TextRenderData_1 = require("../../Core/Rendering/RenderData/TextRenderData");
var Game_1 = require("../../Game");
exports.TYPE_TEXT_RENDERER = "TextRenderer";
var TextRenderer = /** @class */ (function (_super) {
    __extends(TextRenderer, _super);
    function TextRenderer(_a) {
        var width = _a.width, height = _a.height, _b = _a.text, text = _b === void 0 ? "" : _b, _c = _a.font, font = _c === void 0 ? "Sans" : _c, _d = _a.size, size = _d === void 0 ? 12 : _d, _e = _a.color, color = _e === void 0 ? "#000000" : _e, _f = _a.bold, bold = _f === void 0 ? false : _f, _g = _a.italic, italic = _g === void 0 ? false : _g, _h = _a.lineSeparation, lineSeparation = _h === void 0 ? 5 : _h;
        var _this = _super.call(this) || this;
        _this.text = "";
        _this.font = "Sans";
        _this.size = 12;
        _this.color = "#000000";
        _this.bold = false;
        _this.italic = false;
        _this.lineSeparation = 5;
        _this.width = 0;
        _this.height = 0;
        _this.renderManager = Game_1.container.getSingleton("RenderManager");
        _this.renderData = new TextRenderData_1.TextRenderData();
        _this.type = exports.TYPE_TEXT_RENDERER;
        _this.width = width;
        _this.height = height;
        _this.text = text;
        _this.font = font;
        _this.size = size;
        _this.color = color;
        _this.bold = bold;
        _this.italic = italic;
        _this.lineSeparation = lineSeparation;
        return _this;
    }
    TextRenderer.prototype.start = function () {
        this.update();
    };
    TextRenderer.prototype.update = function () {
        if (this.gameObject.ui === false) {
            throw new Error("TextRenderer only can be used on UI GameObjects");
        }
        this.renderData.layer = this.gameObject.layer;
        this.renderData.ui = this.gameObject.ui;
        this.renderData.text = this.text;
        this.renderData.textSize = this.size;
        this.renderData.color = this.color;
        this.renderData.font = this.font;
        this.renderData.position.x = this.gameObject.transform.position.x;
        this.renderData.position.y = this.gameObject.transform.position.y;
        this.renderData.lineSeparation = this.lineSeparation;
        this.renderData.bold = this.bold;
        this.renderData.italic = this.italic;
        this.renderManager.addToRenderStack(this.renderData);
    };
    return TextRenderer;
}(Component_1.RenderComponent));
exports.TextRenderer = TextRenderer;
//# sourceMappingURL=TextRenderer.js.map