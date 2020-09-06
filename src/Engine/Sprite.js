export default class Sprite {
    image = null;
    width = null;
    height = null;
    slice = null;
    scale = null;
    smooth = true;
    loaded=  false;
    canvas = null;

    constructor(config) {
        this.image = config.image

        // optional
        this.slice = config.slice !== undefined ? config.slice : this.slice;
        
        if (this.slice) {
            this.width = this.slice.width;
            this.height = this.slice.height;
        }

        this.scale = config.scale !== undefined ? config.scale : this.scale;
        this.smooth = config.smooth !== undefined ? config.smooth : this.smooth;

        if (this.image.naturalWidth) {
            this.onLoad();
        } else {
            this.image.addEventListener('load', e => this.onLoad());
        }
    }

    onLoad() {
        this.width = this.width === null ? this.image.naturalWidth : this.width;
        this.height = this.height === null ? this.image.naturalHeight : this.height;

        if (this.scale !== null) {
            this.width *= this.scale.x;
            this.height *= this.scale.y;
        }

        this.loaded = true;
    }
}