import { TextureFactory } from "./TextureFactory";

export class TextureManager {
    private textureFactory: TextureFactory;
    private textures: Map<symbol, WebGLTexture> = new Map<symbol, WebGLTexture>();

    constructor(textureFactory: TextureFactory) {
        this.textureFactory = textureFactory;
    }

    public getTexture(name: string): WebGLTexture | null {
        return this.textures.get(Symbol.for(name)) ?? null;
    }

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
}
