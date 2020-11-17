export declare class AssetManagerFacade {
    private static assetManager;
    static initialize(): void;
    static getAssetsLoaded(): boolean;
    static createImage(url: string): HTMLImageElement;
    static createAudio(url: string): HTMLAudioElement;
    static createVideo(url: string): HTMLVideoElement;
    static getImage(url: string): HTMLImageElement;
    static getVideo(url: string): HTMLVideoElement;
    static getAudio(url: string): HTMLAudioElement;
}
