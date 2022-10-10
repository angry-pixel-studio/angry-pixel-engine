import { Game } from "../Game";
import { Scene } from "../Scene";
import { Exception } from "../../utils/Exception";
import { FrameEvent } from "./IterationManager";
import { IRenderManager } from "angry-pixel-2d-renderer";
import { InitOptions } from "../GameActor";

export type SceneClass = new (name: string, game: Game) => Scene;
type SceneConstructor = () => Scene;

export class SceneManager {
    private scenes: Map<string, SceneConstructor> = new Map<string, SceneConstructor>();
    private currentScene: Scene = null;
    private openingSceneName: string = null;
    private sceneToLoad: string | null = null;

    public currentSceneName: string;

    constructor(private game: Game, private renderManager?: IRenderManager) {}

    public getCurrentScene<T extends Scene>(): T {
        return this.currentScene as T;
    }

    public addScene(sceneClass: SceneClass, name: string, options?: InitOptions, openingScene: boolean = false): void {
        if (this.scenes.has(name)) {
            throw new Exception(`There is already a scene with the name '${name}'`);
        }

        this.scenes.set(name, () => {
            const scene = new sceneClass(name, this.game);

            this.currentScene = scene;
            scene.dispatch(FrameEvent.Init, options);

            return scene;
        });

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
        this.scenes.get(name)();
    }

    public unloadCurrentScene(): void {
        if (this.currentScene !== null) {
            this.currentScene.dispatch(FrameEvent.Destroy);
            this.currentScene = null;
            this.currentSceneName = null;

            if (this.renderManager) {
                this.renderManager.clearData();
            }
        }
    }
}
