import { Camera, Scene, Transform } from "angry-pixel";

export class MainScene extends Scene {
    public loadAssets(): void {}

    public registerSystems(): void {}

    public createEntities(): void {
        this.entityManager.createEntity([new Camera({ debug: true }), new Transform()]);
    }
}
