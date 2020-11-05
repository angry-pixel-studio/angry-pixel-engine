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
exports.TextRenderer = void 0;
var Component_1 = require("../../Component");
var TextRenderData_1 = require("../../Core/Rendering/RenderData/TextRenderData");
var Game_1 = require("../../Game");
var TextRenderer = /** @class */ (function (_super) {
    __extends(TextRenderer, _super);
    function TextRenderer(config) {
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
        _this.text = config.text ? config.text : _this.text;
        _this.font = config.font ? config.font : _this.font;
        _this.size = config.size ? config.size : _this.size;
        _this.color = config.color ? config.color : _this.color;
        _this.bold = config.bold ? config.bold : _this.bold;
        _this.italic = config.italic ? config.italic : _this.italic;
        _this.lineSeparation = config.lineSeparation ? config.lineSeparation : _this.lineSeparation;
        _this.width = config.width ? config.width : _this.width;
        _this.height = config.height ? config.height : _this.height;
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