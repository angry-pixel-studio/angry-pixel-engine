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
exports.SpriteRenderer = exports.TYPE_SPRITE_RENDERER = void 0;
var Component_1 = require("../../Component");
var ImageRenderData_1 = require("../../Core/Rendering/RenderData/ImageRenderData");
var Game_1 = require("../../Game");
exports.TYPE_SPRITE_RENDERER = "SpriteRenderer";
var SpriteRenderer = /** @class */ (function (_super) {
    __extends(SpriteRenderer, _super);
    function SpriteRenderer(_a) {
        var sprite = _a.sprite, _b = _a.offsetX, offsetX = _b === void 0 ? 0 : _b, _c = _a.offsetY, offsetY = _c === void 0 ? 0 : _c, _d = _a.smooth, smooth = _d === void 0 ? true : _d, _e = _a.rotation, rotation = _e === void 0 ? 0 : _e, _f = _a.flipHorizontal, flipHorizontal = _f === void 0 ? false : _f, _g = _a.flipVertical, flipVertical = _g === void 0 ? false : _g, _h = _a.opacity, opacity = _h === void 0 ? 1 : _h;
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
        _this.type = exports.TYPE_SPRITE_RENDERER;
        _this.sprite = sprite;
        _this.offsetX = offsetX;
        _this.offsetY = offsetY;
        _this.smooth = smooth;
        _this.rotation = rotation;
        _this.flipHorizontal = flipHorizontal;
        _this.flipVertical = flipVertical;
        _this.opacity = opacity;
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
}(Component_1.RenderComponent));
exports.SpriteRenderer = SpriteRenderer;
//# sourceMappingURL=SpriteRenderer.js.map