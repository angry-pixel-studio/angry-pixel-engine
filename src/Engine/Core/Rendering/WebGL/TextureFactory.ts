import { WebGLContextVersion } from "./WebGLRenderer";

export class TextureFactory {
    private gl: WebGLRenderingContext;

    constructor(contextVersion: WebGLContextVersion, canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext(contextVersion) as WebGLRenderingContext;
    }

    public createFromImage(
        image: HTMLImageElement,
        smooth: boolean = true,
        texture: WebGLTexture = null
    ): WebGLTexture {
        texture = texture ?? this.gl.createTexture();

        if (image.naturalWidth) {
            this.create(image, texture, smooth);
        } else {
            image.addEventListener("load", () => this.create(image, texture, smooth));
        }

        return texture;
    }

    public createFromCanvas(
        canvas: HTMLCanvasElement,
        smooth: boolean = true,
        texture: WebGLTexture = null
    ): WebGLTexture {
        texture = texture ?? this.gl.createTexture();

        this.create(canvas, texture, smooth);

        return texture;
    }

    private create(source: TexImageSource, texture: WebGLTexture, smooth: boolean = true): void {
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, source);

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

        // NEAREST = crisp pixels, LINEAR = smooth pixels
        if (smooth === false) {
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        } else {
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        }
    }
}
