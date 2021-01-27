import { TextureFactory } from "./TextureFactory";

export class TextureManager {
    private textureFactory: TextureFactory;
    private textures: Map<Symbol, WebGLTexture> = new Map<Symbol, WebGLTexture>();

    constructor(textureFactory: TextureFactory) {
        this.textureFactory = textureFactory;
    }

    public getTexture(name: string): WebGLTexture | null {
        return this.textures.get(Symbol.for(name)) ?? null;
    }

    public getOrCreateTextureFromImage(image: HTMLImageElement, smooth: boolean = true): WebGLTexture {
        return this.textures.get(Symbol.for(image.src)) ?? this.createTextureFromImage(image.src, image, smooth);
    }

    public createTextureFromImage(name: string, image: HTMLImageElement, smooth: boolean = true): WebGLTexture {
        const texture: WebGLTexture = this.textureFactory.createFromImage(image, smooth);

        this.textures.set(Symbol.for(name), texture);

        return texture;
    }

    public createTextureFromCanvas(name: string, canvas: HTMLCanvasElement, smooth: boolean = true): WebGLTexture {
        const texture: WebGLTexture = this.textureFactory.createFromCanvas(canvas, smooth);

        this.textures.set(Symbol.for(name), texture);

        return texture;
    }
}
