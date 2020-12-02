"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprite = void 0;
var Vector2_1 = require("./Math/Vector2");
var Sprite = /** @class */ (function () {
    function Sprite(config) {
        var _this = this;
        var _a, _b, _c;
        this.image = null;
        this.width = null;
        this.height = null;
        this.slice = null;
        this.scale = new Vector2_1.Vector2(1, 1);
        this.smooth = true;
        this._loaded = false;
        this.image = config.image;
        this.slice = (_a = config.slice) !== null && _a !== void 0 ? _a : this.slice;
        if (this.slice !== null) {
            this.width = this.slice.width;
            this.height = this.slice.height;
        }
        this.scale = (_b = config.scale) !== null && _b !== void 0 ? _b : this.scale;
        this.smooth = (_c = config.smooth) !== null && _c !== void 0 ? _c : this.smooth;
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
        var _a, _b;
        this.width = ((_a = this.width) !== null && _a !== void 0 ? _a : this.image.naturalWidth) * this.scale.x;
        this.height = ((_b = this.height) !== null && _b !== void 0 ? _b : this.image.naturalHeight) * this.scale.y;
        this._loaded = true;
    };
    return Sprite;
}());
exports.Sprite = Sprite;
//# sourceMappingURL=Sprite.js.map