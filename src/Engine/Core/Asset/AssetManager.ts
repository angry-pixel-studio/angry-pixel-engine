export enum AssetType {
    Image = "Image",
    Audio = "Audio",
    Video = "Video",
}

class Asset {
    public type: AssetType = null;
    public url: string = null;
    public loaded: boolean = false;
    public element: HTMLImageElement | HTMLVideoElement | HTMLAudioElement = null;
}

export default class AssetManager {
    private assets: Asset[] = [];

    public getAssetsLoaded(): boolean {
        return this.assets.reduce((prev: boolean, asset: Asset) => prev && asset.loaded, true);
    }

    public createImage(url: string): HTMLImageElement {
        const asset = this.createAsset(url, AssetType.Image);

        asset.element = new Image();
        asset.element.src = url;

        if (asset.element.naturalWidth) {
            asset.loaded = true;
        } else {
            asset.element.addEventListener("load", () => (asset.loaded = true));
        }

        return asset.element;
    }

    public createAudio(url: string): HTMLAudioElement {
        const asset = this.createAsset(url, AssetType.Audio);

        asset.element = new Audio();
        asset.element.src = url;

        if (asset.element.duration) {
            asset.loaded = true;
        } else {
            asset.element.addEventListener("canplaythrough", () => (asset.loaded = true));
        }

        return asset.element;
    }

    public createVideo(url: string): HTMLVideoElement {
        const asset = this.createAsset(url, AssetType.Video);

        asset.element = document.createElement("video");
        asset.element.src = url;

        if (asset.element.duration) {
            asset.loaded = true;
        } else {
            asset.element.addEventListener("canplaythrough", () => (asset.loaded = true));
        }

        return asset.element as HTMLVideoElement;
    }

    public getImage(url: string): HTMLImageElement {
        return this.getAsset<HTMLImageElement>(url, AssetType.Image);
    }

    public getVideo(url: string): HTMLVideoElement {
        return this.getAsset<HTMLVideoElement>(url, AssetType.Video);
    }

    public getAudio(url: string): HTMLAudioElement {
        return this.getAsset<HTMLAudioElement>(url, AssetType.Audio);
    }

    public getAsset<EType extends HTMLImageElement | HTMLVideoElement | HTMLAudioElement>(
        url: string,
        type: AssetType | null = null
    ): EType {
        return this.assets.reduce(
            (prev: Asset | null, asset: Asset) =>
                asset.url === url && (type === null || type === asset.type) ? asset : prev,
            null
        ).element as EType;
    }

    private createAsset(url: string, type: AssetType): Asset {
        const asset = new Asset();

        asset.type = type;
        asset.url = url;

        this.assets.push(asset);

        return asset;
    }
}
