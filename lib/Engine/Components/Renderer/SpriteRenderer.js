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
var Vector2_1 = require("../../Math/Vector2");
exports.TYPE_SPRITE_RENDERER = "SpriteRenderer";
var SpriteRenderer = /** @class */ (function (_super) {
    __extends(SpriteRenderer, _super);
    function SpriteRenderer(config) {
        var _a, _b, _c, _d, _e, _f, _g;
        var _this = _super.call(this) || this;
        _this.sprite = null;
        _this.offset = new Vector2_1.Vector2();
        _this.flipHorizontal = false;
        _this.flipVertical = false;
        _this.rotation = 0;
        _this.smooth = true;
        _this.opacity = 1;
        _this._tiled = new Vector2_1.Vector2(1, 1);
        _this.renderManager = Game_1.container.getSingleton("RenderManager");
        _this.renderData = [];
        _this.goPosition = null;
        _this.type = exports.TYPE_SPRITE_RENDERER;
        _this.sprite = config.sprite;
        _this.offset = (_a = config.offset) !== null && _a !== void 0 ? _a : _this.offset;
        _this.smooth = (_b = config.smooth) !== null && _b !== void 0 ? _b : _this.smooth;
        _this.rotation = (_c = config.rotation) !== null && _c !== void 0 ? _c : _this.rotation;
        _this.flipHorizontal = (_d = config.flipHorizontal) !== null && _d !== void 0 ? _d : _this.flipHorizontal;
        _this.flipVertical = (_e = config.flipVertical) !== null && _e !== void 0 ? _e : _this.flipVertical;
        _this.opacity = (_f = config.opacity) !== null && _f !== void 0 ? _f : _this.opacity;
        _this.tiled = (_g = config.tiled) !== null && _g !== void 0 ? _g : _this._tiled;
        return _this;
    }
    Object.defineProperty(SpriteRenderer.prototype, "tiled", {
        get: function () {
            return this._tiled;
        },
        set: function (tiled) {
            if (tiled.x % 1 !== 0 || tiled.y % 1 !== 0) {
                throw new Error("SpriteRenderer.tiled: Vector2 components must be integer");
            }
            this._tiled.set(tiled.x, tiled.y);
        },
        enumerable: false,
        configurable: true
    });
    SpriteRenderer.prototype.start = function () {
        this.goPosition = this.gameObject.transform.position;
        this.update();
    };
    SpriteRenderer.prototype.update = function () {
        if (this.sprite.loaded === true) {
            this.updateRenderDataArray();
            var index = 0;
            for (var tileX = 0; tileX < this._tiled.x; tileX++) {
                for (var tileY = 0; tileY < this._tiled.y; tileY++) {
                    this.updateRenderData(index, tileX, tileY);
                    index++;
                }
            }
        }
    };
    SpriteRenderer.prototype.updateRenderDataArray = function () {
        if (this.renderData.length !== this._tiled.x * this._tiled.y) {
            this.renderData = [];
            for (var i = 0; i <= this._tiled.x * this._tiled.y; i++) {
                this.renderData[i] = new ImageRenderData_1.ImageRenderData();
            }
        }
    };
    SpriteRenderer.prototype.updateRenderData = function (index, tileX, tileY) {
        this.renderData[index].ui = this.gameObject.ui;
        this.renderData[index].layer = this.gameObject.layer;
        this.renderData[index].image = this.sprite.image;
        this.renderData[index].width = this.sprite.width * Math.abs(this.gameObject.transform.scale.x);
        this.renderData[index].height = this.sprite.height * Math.abs(this.gameObject.transform.scale.y);
        this.renderData[index].slice = this.sprite.slice;
        this.renderData[index].flipHorizontal = this.flipHorizontal !== this.gameObject.transform.scale.x < 0;
        this.renderData[index].flipVertical = this.flipVertical !== this.gameObject.transform.scale.y < 0;
        this.renderData[index].rotation = this.gameObject.transform.rotation + this.rotation;
        this.renderData[index].smooth = this.sprite.smooth;
        this.renderData[index].alpha = this.opacity;
        this.calculateRenderPosition(index, tileX, tileY);
        this.renderManager.addToRenderStack(this.renderData[index]);
    };
    SpriteRenderer.prototype.calculateRenderPosition = function (index, tileX, tileY) {
        this.renderData[index].position = this.gameObject.transform.position
            .add(this.offset)
            .substract(new Vector2_1.Vector2((this.renderData[index].width / 2) * (this.tiled.x - 1), (this.renderData[index].height / 2) * (this.tiled.y - 1)))
            .add(new Vector2_1.Vector2(tileX * this.renderData[index].width, tileY * this.renderData[index].height));
        if (this.gameObject.transform.rotation) {
            this.translateRenderPosition(index);
        }
    };
    SpriteRenderer.prototype.translateRenderPosition = function (index) {
        var goRad = (this.gameObject.transform.rotation * Math.PI) / 180.0;
        var thisRad = Math.atan2(this.renderData[index].position.x - this.goPosition.x, this.renderData[index].position.y - this.goPosition.y);
        var radius = Math.hypot(this.renderData[index].position.x - this.goPosition.x, this.renderData[index].position.y - this.goPosition.y);
        this.renderData[index].position.set(this.goPosition.x + radius * Math.sin(thisRad - goRad), this.goPosition.y + radius * Math.cos(thisRad - goRad));
    };
    return SpriteRenderer;
}(Component_1.RenderComponent));
exports.SpriteRenderer = SpriteRenderer;
//# sourceMappingURL=SpriteRenderer.js.map