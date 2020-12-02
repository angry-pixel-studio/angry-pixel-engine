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
    function TextRenderer(config) {
        var _a, _b, _c, _d, _e, _f;
        var _this = _super.call(this) || this;
        _this.text = null;
        _this.font = "Sans";
        _this.size = 12;
        _this.color = "#000000";
        _this.bold = false;
        _this.italic = false;
        _this.lineSeparation = 5;
        _this.renderManager = Game_1.container.getSingleton("RenderManager");
        _this.renderData = new TextRenderData_1.TextRenderData();
        _this.type = exports.TYPE_TEXT_RENDERER;
        _this.text = config.text;
        _this.font = (_a = config.font) !== null && _a !== void 0 ? _a : _this.font;
        _this.size = (_b = config.size) !== null && _b !== void 0 ? _b : _this.size;
        _this.color = (_c = config.color) !== null && _c !== void 0 ? _c : _this.color;
        _this.bold = (_d = config.bold) !== null && _d !== void 0 ? _d : _this.bold;
        _this.italic = (_e = config.italic) !== null && _e !== void 0 ? _e : _this.italic;
        _this.lineSeparation = (_f = config.lineSeparation) !== null && _f !== void 0 ? _f : _this.lineSeparation;
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
        this.renderData.position.set(this.gameObject.transform.position.x, this.gameObject.transform.position.y);
        this.renderData.lineSeparation = this.lineSeparation;
        this.renderData.bold = this.bold;
        this.renderData.italic = this.italic;
        this.renderManager.addToRenderStack(this.renderData);
    };
    return TextRenderer;
}(Component_1.RenderComponent));
exports.TextRenderer = TextRenderer;
//# sourceMappingURL=TextRenderer.js.map