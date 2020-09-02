export default class Sprite {
    image = null;
    width = null;
    height = null;
    slice = null;
    smooth = true;
    loaded=  false;
    canvas = null;

    constructor(config) {
        this.image = config.image

        // optional
        this.width = config.width !== undefined ? config.width : this.width;
        this.height = config.height !== undefined ? config.height : this.height;
        this.slice = config.slice !== undefined ? config.slice : this.slice;
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

        this.loaded = true;
    }
}