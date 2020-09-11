import Game from "../../Game";
import Scene from "../../Scene";

export default class SceneManager {
    private game: Game = null;
    private scenes: {[id: string]: Function} = {};
    private currentScene: Scene = null;
    private openingSceneId: string = null;

    public currentSceneId: string;

    constructor(game: Game) {
        this.game = game;
    }

    public addScene(sceneId: string, sceneFunction: Function, openingScene: boolean = false): void {
        this.scenes[sceneId] = sceneFunction;
        
        if (openingScene === true || this.openingSceneId === null) {
            this.openingSceneId = sceneId;
        }
    }

    public loadOpeningScene(): void {
        this.loadScene(this.openingSceneId);
    }

    public loadScene(sceneId: string): void {
        const resetLoop = this.game.running;
        
        if (resetLoop) {
            this.game.stopLoop();
        }
        
        this.unloadCurrentScene();
        this.currentScene = this.scenes[sceneId]();
        this.currentScene.id = sceneId;
        this.currentScene.game = this.game;
        
        if (resetLoop) {
            this.game.resumeLoop(true);
        }
    }

    public unloadCurrentScene(): void {
        if (this.currentScene !== null) {
            this.currentScene._destroy();
            this.currentScene = null;
            this.currentSceneId = null;

            this.game.renderManager.clearRenderStack();
        }   
    }
}