import Rectangle from "./Helper/Rectangle";
import Vector2 from "./Helper/Vector2";

interface config {
    image: HTMLImageElement;
    scale: Vector2;
    slice: Rectangle | null;
    smooth: boolean;
}

export default class Sprite {
    public image: HTMLImageElement = null;
    public width: number = null;
    public height: number = null;
    public slice: Rectangle = null;
    public scale: Vector2 = null;
    public smooth: boolean = true;

    private _loaded: boolean = false;

    constructor({ image, slice, scale, smooth }: config) {
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
        } else {
            this.image.addEventListener("load", () => this.onLoad());
        }
    }

    public get loaded(): boolean {
        return this._loaded;
    }

    private onLoad(): void {
        this.width = this.width === null ? this.image.naturalWidth : this.width;
        this.height = this.height === null ? this.image.naturalHeight : this.height;

        if (this.scale !== null) {
            this.width *= this.scale.x;
            this.height *= this.scale.y;
        }

        this._loaded = true;
    }
}
