import { Game } from "../../Game";
import { Scene } from "../../Scene";
import { RenderManager } from "../Rendering/RenderManager";
export declare type SceneConstructor = () => Scene;
export declare class SceneManager {
    private game;
    private renderManager;
    private scenes;
    private currentScene;
    private openingSceneName;
    currentSceneName: string;
    constructor(game: Game, renderManager: RenderManager);
    getCurrentScene<T extends Scene>(): T;
    addScene(name: string, sceneConstructor: SceneConstructor, openingScene?: boolean): void;
    loadOpeningScene(): void;
    loadScene(name: string): void;
    unloadCurrentScene(): void;
}
