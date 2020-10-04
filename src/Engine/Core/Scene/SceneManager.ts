import Game from "../../Game";
import Scene from "../../Scene";

export type SceneConstructor = () => Scene;

export default class SceneManager {
    private _game: Game = null;
    private scenes: { [id: string]: SceneConstructor } = {};
    private currentScene: Scene = null;
    private openingSceneName: string = null;

    public currentSceneName: string;

    public set game(game: Game) {
        this._game = game;
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
        if (this._game === null) {
            throw new Error("Game not initialized.");
        }

        const resetLoop = this._game.running;

        if (resetLoop) {
            this._game.stopLoop();
        }

        this.unloadCurrentScene();
        this.currentScene = this.scenes[name]();
        this.currentScene.name = name;
        this.currentScene.game = this._game;

        if (resetLoop) {
            this._game.resumeLoop();
        }
    }

    public unloadCurrentScene(): void {
        if (this.currentScene !== null) {
            this.currentScene._destroy();
            this.currentScene = null;
            this.currentSceneName = null;

            Game.renderManager.clearRenderStack();
        }
    }
}
