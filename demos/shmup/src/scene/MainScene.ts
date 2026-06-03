import { AudioPlayer, Camera, Scene, Transform } from "angry-pixel";

export class MainScene extends Scene {
    public loadAssets(): void {
        this.assetManager.loadAudio("music/spaceship-shooter.ogg");
    }

    public registerSystems(): void {}

    public createEntities(): void {
        this.entityManager.createEntity([new Camera({ debug: true }), new Transform()]);

        this.entityManager.createEntity([
            new AudioPlayer({
                audioSource: "music/spaceship-shooter.ogg",
                action: "play",
                loop: true,
            }),
        ]);
    }
}
