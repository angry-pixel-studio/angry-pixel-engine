import { TextureFactory } from "./TextureFactory";

const textureId = (name: string, smooth?: boolean): string => `${smooth ? "_smooth_" : ""}${name}`;

export class TextureManager {
    private readonly textures: Map<string, WebGLTexture> = new Map();

    constructor(private readonly textureFactory: TextureFactory) {}

    public getOrCreateTextureFromImage(image: HTMLImageElement, smooth: boolean = true): WebGLTexture {
        return this.textures.get(textureId(image.src, smooth)) ?? this.createTextureFromImage(image, smooth);
    }

    public createTextureFromImage(image: HTMLImageElement, smooth: boolean = true): WebGLTexture {
        const texture: WebGLTexture = this.textureFactory.createFromImage(image, smooth);

        this.textures.set(textureId(image.src, smooth), texture);

        return texture;
    }

    public getOrCreateTextureFromCanvas(name: string, canvas: HTMLCanvasElement, smooth: boolean = true): WebGLTexture {
        return this.textures.get(textureId(name, smooth)) ?? this.createTextureFromCanvas(name, canvas, smooth);
    }

    public createTextureFromCanvas(name: string, canvas: HTMLCanvasElement, smooth: boolean = true): WebGLTexture {
        const texture: WebGLTexture = this.textureFactory.createFromCanvas(canvas, smooth);

        this.textures.set(textureId(name, smooth), texture);

        return texture;
    }

    public getOrCreateTextureFromVideo(video: HTMLVideoElement): WebGLTexture {
        return this.textures.get(textureId(video.src)) ?? this.createTextureFromVideo(video);
    }

    public createTextureFromVideo(video: HTMLVideoElement): WebGLTexture {
        const texture: WebGLTexture = this.textureFactory.createPixelTexture();

        this.textures.set(textureId(video.src), texture);

        return texture;
    }
}
