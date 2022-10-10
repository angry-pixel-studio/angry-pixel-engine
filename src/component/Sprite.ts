import { container, GameConfig } from "../core/Game";
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
    public readonly scale: Vector2;
    public readonly smooth: boolean;

    private _width: number = null;
    private _height: number = null;
    private _loaded: boolean = false;

    constructor(config: SpriteConfig) {
        this.image = config.image;
        this.smooth = config.smooth ?? false;
        this.scale =
            config.scale ?? container.getConstant<GameConfig>("GameConfig").spriteDefaultScale ?? new Vector2(1, 1);

        this.slice = config.slice;
        if (this.slice) {
            this._width = this.slice.width;
            this._height = this.slice.height;
        }

        const load = (): void => {
            this._width = (this._width ?? this.image.naturalWidth) * Math.abs(this.scale.x);
            this._height = (this._height ?? this.image.naturalHeight) * Math.abs(this.scale.y);

            this._loaded = true;
        };

        if (this.image.naturalWidth) {
            load();
        } else {
            this.image.addEventListener("load", () => load());
        }
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get loaded(): boolean {
        return this._loaded;
    }
}
