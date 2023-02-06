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
     * @param preloadTexture [optional] preload the texture for this image
     * @returns The created image element
     */
    public static loadImage(url: string, preloadTexture?: boolean): HTMLImageElement {
        return this.assetManager.loadImage(url, preloadTexture);
    }

    /**
     * @param url The url of the audio file
     * @returns The created audio element
     */
    public static loadAudio(url: string): HTMLAudioElement {
        return this.assetManager.loadAudio(url);
    }

    /**
     * @param family The family name of the font
     * @param url The url of the font
     * @returns The created fontFace element
     */
    public static loadFont(family: string, url: string): FontFace {
        return this.assetManager.loadFont(family, url);
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

    /**
     * @param family The family of the font
     * @returns The found audio element
     */
    public static getFont(family: string): FontFace {
        return this.assetManager.getFont(family);
    }
}
