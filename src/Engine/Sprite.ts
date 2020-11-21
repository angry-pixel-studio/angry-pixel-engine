import { Rectangle } from "./Libs/Geometric/Shapes/Rectangle";
import { Vector2 } from "./Helper/Vector2";

interface config {
    image: HTMLImageElement;
    scale?: Vector2;
    slice?: Rectangle | null;
    smooth?: boolean;
}

export class Sprite {
    public image: HTMLImageElement = null;
    public width: number = null;
    public height: number = null;
    public slice: Rectangle = null;
    public scale: Vector2 = new Vector2(1, 1);
    public smooth: boolean = true;

    private _loaded: boolean = false;

    constructor(config: config) {
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
