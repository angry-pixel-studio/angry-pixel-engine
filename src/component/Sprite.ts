import { Slice } from "angry-pixel-2d-renderer";

export { Slice };

/**
 * Sprite configuration options
 * @public
 */
export interface SpriteConfig {
    /** The image element to render */
    image: HTMLImageElement;
    /** Cut the image based on straight coordinates starting from the top left downward */
    slice?: Slice;
    /** Smoothing pixels (not recommended for pixel art) */
    smooth?: boolean;
}

/**
 * The Sprite is an object that is composed of the Image element and allow to slice it and smooth its pixels.
 *
 * @public
 * @example
 * ```js
 * const sprite = new Sprite({image: this.assetManager.getImage("image.png")});
 * ```
 *
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
    /** The image element to render */
    public readonly image: HTMLImageElement;
    /** Cut the image based on straight coordinates starting from the top left downward */
    public readonly slice: Slice;
    /** Smoothing pixels (not recommended for pixel art) */
    public readonly smooth: boolean;

    private _width: number = null;
    private _height: number = null;
    private _loaded: boolean = false;

    constructor(config: SpriteConfig) {
        this.image = config.image;
        this.smooth = config.smooth ?? false;
        this.slice = config.slice;

        if (this.slice) {
            this._width = this.slice.width;
            this._height = this.slice.height;
        }

        const load = (): void => {
            this._width = this._width ?? this.image.naturalWidth;
            this._height = this._height ?? this.image.naturalHeight;

            this._loaded = true;
        };

        if (this.image.naturalWidth) {
            load();
        } else {
            this.image.addEventListener("load", () => load());
        }
    }

    /** The image width */
    public get width(): number {
        return this._width;
    }

    /** The image height */
    public get height(): number {
        return this._height;
    }

    /** TRUE if the image is loaded */
    public get loaded(): boolean {
        return this._loaded;
    }
}
