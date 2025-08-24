import { Scene } from "angry-pixel";
import { LoadSceneSystem } from "./system/loadSceneSystem";

export class MainScene extends Scene {
    registerSystems(): void {
        this.addSystem(LoadSceneSystem);
    }
}
