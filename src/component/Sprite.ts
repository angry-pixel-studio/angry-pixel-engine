import { container, GameConfig } from "../core/Game";
import { Vector2 } from "../math/Vector2";

export interface SpriteConfig {
    image: HTMLImageElement;
    scale?: Vector2;
    slice?: Slice | null;
    smooth?: boolean;
}

export interface Slice {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class Sprite {
    private _image: HTMLImageElement = null;
    private _slice: Slice = null;
    private _scale: Vector2 = container.getConstant<GameConfig>("GameConfig").spriteDefaultScale ?? new Vector2(1, 1);
    private _smooth: boolean = false;
    private _width: number = null;
    private _height: number = null;
    private _loaded: boolean = false;

    constructor(config: SpriteConfig) {
        this._image = config.image;

        this._slice = config.slice ?? this._slice;
        if (this._slice !== null) {
            this._width = this._slice.width;
            this._height = this._slice.height;
        }

        this._scale = config.scale ?? this._scale;

        this._smooth = config.smooth ?? this._smooth;

        if (this._image.naturalWidth) {
            this.onLoad();
        } else {
            this._image.addEventListener("load", () => this.onLoad());
        }
    }

    public get loaded(): boolean {
        return this._loaded;
    }

    public get image(): HTMLImageElement {
        return this._image;
    }

    public get slice(): Slice {
        return this._slice;
    }

    public get scale(): Vector2 {
        return this._scale;
    }

    public get smooth(): boolean {
        return this._smooth;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    private onLoad(): void {
        this._width = (this._width ?? this._image.naturalWidth) * this._scale.x;
        this._height = (this._height ?? this._image.naturalHeight) * this._scale.y;

        this._loaded = true;
    }
}
