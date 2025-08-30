import { Scene } from "angry-pixel";
import { LoadSceneSystem } from "../system/LoadSceneSystem";

export class MainScene extends Scene {
    registerSystems(): void {
        this.addSystem(LoadSceneSystem);
    }
}
