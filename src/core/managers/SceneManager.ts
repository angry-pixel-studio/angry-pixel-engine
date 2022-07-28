import { Game } from "../Game";
import { Scene } from "../Scene";
import { Exception } from "../../utils/Exception";
import { RenderManager } from "../../rendering/RenderManager";
import { FrameEvent } from "./IterationManager";

export type SceneClass = new (name: string, game: Game) => Scene;
type SceneConstructor = () => Scene;

export class SceneManager {
    private game: Game = null;
    private renderManager: RenderManager;

    private scenes: Map<string, SceneConstructor> = new Map<string, SceneConstructor>();
    private currentScene: Scene = null;
    private openingSceneName: string = null;
    private sceneToLoad: string | null = null;

    public currentSceneName: string;

    constructor(game: Game, renderManager: RenderManager) {
        this.game = game;
        this.renderManager = renderManager;
    }

    public getCurrentScene<T extends Scene>(): T {
        return this.currentScene as T;
    }

    public addScene(sceneClass: SceneClass, name: string, openingScene: boolean = false): void {
        if (this.scenes.has(name)) {
            throw new Exception(`There is already a scene with the name '${name}'`);
        }

        this.scenes.set(name, () => new sceneClass(name, this.game));

        if (openingScene === true || this.openingSceneName === null) {
            this.openingSceneName = name;
        }
    }

    public loadOpeningScene(): void {
        if (this.openingSceneName === null) {
            throw new Exception(`There is no opening scene`);
        }

        this._loadScene(this.openingSceneName);
    }

    public loadScene(name: string): void {
        if (this.game === null) {
            throw new Exception("Game not initialized.");
        }

        if (this.scenes.has(name) === false) {
            throw new Exception(`Scene with name ${name} does not exists`);
        }

        this.sceneToLoad = name;
    }

    public update(): void {
        if (this.sceneToLoad !== null) {
            this._loadScene(this.sceneToLoad);
            this.sceneToLoad = null;
        }
    }

    private _loadScene(name: string) {
        this.unloadCurrentScene();
        this.currentScene = this.scenes.get(name)();
        this.currentScene.dispatch(FrameEvent.Init);
    }

    public unloadCurrentScene(): void {
        if (this.currentScene !== null) {
            this.currentScene.dispatch(FrameEvent.Destroy);
            this.currentScene = null;
            this.currentSceneName = null;

            this.renderManager.clearData();
        }
    }
}
