import { Game } from "../Game";
import { Scene, SceneClass } from "../Scene";
import { Exception } from "../../utils/Exception";
import { FrameEvent } from "./IterationManager";
import { IRenderManager } from "angry-pixel-2d-renderer";
import { InitOptions } from "../GameActor";
import { Container } from "../../utils/Container";

type SceneConstructor = () => Scene;

/**
 * Manges the loading of the scenes.
 * @public
 * @category Managers
 * @example
 * ```js
 * this.sceneManager.loadScene("MainScene");
 * ```
 */
export interface ISceneManager {
    /**
     * Retrieves the current loaded scene.
     * @returns The scene instance.
     */
    getCurrentScene<T extends Scene>(): T;
    /**
     * Adds a new scene.
     * @param sceneClass The scene class .
     * @param name The name to identify the scene.
     * @param options [optional] Options for the init method.
     * @param openingScene [optional] TRUE if it's the first scene to load.
     */
    addScene(sceneClass: SceneClass, name: string, options?: InitOptions, openingScene?: boolean): void;
    /** Loads the scene flagged as the opening scene. */
    loadOpeningScene(): void;
    /**
     * Loads a Scene by the given name.
     * @param name The name of the Scene.
     */
    loadScene(name: string): void;
    /** @private */
    update(): void;
    /** @private */
    unloadCurrentScene(): void;
    /** @private */
    stopGame(): void;
}

/** @private */
export class SceneManager implements ISceneManager {
    private scenes: Map<string, SceneConstructor> = new Map<string, SceneConstructor>();
    private currentScene: Scene = null;
    private openingSceneName: string = null;
    private sceneToLoad: string | null = null;

    constructor(private readonly container: Container, private renderManager?: IRenderManager) {}

    public getCurrentScene<T extends Scene>(): T {
        return this.currentScene as T;
    }

    public addScene(sceneClass: SceneClass, name: string, options?: InitOptions, openingScene: boolean = false): void {
        if (this.scenes.has(name)) {
            throw new Exception(`There is already a scene with the name '${name}'`);
        }

        this.scenes.set(name, () => {
            const scene = new sceneClass(this.container, name, this.container.getConstant<Game>("Game"));

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

            if (this.renderManager) {
                this.renderManager.clearData();
            }
        }
    }

    public stopGame(): void {
        if (this.currentScene !== null) {
            this.currentScene.dispatch(FrameEvent.StopGame);
            this.currentScene = null;

            if (this.renderManager) {
                this.renderManager.clearData();
            }
        }
    }
}
