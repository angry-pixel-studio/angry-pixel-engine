export declare enum AssetType {
    Image = "Image",
    Audio = "Audio",
    Video = "Video"
}
export declare class AssetManager {
    private assets;
    getAssetsLoaded(): boolean;
    createImage(url: string): HTMLImageElement;
    createAudio(url: string): HTMLAudioElement;
    createVideo(url: string): HTMLVideoElement;
    getImage(url: string): HTMLImageElement;
    getVideo(url: string): HTMLVideoElement;
    getAudio(url: string): HTMLAudioElement;
    getAsset<EType extends HTMLImageElement | HTMLVideoElement | HTMLAudioElement>(url: string, type?: AssetType | null): EType;
    private createAsset;
}
