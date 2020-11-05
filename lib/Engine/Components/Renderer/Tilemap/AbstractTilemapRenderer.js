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
exports.AbstractTilemapRenderer = void 0;
var Component_1 = require("../../../Component");
var ImageRenderData_1 = require("../../../Core/Rendering/RenderData/ImageRenderData");
var Game_1 = require("../../../Game");
var Rectangle_1 = require("../../../Libs/Geometric/Shapes/Rectangle");
var AbstractTilemapRenderer = /** @class */ (function (_super) {
    __extends(AbstractTilemapRenderer, _super);
    function AbstractTilemapRenderer() {
        var _this = _super.call(this) || this;
        _this.tileset = null;
        _this.tileScale = 1;
        _this.smooth = true; // default TRUE to avoid tiles bleeding
        _this.tileWidth = 0;
        _this.tileHeight = 0;
        _this.renderManager = Game_1.container.getSingleton("RenderManager");
        _this.tilemapProcessed = false;
        _this.tilesRenderData = [];
        _this._width = 0;
        _this._height = 0;
        _this.tiles = [];
        _this._realWidth = 0;
        _this._realHeight = 0;
        _this.allowMultiple = false;
        return _this;
    }
    AbstractTilemapRenderer.prototype.start = function () {
        this.tileWidth = this.tileset.tileWidth * this.tileScale;
        this.tileHeight = this.tileset.tileHeight * this.tileScale;
        this.update();
    };
    AbstractTilemapRenderer.prototype.update = function () {
        var _this = this;
        if (this.tileset.loaded && this.tilemapProcessed === false) {
            this.processTilemap();
            this.updateTilesPosition();
        }
        if (this.tileset.loaded && this.tilemapProcessed === true) {
            this.tilesRenderData.forEach(function (renderData) { return _this.renderManager.addToRenderStack(renderData); });
        }
    };
    AbstractTilemapRenderer.prototype.processTile = function (tile, col, row, alpha, flip) {
        if (alpha === void 0) { alpha = 1; }
        if (flip === void 0) { flip = { h: false, v: false }; }
        var renderData = this.createRenderData(tile, col, row, alpha, flip);
        this.updateSizeInfo(col + 1, row + 1);
        this.tilesRenderData.push(renderData);
    };
    AbstractTilemapRenderer.prototype.createRenderData = function (tile, col, row, alpha, flip) {
        if (alpha === void 0) { alpha = 1; }
        if (flip === void 0) { flip = { h: false, v: false }; }
        var renderData = new ImageRenderData_1.ImageRenderData();
        renderData.position.x = this.gameObject.transform.position.x + col * this.tileWidth + this.tileWidth / 2;
        renderData.position.y = this.gameObject.transform.position.y - row * this.tileHeight - this.tileHeight / 2;
        renderData.ui = false;
        renderData.image = this.tileset.image;
        renderData.layer = this.gameObject.layer;
        renderData.width = this.tileWidth;
        renderData.height = this.tileHeight;
        renderData.slice = tile;
        renderData.smooth = this.smooth;
        renderData.alpha = alpha;
        renderData.flipHorizontal = flip.h;
        renderData.flipVertical = flip.v;
        return renderData;
    };
    AbstractTilemapRenderer.prototype.updateSizeInfo = function (col, row) {
        if (this._width < col) {
            this._width = col;
            this._realWidth += this.tileWidth;
        }
        if (this._height < row) {
            this._height = row;
            this._realHeight += this.tileHeight;
        }
    };
    AbstractTilemapRenderer.prototype.updateTilesPosition = function () {
        var _this = this;
        this.tilesRenderData.forEach(function (renderData) {
            renderData.position.x -= Math.floor(_this._realWidth / 2);
            renderData.position.y += Math.floor(_this._realHeight / 2);
            _this.addTileData(renderData);
        });
    };
    AbstractTilemapRenderer.prototype.addTileData = function (renderData) {
        this.tiles.push(new Rectangle_1.Rectangle(renderData.position.x - renderData.width / 2, renderData.position.y + renderData.height / 2, renderData.width, renderData.height));
    };
    Object.defineProperty(AbstractTilemapRenderer.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractTilemapRenderer.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractTilemapRenderer.prototype, "realWidth", {
        get: function () {
            return this._realWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractTilemapRenderer.prototype, "realHeight", {
        get: function () {
            return this._realHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractTilemapRenderer.prototype, "tilesData", {
        get: function () {
            return this.tiles;
        },
        enumerable: false,
        configurable: true
    });
    return AbstractTilemapRenderer;
}(Component_1.RenderComponent));
exports.AbstractTilemapRenderer = AbstractTilemapRenderer;
//# sourceMappingURL=AbstractTilemapRenderer.js.map