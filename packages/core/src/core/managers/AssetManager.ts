import { IRenderManager } from "@angry-pixel/2d-renderer";

enum AssetType {
    Image = "Image",
    Audio = "Audio",
    Font = "Font",
    Video = "Video",
}

type AssetElement = HTMLImageElement | HTMLAudioElement | FontFace;

interface Asset {
    type: AssetType;
    url: string;
    loaded: boolean;
    element: AssetElement;
    family?: string;
}

/**
 * Manages the asset loading (images, fonts, audios, videos).
 * @public
 * @category Managers
 * @example
 * ```js
 * this.assetManager.loadImage("image.png");
 * this.assetManager.loadAudio("audio.ogg");
 * this.assetManager.loadVideo("video.mp4");
 * this.assetManager.loadFont("custom-font", "custom-font.ttf");
 *
 * const imageElement = this.assetManager.getImage("image.png");
 * const audioElement = this.assetManager.getAudio("audio.ogg");
 * const videoElement = this.assetManager.getVideo("video.mp4");
 * const fontFace = this.assetManager.getFont("custom-font");
 *
 * if (this.assetManager.getAssetsLoaded()) {
 *   // do something when assets are loaded
 * }
 * ```
 */
export interface IAssetManager {
    /**
     * Returns TRUE if the assets are loaded
     * @returns TRUE or FALSE
     */
    getAssetsLoaded(): boolean;
    /**
     * Loads an image asset
     * @param url The asset URL
     * @param preloadTexture Creates the texture to be rendered at load time [optional]
     * @returns The HTML Image element created
     */
    loadImage(url: string, preloadTexture?: boolean): HTMLImageElement;
    /**
     * Loads an audio asset
     * @param url The asset URL
     * @returns The HTML Audio element created
     */
    loadAudio(url: string): HTMLAudioElement;
    /**
     * Loads a font asset
     * @param family The font family name
     * @param url The asset URL
     * @returns The FontFace object created
     */
    loadFont(family: string, url: string): FontFace;
    /**
     * Loads an video asset
     * @param url The asset URL
     * @returns The HTML Video element created
     */
    loadVideo(url: string): HTMLVideoElement;
    /**
     * Retrieves an image asset
     * @param url The asset URL
     * @returns The HTML Image element
     */
    getImage(url: string): HTMLImageElement;
    /**
     * Retrieves an audio asset
     * @param url The asset URL
     * @returns The HTML Audio element
     */
    getAudio(url: string): HTMLAudioElement;
    /**
     * Retrieves a font asset
     * @param url The asset URL
     * @returns The Font element
     */
    getFont(family: string): FontFace;
    /**
     * Retrieves a video asset
     * @param url The asset URL
     * @returns The HTML Video element
     */
    getVideo(url: string): HTMLVideoElement;
}

/** @internal */
export class AssetManager implements IAssetManager {
    private readonly assets: Asset[] = [];

    constructor(private readonly renderManager: IRenderManager) {}

    public getAssetsLoaded(): boolean {
        return this.assets.reduce((prev: boolean, asset: Asset) => prev && asset.loaded, true);
    }

    public loadImage(url: string, preloadTexture: boolean = false): HTMLImageElement {
        const image = new Image();
        image.crossOrigin = "";
        image.src = url;

        const asset = this.createAsset(url, AssetType.Image, image);

        const loaded = () => {
            if (preloadTexture) this.renderManager.preloadTexture(image);
            asset.loaded = true;
        };

        if (image.naturalWidth) {
            loaded();
        } else {
            image.addEventListener("load", loaded);
        }

        return image;
    }

    public loadAudio(url: string): HTMLAudioElement {
        const audio = new Audio();
        audio.src = url;

        const asset = this.createAsset(url, AssetType.Audio, audio);

        if (audio.duration) {
            asset.loaded = true;
        } else {
            audio.addEventListener("canplaythrough", () => (asset.loaded = true));
        }

        return audio;
    }

    public loadFont(family: string, url: string): FontFace {
        const font: FontFace = new FontFace(family, `url(${url})`);
        const asset = this.createAsset(url, AssetType.Font, font);
        asset.family = family;

        font.load().then((font) => {
            // @ts-ignore
            document.fonts.add(font);
            asset.loaded = true;
        });

        return font;
    }

    public loadVideo(url: string): HTMLVideoElement {
        const video = document.createElement("video");
        video.playsInline = true;
        video.src = url;

        const asset = this.createAsset(url, AssetType.Video, video);

        if (video.duration) {
            asset.loaded = true;
        } else {
            video.addEventListener("canplaythrough", () => (asset.loaded = true));
        }

        return video;
    }

    public getImage(url: string): HTMLImageElement {
        return this.assets.find((asset) => asset.type === AssetType.Image && asset.url === url)
            ?.element as HTMLImageElement;
    }

    public getAudio(url: string): HTMLAudioElement {
        return this.assets.find((asset) => asset.type === AssetType.Audio && asset.url === url)
            ?.element as HTMLAudioElement;
    }

    public getFont(family: string): FontFace {
        return this.assets.find((asset) => asset.type === AssetType.Font && asset.family === family)
            ?.element as FontFace;
    }

    public getVideo(url: string): HTMLVideoElement {
        return this.assets.find((asset) => asset.type === AssetType.Video && asset.url === url)
            ?.element as HTMLVideoElement;
    }

    private createAsset(url: string, type: AssetType, element: AssetElement): Asset {
        const asset: Asset = { type, url, element, loaded: false };
        this.assets.push(asset);

        return asset;
    }
}
