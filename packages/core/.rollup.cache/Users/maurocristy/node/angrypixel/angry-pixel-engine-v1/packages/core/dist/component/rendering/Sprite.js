import { Slice } from "@angry-pixel/2d-renderer";
export { Slice };
/**
 * The Sprite is an object that is composed of the Image element and allow to slice it and smooth its pixels.
 * @public
 * @category Components
 * @example
 * ```js
 * const sprite = new Sprite({image: this.assetManager.getImage("image.png")});
 * ```
 * @example
 * ```js
 * const sprite = new Sprite({
 *   image: this.assetManager.getImage("image.png"),
 *   slice: {x: 0, y:0, width: 16, height: 16},
 *   smooth: false
 * });
 * ```
 */
export class Sprite {
    /**
     * @param config The sprite configuration options
     */
    constructor(config) {
        var _a;
        this._width = null;
        this._height = null;
        this._loaded = false;
        this.image = config.image;
        this.smooth = (_a = config.smooth) !== null && _a !== void 0 ? _a : false;
        this.slice = config.slice;
        if (this.slice) {
            this._width = this.slice.width;
            this._height = this.slice.height;
        }
        const load = () => {
            var _a, _b;
            this._width = (_a = this._width) !== null && _a !== void 0 ? _a : this.image.naturalWidth;
            this._height = (_b = this._height) !== null && _b !== void 0 ? _b : this.image.naturalHeight;
            this._loaded = true;
        };
        if (this.image.naturalWidth) {
            load();
        }
        else {
            this.image.addEventListener("load", () => load());
        }
    }
    /** The image width */
    get width() {
        return this._width;
    }
    /** The image height */
    get height() {
        return this._height;
    }
    /** TRUE if the image is loaded */
    get loaded() {
        return this._loaded;
    }
}
//# sourceMappingURL=Sprite.js.map