import { Vector2 } from "./Math/Vector2";

interface Config {
    image: HTMLImageElement;
    scale?: Vector2;
    slice?: Slice | null;
    smooth?: boolean;
}

interface Slice {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class Sprite {
    public image: HTMLImageElement = null;
    public width: number = null;
    public height: number = null;
    public slice: Slice = null;
    public scale: Vector2 = new Vector2(1, 1);
    public smooth: boolean = true;

    private _loaded: boolean = false;

    constructor(config: Config) {
        this.image = config.image;

        this.slice = config.slice ?? this.slice;
        if (this.slice !== null) {
            this.width = this.slice.width;
            this.height = this.slice.height;
        }

        this.scale = config.scale ?? this.scale;
        this.smooth = config.smooth ?? this.smooth;

        if (this.image.naturalWidth) {
            this.onLoad();
        } else {
            this.image.addEventListener("load", () => this.onLoad());
        }
    }

    public get loaded(): boolean {
        return this._loaded;
    }

    private onLoad(): void {
        this.width = (this.width ?? this.image.naturalWidth) * this.scale.x;
        this.height = (this.height ?? this.image.naturalHeight) * this.scale.y;

        this._loaded = true;
    }
}
