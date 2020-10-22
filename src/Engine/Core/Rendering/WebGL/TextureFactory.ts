export default class TextureFactory {
    public createFromImage(gl: WebGLRenderingContext, image: HTMLImageElement, smooth: boolean = true): WebGLTexture {
        const texture: WebGLTexture = gl.createTexture();

        if (image.naturalWidth) {
            this.create(gl, image, texture, smooth);
        } else {
            image.addEventListener("load", () => this.create(gl, image, texture, smooth));
        }

        return texture;
    }

    private create(gl: WebGLRenderingContext, image: HTMLImageElement, texture: WebGLTexture, smooth: boolean = true) {
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        // NEAREST = crisp pixels, LINEAR = smooth pixels
        if (smooth === false) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        }
    }
}
