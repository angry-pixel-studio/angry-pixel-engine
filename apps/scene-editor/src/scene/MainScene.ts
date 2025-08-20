import { Scene } from "angry-pixel";
import { LoadSceneSystem } from "@system/LoadSceneSystem";
import { CameraZoomSystem } from "@system/CameraZoomSystem";

export class MainScene extends Scene {
    loadAssets(): void {}

    registerSystems(): void {
        this.addSystem(LoadSceneSystem);
        this.addSystem(CameraZoomSystem);
    }

    createEntities(): void {}
}
