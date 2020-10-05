export default class TextureFactory {
    gl: WebGLRenderingContext;

    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
    }

    public create(image: HTMLImageElement): WebGLTexture {
        const texture: WebGLTexture = this.gl.createTexture();

        if (image.naturalWidth) {
            this.onImageLoaded(image, texture);
        } else {
            image.addEventListener("load", () => this.onImageLoaded(image, texture));
        }

        return texture;
    }

    private onImageLoaded(image: HTMLImageElement, texture: WebGLTexture) {
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

        //this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 1);

        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

        // NEAREST = crisp pixels, LINEAR = smooth pixels
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    }
}
