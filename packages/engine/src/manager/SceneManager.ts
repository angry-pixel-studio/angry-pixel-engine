import { SYMBOLS } from "@config/dependencySymbols";
import { ComponentType, EntityManager, SystemManager, SystemType } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { AudioPlayerSystem } from "@system/gameLogic/AudioPlayerSystem";
import { CreateSystemService } from "@system/CreateSystemService";
import { AssetManager } from "./AssetManager";
import { SystemGroup } from "@system/SystemGroup";
import { VideoRendererSystem } from "@system/render2d/VideoRendererSystem";
import { TimeManager } from "./TimeManager";

/**
 * Manages scene loading, transitions and lifecycle.\
 * Provides methods to register scenes, load scenes by name, and handles the opening scene.\
 * Ensures proper cleanup between scene transitions and maintains scene state.
 * @public
 * @category Managers
 * @example
 * ```js
 * this.sceneManager.loadScene("MainScene");
 * ```
 */
@injectable(SYMBOLS.SceneManager)
export class SceneManager {
    private readonly scenes: Map<string, Scene> = new Map();

    private openingSceneName: string;
    private currentSceneName: string;
    private sceneNameToBeLoaded: string;
    private _loadingScene: boolean = false;
    private _sceneLoadedThisFrame: boolean = false;
    private preserveEntitiesWithComponent: ComponentType = undefined;

    /** @internal */
    constructor(
        @inject(SYMBOLS.SystemManager) private readonly systemManager: SystemManager,
        @inject(SYMBOLS.CreateSystemService) private readonly systemFactory: CreateSystemService,
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.AssetManager) private readonly assetManager: AssetManager,
        @inject(SYMBOLS.TimeManager) private readonly timeManager: TimeManager,
    ) {}

    /**
     * Adds a scene to the SceneManager
     * @param sceneType The scene class
     * @param name The name of the scene
     * @param openingScene Whether the scene is the opening scene
     * @public
     */
    public addScene(sceneType: SceneType, name: string, openingScene: boolean = false): void {
        const scene = new sceneType(this.entityManager, this.assetManager);
        this.scenes.set(name, scene);
        if (openingScene) this.openingSceneName = name;
    }

    /**
     * Loads a scene
     * @param name The name of the scene
     * @param options Optional options object. See {@link LoadSceneOptions}
     * @public
     */
    public loadScene(name: string, options?: LoadSceneOptions): void {
        if (!this.scenes.has(name)) throw new Error(`Invalid scene name: '${name}'`);
        this.sceneNameToBeLoaded = name;
        this.preserveEntitiesWithComponent = options?.preserveEntitiesWithComponent;
    }

    /**
     * Loads the opening scene
     * @param options Optional options object. See {@link LoadSceneOptions}
     * @public
     */
    public loadOpeningScene(options?: LoadSceneOptions): void {
        if (!this.openingSceneName) throw new Error("There is no opening scene");
        this.loadScene(this.openingSceneName, options);
    }

    /**
     * Returns true if the scene is loading
     * @public
     */
    public get loadingScene(): boolean {
        return this._loadingScene;
    }

    /**
     * Returns true if the scene was loaded this frame
     * @public
     */
    public get sceneLoadedThisFrame(): boolean {
        return this._sceneLoadedThisFrame;
    }

    /** @internal */
    public update(): void {
        this._sceneLoadedThisFrame = false;

        if (this.sceneNameToBeLoaded) {
            if (this.currentSceneName) this.destroyCurrentScene();

            this.currentSceneName = this.sceneNameToBeLoaded;
            this.sceneNameToBeLoaded = undefined;

            const scene = this.scenes.get(this.currentSceneName);

            scene.systems = [];
            scene.loadAssets();
            this._loadingScene = true;
        }

        if (this._loadingScene && this.assetManager.getAssetsLoaded()) {
            const scene = this.scenes.get(this.currentSceneName);

            this._loadingScene = false;
            this._sceneLoadedThisFrame = true;

            scene.setup();

            // update some components for the initial entities
            this.systemManager.update(SystemGroup.Transform);
            this.systemManager.update(SystemGroup.PreGameLogic);

            scene.systems.forEach((systemType, index) => {
                this.systemFactory.createSystemIfNotExists(systemType);
                this.systemManager.enableSystem(systemType);
                this.systemManager.setExecutionOrder(systemType, index);

                const system = this.systemManager.getSystem(systemType);
                if ("onSceneLoaded" in system && typeof system.onSceneLoaded === "function") {
                    system.onSceneLoaded();
                }
            });
        }
    }

    /** @internal */
    public destroyCurrentScene(): void {
        if (!this.currentSceneName) return;

        this.systemManager.getSystem(AudioPlayerSystem)?.onSceneDestroyed();
        this.systemManager.getSystem(VideoRendererSystem)?.onSceneDestroyed();

        if (this._loadingScene) return;

        this.scenes.get(this.currentSceneName).systems.forEach((systemType) => {
            const system = this.systemManager.getSystem(systemType);
            if ("onSceneDestroyed" in system && typeof system.onSceneDestroyed === "function") {
                system.onSceneDestroyed();
            }
            this.systemManager.disableSystem(systemType);
        });

        this.entityManager.removeAllEntities({ preserveEntitiesWithComponent: this.preserveEntitiesWithComponent });

        // intervals and timeouts are cleared to avoid any unwanted behavior
        this.timeManager.clearAllIntervals();
    }
}

/**
 * Options for the `loadScene` and `loadOpeningScene` methods of the SceneManager
 * @public
 * @category Managers
 * @example
 * ```js
 * this.sceneManager.loadScene("Level2", { preserveEntitiesWithComponent: DontDestroy });
 * ```
 */
export type LoadSceneOptions = {
    /** The entities that have a component of this type are preserved across the scene transition */
    preserveEntitiesWithComponent: ComponentType;
};

/**
 * This type represents a scene class
 * @public
 * @category Managers
 */
export type SceneType<T extends Scene = Scene> = { new (entityManager: EntityManager, assetManager: AssetManager): T };

/**
 * Base class for all game scenes.\
 * Provides core functionality for loading assets, registering systems, and setting up entities.\
 * Scenes are the main organizational unit for game states and levels.\
 * Each scene has access to the EntityManager for creating/managing entities and the AssetManager
 * for loading and accessing game resources.
 * @public
 * @category Core
 * @example
 * ```js
 * class MainScene extends Scene {
 *   loadAssets() {
 *      this.assetManager.loadImage("image.png");
 *   }
 *
 *   setup() {
 *     this.systems = [
 *         SomeSystem,
 *         AnotherSystem
 *     ];
 *
 *     this.entityManager.createEntity([
 *       SomeComponent,
 *       AnotherComponent
 *     ]);
 *   }
 * }
 * ```
 */
export abstract class Scene {
    public systems: SystemType[] = [];

    constructor(
        protected readonly entityManager: EntityManager,
        protected readonly assetManager: AssetManager,
    ) {}

    /**
     * Override this method to load the assets needed for the scene
     * @public
     */
    public loadAssets(): void {}

    /**
     * Override this method to create the entities and register the systems that will be executed in the scene
     * @public
     */
    public setup(): void {}
}
