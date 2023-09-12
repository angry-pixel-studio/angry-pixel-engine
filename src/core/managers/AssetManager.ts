import { IRenderManager } from "angry-pixel-2d-renderer";

export enum AssetType {
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

export interface IAssetManager {
    getAssetsLoaded(): boolean;
    loadImage(url: string, preloadTexture?: boolean): HTMLImageElement;
    loadAudio(url: string): HTMLAudioElement;
    loadFont(family: string, url: string): FontFace;
    loadVideo(url: string): HTMLVideoElement;
    getImage(url: string): HTMLImageElement;
    getAudio(url: string): HTMLAudioElement;
    getFont(family: string): FontFace;
    getVideo(url: string): HTMLVideoElement;
}

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
