import { AssetManager } from "../Core/Asset/AssetManager";
import { container } from "../Game";

export class AssetManagerFacade {
    private static assetManager: AssetManager = null;

    public static initialize(): void {
        this.assetManager = container.getSingleton<AssetManager>("AssetManager");
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
    public static createImage(url: string): HTMLImageElement {
        return this.assetManager.createImage(url);
    }

    /**
     * @param url The url of the audio file
     * @returns The created audio element
     */
    public static createAudio(url: string): HTMLAudioElement {
        return this.assetManager.createAudio(url);
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
