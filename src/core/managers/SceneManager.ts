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
 * const loadedScene = this.sceneManager.getLoadedScene();
 * ```
 */
export interface ISceneManager {
    /**
     * Adds a new scene.
     * @param sceneClass The scene class .
     * @param name The name to identify the scene.
     * @param options [optional] Options for the init method.
     * @param openingScene [optional] TRUE if it's the first scene to load.
     */
    addScene(sceneClass: SceneClass, name: string, options?: InitOptions, openingScene?: boolean): void;
    /**
     * Loads a Scene by the given name.
     * @param name The name of the Scene.
     */
    loadScene(name: string): void;
    /**
     * Retrieves the current loaded scene.
     * @returns The scene instance.
     */
    getLoadedScene<T extends Scene>(): T;
    /**
     * Loads the scene flagged as the opening scene.
     * @internal
     */
    loadOpeningScene(): void;
    /**
     * Check if there is a pending scene change.
     * @return TRUE if there is a pending scene to load, FALSE instead
     * @internal
     */
    pendingSceneToload(): boolean;
    /**
     * Loads the next pending scene.
     * @internal
     */
    loadPendingScene(): void;
    /**
     * Unloads the current loaded scene.
     * @internal
     */
    unloadCurrentScene(): void;
}

/** @internal */
export class SceneManager implements ISceneManager {
    private scenes: Map<string, SceneConstructor> = new Map<string, SceneConstructor>();
    private currentScene: Scene;
    private openingSceneName: string;
    private sceneNamePendingToLoad: string = null;

    constructor(private readonly container: Container, private renderManager?: IRenderManager) {}

    /**
     * @inheritdoc
     */
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

        if (openingScene || !this.openingSceneName) {
            this.openingSceneName = name;
        }
    }

    /**
     * @inheritdoc
     */
    public loadScene(name: string): void {
        if (this.scenes.has(name) === false) {
            throw new Exception(`Scene with name ${name} does not exists`);
        }

        this.sceneNamePendingToLoad = name;
    }

    /**
     * @inheritdoc
     */
    public getLoadedScene<T extends Scene>(): T {
        return this.currentScene as T;
    }

    /**
     * @inheritdoc
     */
    public loadOpeningScene(): void {
        if (this.openingSceneName === null) {
            throw new Exception(`There is no opening scene`);
        }

        this.scenes.get(this.openingSceneName)();
    }

    /**
     * @inheritdoc
     */
    public pendingSceneToload(): boolean {
        return this.sceneNamePendingToLoad !== null;
    }

    /**
     * @inheritdoc
     */
    public loadPendingScene(): void {
        if (!this.sceneNamePendingToLoad) return;

        this.scenes.get(this.sceneNamePendingToLoad)();
        this.sceneNamePendingToLoad = null;
    }

    /**
     * @inheritdoc
     */
    public unloadCurrentScene(): void {
        if (!this.currentScene) return;

        this.currentScene.dispatch(FrameEvent.Destroy);
        this.currentScene = undefined;
    }
}
