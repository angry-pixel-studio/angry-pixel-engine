"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprite = void 0;
var Sprite = /** @class */ (function () {
    function Sprite(_a) {
        var _this = this;
        var image = _a.image, slice = _a.slice, scale = _a.scale, smooth = _a.smooth;
        this.image = null;
        this.width = null;
        this.height = null;
        this.slice = null;
        this.scale = null;
        this.smooth = true;
        this._loaded = false;
        this.image = image;
        this.slice = slice ? slice : this.slice;
        if (this.slice) {
            this.width = this.slice.width;
            this.height = this.slice.height;
        }
        this.scale = scale ? scale : this.scale;
        this.smooth = smooth !== undefined ? smooth : this.smooth;
        if (this.image.naturalWidth) {
            this.onLoad();
        }
        else {
            this.image.addEventListener("load", function () { return _this.onLoad(); });
        }
    }
    Object.defineProperty(Sprite.prototype, "loaded", {
        get: function () {
            return this._loaded;
        },
        enumerable: false,
        configurable: true
    });
    Sprite.prototype.onLoad = function () {
        this.width = this.width === null ? this.image.naturalWidth : this.width;
        this.height = this.height === null ? this.image.naturalHeight : this.height;
        if (this.scale !== null) {
            this.width *= this.scale.x;
            this.height *= this.scale.y;
        }
        this._loaded = true;
    };
    return Sprite;
}());
exports.Sprite = Sprite;
//# sourceMappingURL=Sprite.js.map