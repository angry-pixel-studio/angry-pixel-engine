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
exports.SpriteRenderer = void 0;
var Component_1 = require("../../Component");
var ImageRenderData_1 = require("../../Core/Rendering/RenderData/ImageRenderData");
var Game_1 = require("../../Game");
var SpriteRenderer = /** @class */ (function (_super) {
    __extends(SpriteRenderer, _super);
    function SpriteRenderer(config) {
        var _a, _b, _c, _d, _e, _f, _g;
        var _this = _super.call(this) || this;
        _this.sprite = null;
        _this.offsetX = 0;
        _this.offsetY = 0;
        _this.flipHorizontal = false;
        _this.flipVertical = false;
        _this.rotation = 0;
        _this.smooth = true;
        _this.opacity = 1;
        _this.renderManager = Game_1.container.getSingleton("RenderManager");
        _this.renderData = new ImageRenderData_1.ImageRenderData();
        _this.goPosition = null;
        // required
        _this.sprite = config.sprite;
        // optional
        _this.offsetX = (_a = config.offsetX) !== null && _a !== void 0 ? _a : _this.offsetX;
        _this.offsetY = (_b = config.offsetY) !== null && _b !== void 0 ? _b : _this.offsetY;
        _this.smooth = (_c = config.smooth) !== null && _c !== void 0 ? _c : _this.smooth;
        _this.rotation = (_d = config.rotation) !== null && _d !== void 0 ? _d : _this.rotation;
        _this.flipHorizontal = (_e = config.flipHorizontal) !== null && _e !== void 0 ? _e : _this.flipHorizontal;
        _this.flipVertical = (_f = config.flipVertical) !== null && _f !== void 0 ? _f : _this.flipVertical;
        _this.opacity = (_g = config.opacity) !== null && _g !== void 0 ? _g : _this.opacity;
        return _this;
    }
    SpriteRenderer.prototype.start = function () {
        this.goPosition = this.gameObject.transform.position;
        this.update();
    };
    SpriteRenderer.prototype.update = function () {
        if (this.sprite.loaded === true) {
            this.renderData.ui = this.gameObject.ui;
            this.renderData.layer = this.gameObject.layer;
            this.renderData.image = this.sprite.image;
            this.renderData.width = this.sprite.width * this.gameObject.transform.scale.x;
            this.renderData.height = this.sprite.height * this.gameObject.transform.scale.y;
            this.renderData.slice = this.sprite.slice;
            this.renderData.flipHorizontal = this.flipHorizontal;
            this.renderData.flipVertical = this.flipVertical;
            this.renderData.rotation = this.gameObject.transform.rotation + this.rotation;
            this.renderData.smooth = this.sprite.smooth;
            this.renderData.alpha = this.opacity;
            this.calculateRenderPosition();
            this.renderManager.addToRenderStack(this.renderData);
        }
    };
    SpriteRenderer.prototype.calculateRenderPosition = function () {
        this.renderData.position.x = this.gameObject.transform.position.x + this.offsetX;
        this.renderData.position.y = this.gameObject.transform.position.y + this.offsetY;
        if (this.gameObject.transform.rotation) {
            this.translateRenderPosition();
        }
        return;
    };
    SpriteRenderer.prototype.translateRenderPosition = function () {
        var angle = (this.gameObject.transform.rotation * Math.PI) / 180.0;
        var radius = Math.hypot(this.renderData.position.x - this.goPosition.x, this.renderData.position.y - this.goPosition.y);
        (this.renderData.position.x = this.goPosition.x + radius * Math.cos(angle)),
            (this.renderData.position.y = this.goPosition.y - radius * Math.sin(angle));
    };
    return SpriteRenderer;
}(Component_1.Component));
exports.SpriteRenderer = SpriteRenderer;
//# sourceMappingURL=SpriteRenderer.js.map