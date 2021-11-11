import { Game } from "../Game";
import { Scene } from "../Scene";
import { Exception } from "../../utils/Exception";
import { RenderManager } from "../../rendering/RenderManager";

export type SceneConstructor = () => Scene;

export class SceneManager {
    private game: Game = null;
    private renderManager: RenderManager;

    private scenes: Map<string, SceneConstructor> = new Map<string, SceneConstructor>();
    private currentScene: Scene = null;
    private openingSceneName: string = null;

    public currentSceneName: string;

    constructor(game: Game, renderManager: RenderManager) {
        this.game = game;
        this.renderManager = renderManager;
    }

    public getCurrentScene<T extends Scene>(): T {
        return this.currentScene as T;
    }

    public addScene(name: string, sceneConstructor: SceneConstructor, openingScene: boolean = false): void {
        if (this.scenes.has(name)) {
            throw new Exception(`There is already a scene with the name '${name}'`);
        }

        this.scenes.set(name, sceneConstructor);

        if (openingScene === true || this.openingSceneName === null) {
            this.openingSceneName = name;
        }
    }

    public loadOpeningScene(): void {
        if (this.openingSceneName === null) {
            throw new Exception(`There is no opening scene`);
        }

        this.loadScene(this.openingSceneName);
    }

    public loadScene(name: string): void {
        if (this.game === null) {
            throw new Exception("Game not initialized.");
        }

        if (this.scenes.has(name) === false) {
            throw new Exception(`Scene with name ${name} does not exists`);
        }

        this.unloadCurrentScene();
        this.currentScene = this.scenes.get(name)();
        this.currentScene.name = name;
        this.currentScene.game = this.game;
        this.currentScene.init();
    }

    public unloadCurrentScene(): void {
        if (this.currentScene !== null) {
            this.currentScene.destroy();
            this.currentScene = null;
            this.currentSceneName = null;

            this.renderManager.clearData();
        }
    }
}
