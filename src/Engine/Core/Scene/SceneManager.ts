import Game from "../../Game";
import Scene from "../../Scene";

export default class SceneManager {
    private game: Game = null;
    private scenes: { [id: string]: Function } = {};
    private currentScene: Scene = null;
    private openingSceneName: string = null;

    public currentSceneName: string;

    constructor(game: Game) {
        this.game = game;
    }

    public addScene(name: string, sceneFunction: Function, openingScene: boolean = false): void {
        if (typeof this.scenes[name] === 'function') {
            throw new Error(`There is already a scene with the name '${name}'`);
        }

        this.scenes[name] = sceneFunction;
        
        if (openingScene === true || this.openingSceneName === null) {
            this.openingSceneName = name;
        }
    }

    public loadOpeningScene(): void {
        this.loadScene(this.openingSceneName);
    }

    public loadScene(name: string): void {
        const resetLoop = this.game.running;

        if (resetLoop) {
            this.game.stopLoop();
        }

        this.unloadCurrentScene();
        this.currentScene = this.scenes[name]();
        this.currentScene.name = name;
        this.currentScene.game = this.game;

        if (resetLoop) {
            this.game.resumeLoop(true);
        }
    }

    public unloadCurrentScene(): void {
        if (this.currentScene !== null) {
            this.currentScene._destroy();
            this.currentScene = null;
            this.currentSceneName = null;

            this.game.renderManager.clearRenderStack();
        }
    }
}
