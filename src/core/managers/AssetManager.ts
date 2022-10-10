export enum AssetType {
    Image = "Image",
    Audio = "Audio",
    Font = "Font",
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
    loadImage(url: string): HTMLImageElement;
}

export class AssetManager {
    private assets: Asset[] = [];

    public getAssetsLoaded(): boolean {
        return this.assets.reduce((prev: boolean, asset: Asset) => prev && asset.loaded, true);
    }

    public loadImage(url: string): HTMLImageElement {
        const image = new Image();
        image.crossOrigin = "";
        image.src = url;

        const asset = this.createAsset(url, AssetType.Image, image);

        if (image.naturalWidth) {
            asset.loaded = true;
        } else {
            image.addEventListener("load", () => (asset.loaded = true));
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

    private createAsset(url: string, type: AssetType, element: AssetElement): Asset {
        const asset: Asset = { type, url, element, loaded: false };
        this.assets.push(asset);

        return asset;
    }
}
