import { TextureFactory } from "./TextureFactory";

export class TextureManager {
    private readonly textures: Map<symbol, WebGLTexture> = new Map<symbol, WebGLTexture>();

    constructor(private readonly textureFactory: TextureFactory) {}

    public getOrCreateTextureFromImage(image: HTMLImageElement, smooth: boolean = true): WebGLTexture {
        return this.textures.get(Symbol.for(image.src)) ?? this.createTextureFromImage(image, smooth);
    }

    public createTextureFromImage(image: HTMLImageElement, smooth: boolean = true): WebGLTexture {
        const texture: WebGLTexture = this.textureFactory.createFromImage(image, smooth);

        this.textures.set(Symbol.for(image.src), texture);

        return texture;
    }

    public getOrCreateTextureFromCanvas(name: string, canvas: HTMLCanvasElement, smooth: boolean = true): WebGLTexture {
        return this.textures.get(Symbol.for(name)) ?? this.createTextureFromCanvas(name, canvas, smooth);
    }

    public createTextureFromCanvas(name: string, canvas: HTMLCanvasElement, smooth: boolean = true): WebGLTexture {
        const texture: WebGLTexture = this.textureFactory.createFromCanvas(canvas, smooth);

        this.textures.set(Symbol.for(name), texture);

        return texture;
    }

    public getOrCreateTextureFromVideo(video: HTMLVideoElement): WebGLTexture {
        return this.textures.get(Symbol.for(video.src)) ?? this.createTextureFromVideo(video);
    }

    public createTextureFromVideo(video: HTMLVideoElement): WebGLTexture {
        const texture: WebGLTexture = this.textureFactory.createPixelTexture();

        this.textures.set(Symbol.for(video.src), texture);

        return texture;
    }
}
