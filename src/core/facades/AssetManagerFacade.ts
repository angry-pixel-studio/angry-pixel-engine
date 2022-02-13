import { AssetManager } from "../managers/AssetManager";

export class AssetManagerFacade {
    private static assetManager: AssetManager = null;

    public static initialize(assetManager: AssetManager): void {
        this.assetManager = assetManager;
    }

    /**
     * @returns TRUE if all the assets are loaded, FALSE instead
     */
    public static getAssetsLoaded(): boolean {
        return this.assetManager.getAssetsLoaded();
    }

    /**
     * @param url The url of the image
     * @returns The created image element
     */
    public static loadImage(url: string): HTMLImageElement {
        return this.assetManager.laadImage(url);
    }

    /**
     * @param url The url of the audio file
     * @returns The created audio element
     */
    public static loadAudio(url: string): HTMLAudioElement {
        return this.assetManager.loadAudio(url);
    }

    /**
     * @param url The url of the image element to find
     * @returns the found image element
     */
    public static getImage(url: string): HTMLImageElement {
        return this.assetManager.getImage(url);
    }

    /**
     * @param url The url of the audio element to find
     * @returns The found audio element
     */
    public static getAudio(url: string): HTMLAudioElement {
        return this.assetManager.getAudio(url);
    }
}
