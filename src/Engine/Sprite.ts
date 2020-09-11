import Rectangle from "./Helper/Rectangle";
import Vector2 from "./Helper/Vector2";

export default class Sprite {
    public image: HTMLImageElement = null;
    public width: number = null;
    public height: number = null;
    public slice: Rectangle = null;
    public scale: Vector2 = null;
    public smooth: boolean = true;
    public loaded: boolean =  false;
    
    private canvas: HTMLCanvasElement = null;

    constructor(config: {[key: string]: any}) {
        this.image = config.image

        this.slice = ('slice' in config) ? config.slice : this.slice;
        if (this.slice) {
            this.width = this.slice.width;
            this.height = this.slice.height;
        }

        this.scale = ('scale' in config) ? config.scale : this.scale;
        this.smooth = ('smooth' in config) ? config.smooth : this.smooth;

        if (this.image.naturalWidth) {
            this.onLoad();
        } else {
            this.image.addEventListener('load', (e: Event) => this.onLoad());
        }
    }

    private onLoad(): void {
        this.width = this.width === null ? this.image.naturalWidth : this.width;
        this.height = this.height === null ? this.image.naturalHeight : this.height;

        if (this.scale !== null) {
            this.width *= this.scale.x;
            this.height *= this.scale.y;
        }

        this.loaded = true;
    }
}