import { Scene } from "angry-pixel";
import { LoadSceneSystem } from "../system/LoadSceneSystem";
import { CameraZoomSystem } from "../system/CameraZoomSystem";
import { CameraMovementSystem } from "../system/CameraMovementSystem";
import { UpdateSceneSystem } from "../system/UpdateSceneSystem";

export class MainScene extends Scene {
    registerSystems(): void {
        this.addSystem(CameraZoomSystem);
        this.addSystem(CameraMovementSystem);
        this.addSystem(LoadSceneSystem);
        this.addSystem(UpdateSceneSystem);
    }
}
