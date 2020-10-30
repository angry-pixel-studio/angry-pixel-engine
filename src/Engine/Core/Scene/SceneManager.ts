import { Game } from "../../Game";
import { Scene } from "../../Scene";
import { RenderManager } from "../Rendering/RenderManager";

export type SceneConstructor = () => Scene;

export class SceneManager {
    private game: Game = null;
    private renderManager: RenderManager;

    private scenes: { [id: string]: SceneConstructor } = {};
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

    public addScene(name: string, SceneConstructor: SceneConstructor, openingScene: boolean = false): void {
        if (typeof this.scenes[name] === "function") {
            throw new Error(`There is already a scene with the name '${name}'`);
        }

        this.scenes[name] = SceneConstructor;

        if (openingScene === true || this.openingSceneName === null) {
            this.openingSceneName = name;
        }
    }

    public loadOpeningScene(): void {
        this.loadScene(this.openingSceneName);
    }

    public loadScene(name: string): void {
        if (this.game === null) {
            throw new Error("Game not initialized.");
        }

        const resetLoop = this.game.running;

        if (resetLoop) {
            this.game.stopLoop();
        }

        this.unloadCurrentScene();
        this.currentScene = this.scenes[name]();
        this.currentScene.name = name;
        this.currentScene.game = this.game;

        if (resetLoop) {
            this.game.resumeLoop();
        }
    }

    public unloadCurrentScene(): void {
        if (this.currentScene !== null) {
            this.currentScene.destroy();
            this.currentScene = null;
            this.currentSceneName = null;

            this.renderManager.clearRenderStack();
        }
    }
}
