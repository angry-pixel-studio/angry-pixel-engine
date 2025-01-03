export class TextureFactory {
    constructor(private readonly gl: WebGLRenderingContext) {}

    public createFromImage(
        image: HTMLImageElement,
        smooth: boolean = false,
        texture: WebGLTexture = null,
    ): WebGLTexture {
        texture = texture ?? this.gl.createTexture();

        if (image.naturalWidth) {
            this.createFromSource(image, texture, smooth);
        } else {
            image.addEventListener("load", () => this.createFromSource(image, texture, smooth));
        }

        return texture;
    }

    public createFromCanvas(
        canvas: HTMLCanvasElement,
        smooth: boolean = false,
        texture: WebGLTexture = null,
    ): WebGLTexture {
        texture = texture ?? this.gl.createTexture();

        this.createFromSource(canvas, texture, smooth);

        return texture;
    }

    public createPixelTexture(): WebGLTexture {
        const texture = this.gl.createTexture();

        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

        this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this.gl.RGBA,
            1,
            1,
            0,
            this.gl.RGBA,
            this.gl.UNSIGNED_BYTE,
            new Uint8Array([0, 0, 0, 255]),
        );

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

        this.gl.bindTexture(this.gl.TEXTURE_2D, null);

        return texture;
    }

    private createFromSource(source: TexImageSource, texture: WebGLTexture, smooth: boolean = false): void {
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, source);

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

        // LINEAR === smooth pixels, NEAREST === crisp pixels,
        if (smooth) {
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        } else {
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        }

        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }
}
