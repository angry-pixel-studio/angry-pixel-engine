import { injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "@config/dependencySymbols";

enum AssetType {
    Image,
    Audio,
    Font,
    Video,
    Json,
}

type AssetElement = HTMLImageElement | HTMLAudioElement | FontFace | HTMLVideoElement | Record<string, any>;

interface Asset {
    type: AssetType;
    url: string;
    loaded: boolean;
    element: AssetElement;
    family?: string;
    name?: string;
}

/**
 * Manages loading and retrieval of game assets including images, fonts, audio files, videos and JSON data.\
 * Provides methods to load assets asynchronously and check their loading status.\
 * Assets can be referenced by URL or optional name identifiers.
 * @public
 * @category Managers
 * @example
 * ```js
 * this.assetManager.loadImage("image.png");
 * this.assetManager.loadAudio("audio.ogg");
 * this.assetManager.loadVideo("video.mp4");
 * this.assetManager.loadFont("custom-font", "custom-font.ttf");
 * this.assetManager.loadJson("data.json");
 *
 * const imageElement = this.assetManager.getImage("image.png");
 * const audioElement = this.assetManager.getAudio("audio.ogg");
 * const videoElement = this.assetManager.getVideo("video.mp4");
 * const fontFace = this.assetManager.getFont("custom-font");
 * const jsonData = this.assetManager.getJson("data.json");

 * if (this.assetManager.getAssetsLoaded()) {
 *   // do something when assets are loaded
 * }
 * ```
 */
@injectable(SYMBOLS.AssetManager)
export class AssetManager {
    private readonly assets: Asset[] = [];

    /**
     * Returns TRUE if the assets are loaded
     * @returns TRUE or FALSE
     */
    public getAssetsLoaded(): boolean {
        return this.assets.reduce((prev: boolean, asset: Asset) => prev && asset.loaded, true);
    }

    /**
     * Loads an image asset
     * @param url The asset URL
     * @param name The asset name [optional]
     * @returns The HTML Image element created
     */
    public loadImage(url: string, name?: string): HTMLImageElement {
        if (this.getImage(url)) return this.getImage(url);

        const image = new Image();
        image.crossOrigin = "";
        image.src = url;

        const asset = this.createAsset(url, AssetType.Image, image, name);
        const loaded = () => (asset.loaded = true);

        if (image.complete) loaded();
        else image.addEventListener("load", loaded);

        return image;
    }

    /**
     * Loads an audio asset
     * @param url The asset URL
     * @param name The asset name [optional]
     * @returns The HTML Audio element created
     */
    public loadAudio(url: string, name?: string): HTMLAudioElement {
        if (this.getAudio(url)) return this.getAudio(url);

        const audio = new Audio();
        audio.src = url;

        const asset = this.createAsset(url, AssetType.Audio, audio, name);

        if (audio.duration) asset.loaded = true;
        else audio.addEventListener("canplaythrough", () => (asset.loaded = true));

        return audio;
    }

    /**
     * Loads a font asset
     * @param family The font family name
     * @param url The asset URL
     * @returns The FontFace object created
     */
    public loadFont(family: string, url: string): FontFace {
        if (this.getFont(family)) return this.getFont(family);

        const font: FontFace = new FontFace(family, `url(${url})`);
        const asset = this.createAsset(url, AssetType.Font, font);
        asset.family = family;

        // @ts-ignore
        document.fonts.add(font);
        font.load().then(() => (asset.loaded = true));

        return font;
    }

    /**
     * Loads an video asset
     * @param url The asset URL
     * @param name The asset name [optional]
     * @returns The HTML Video element created
     */
    public loadVideo(url: string, name?: string): HTMLVideoElement {
        if (this.getVideo(url)) return this.getVideo(url);

        const video = document.createElement("video");
        video.playsInline = true;
        video.src = url;

        const asset = this.createAsset(url, AssetType.Video, video, name);

        if (video.duration) asset.loaded = true;
        else video.addEventListener("canplaythrough", () => (asset.loaded = true));

        return video;
    }

    /**
     * Loads a JSON asset
     * @param url The asset URL
     * @param name The asset name [optional]
     * @returns Promise<Record<string, any>>
     */
    public async loadJson<T = Record<string, any>>(url: string, name?: string): Promise<T> {
        if (this.getJson(url)) return this.getJson(url);

        const asset = this.createAsset(url, AssetType.Json, null, name);
        const response = await fetch(url);
        const json = await response.json();

        asset.loaded = true;
        asset.element = json;

        return json;
    }

    /**
     * Retrieves an image asset
     * @param url The asset URL
     * @returns The HTML Image element
     */
    public getImage(url: string): HTMLImageElement;
    /**
     * Retrieves an image asset
     * @param name The asset name
     * @returns The HTML Image element
     */
    public getImage(name: string): HTMLImageElement;
    public getImage(disc: string): HTMLImageElement {
        return this.assets.find(
            (asset) => asset.type === AssetType.Image && (asset.url === disc || asset.name === disc),
        )?.element as HTMLImageElement;
    }

    /**
     * Retrieves an audio asset
     * @param url The asset URL
     * @returns The HTML Audio element
     */
    public getAudio(url: string): HTMLAudioElement;
    /**
     * Retrieves an audio asset
     * @param name The asset name
     * @returns The HTML Audio element
     */
    public getAudio(name: string): HTMLAudioElement;
    public getAudio(disc: string): HTMLAudioElement {
        return this.assets.find(
            (asset) => asset.type === AssetType.Audio && (asset.url === disc || asset.name === disc),
        )?.element as HTMLAudioElement;
    }

    /**
     * Retrieves a font asset
     * @param family The font family name
     * @returns The Font element
     */
    public getFont(family: string): FontFace {
        return this.assets.find((asset) => asset.type === AssetType.Font && asset.family === family)
            ?.element as FontFace;
    }

    /**
     * Retrieves a video asset
     * @param url The asset URL
     * @returns The HTML Video element
     */
    public getVideo(url: string): HTMLVideoElement;
    /**
     * Retrieves a video asset
     * @param name The asset name
     * @returns The HTML Video element
     */
    public getVideo(name: string): HTMLVideoElement;
    public getVideo(disc: string): HTMLVideoElement {
        return this.assets.find(
            (asset) => asset.type === AssetType.Video && (asset.url === disc || asset.name === disc),
        )?.element as HTMLVideoElement;
    }

    /**
     * Retrieves a json asset
     * @param url The asset URL
     * @returns The JSON object
     */
    public getJson<T = Record<string, any>>(url: string): T;
    /**
     * Retrieves a json asset
     * @param name The asset name
     * @returns The JSON object
     */
    public getJson<T = Record<string, any>>(name: string): T;
    public getJson<T = Record<string, any>>(disc: string): T {
        return this.assets.find((asset) => asset.type === AssetType.Json && (asset.url === disc || asset.name === disc))
            ?.element as T;
    }

    private createAsset(url: string, type: AssetType, element: AssetElement, name?: string): Asset {
        this.deleteAssetIfExists({ url, name });
        const asset: Asset = { type, url, element, loaded: false, name };
        this.assets.push(asset);

        return asset;
    }

    private deleteAssetIfExists({ url, name }: { url?: string; name?: string }): void {
        const index = this.assets.findIndex(
            (asset) => asset.url === url || (asset.name !== undefined && asset.name === name),
        );
        if (index !== -1) this.assets.splice(index, 1);
    }
}
