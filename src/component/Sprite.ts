import { Vector2 } from "angry-pixel-math";
import { Slice } from "angry-pixel-2d-renderer";

export { Slice };

export interface SpriteConfig {
    image: HTMLImageElement;
    scale?: Vector2;
    slice?: Slice;
    smooth?: boolean;
}

export class Sprite {
    public readonly image: HTMLImageElement;
    public readonly slice: Slice;
    public readonly smooth: boolean;

    public scale?: Vector2;

    private _width: number = null;
    private _height: number = null;
    private _loaded: boolean = false;

    constructor(config: SpriteConfig) {
        this.image = config.image;
        this.smooth = config.smooth ?? false;
        this.slice = config.slice;

        this.scale = config.scale;

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

    public get width(): number {
        return this._width * this.scale?.x ?? 1;
    }

    public get height(): number {
        return this._height * this.scale?.y ?? 1;
    }

    public get loaded(): boolean {
        return this._loaded;
    }
}
