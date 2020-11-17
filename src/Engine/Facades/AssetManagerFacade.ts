import { AssetManager } from "../Core/Asset/AssetManager";
import { container } from "../Game";

export class AssetManagerFacade {
    private static assetManager: AssetManager = null;

    public static initialize(): void {
        this.assetManager = container.getSingleton<AssetManager>("AssetManager");
    }

    public static getAssetsLoaded(): boolean {
        return this.assetManager.getAssetsLoaded();
    }

    public static createImage(url: string): HTMLImageElement {
        return this.assetManager.createImage(url);
    }

    public static createAudio(url: string): HTMLAudioElement {
        return this.assetManager.createAudio(url);
    }

    public static createVideo(url: string): HTMLVideoElement {
        return this.assetManager.createVideo(url);
    }

    public static getImage(url: string): HTMLImageElement {
        return this.assetManager.getImage(url);
    }

    public static getVideo(url: string): HTMLVideoElement {
        return this.assetManager.getVideo(url);
    }

    public static getAudio(url: string): HTMLAudioElement {
        return this.assetManager.getAudio(url);
    }
}
