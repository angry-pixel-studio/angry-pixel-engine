import { inject, injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "@config/dependencySymbols";

enum AssetType {
    Image,
    Audio,
    Font,
    Video,
    Json,
}

/**
 * A loaded audio asset. Holds both a decoded `AudioBuffer` and an `HTMLAudioElement`.
 * @public
 * @category Assets
 */
export interface AudioSource {
    buffer?: AudioBuffer;
    element: HTMLAudioElement;
}

type AssetElement = HTMLImageElement | AudioSource | FontFace | HTMLVideoElement | Record<string, any>;

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
 * const audioSource = this.assetManager.getAudio("audio.ogg");
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

    constructor(@inject(SYMBOLS.AudioContext) private readonly audioContext: AudioContext | null) {}

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
     * @returns The {@link AudioSource} (with its `buffer` populated asynchronously), or `null` if no AudioContext is available.
     */
    public loadAudio(url: string, name?: string): AudioSource | null {
        const existing = this.getAudio(url);
        if (existing) return existing;

        if (!this.audioContext) {
            // headless / no Web Audio support — treat as "loaded" so getAssetsLoaded doesn't hang.
            const asset = this.createAsset(url, AssetType.Audio, undefined, name);
            asset.loaded = true;
            return null;
        }

        // HTMLAudioElement loads its own stream from the URL (browser cache dedupes the fetch below).
        const element = new Audio();
        element.src = url;

        const source: AudioSource = { element };
        const asset = this.createAsset(url, AssetType.Audio, source, name);

        this.decodeAudioBuffer(url).then((buffer) => {
            source.buffer = buffer;
            asset.loaded = true;
        });

        return source;
    }

    private async decodeAudioBuffer(url: string): Promise<AudioBuffer> {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        return this.audioContext.decodeAudioData(arrayBuffer);
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
     * @returns The loaded {@link AudioSource}.
     */
    public getAudio(url: string): AudioSource;
    /**
     * Retrieves an audio asset
     * @param name The asset name
     * @returns The loaded {@link AudioSource}.
     */
    public getAudio(name: string): AudioSource;
    public getAudio(disc: string): AudioSource {
        return this.assets.find(
            (asset) => asset.type === AssetType.Audio && (asset.url === disc || asset.name === disc),
        )?.element as AudioSource;
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
