import { DEPENDENCY_TYPES } from "@config/dependencyTypes";
import { EntityManager, SystemManager, SystemType } from "@ecs";
import { inject, injectable } from "@ioc";
import { AudioPlayerSystem } from "@system/gameLogic/AudioPlayerSystem";
import { CreateSystemService } from "@system/CreateSystemService";
import { AssetManager } from "./AssetManager";
import { SystemGroup } from "@system/SystemGroup";
import { VideoRendererSystem } from "@system/render2d/VideoRendererSystem";
import { TimeManager } from "./TimeManager";

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
 *   loadSystems() {
 *     this.systems.push(
 *         SomeSystem,
 *         AnotherSystem
 *     );
 *   }
 *
 *   setup() {
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

    public loadSystems(): void {}
    public loadAssets(): void {}
    public setup(): void {}
}

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
@injectable(DEPENDENCY_TYPES.SceneManager)
export class SceneManager {
    private readonly scenes: Map<string, Scene> = new Map();

    private openingSceneName: string;
    private currentSceneName: string;
    private sceneNameToBeLoaded: string;
    private _loadingScene: boolean = false;
    private _sceneLoadedThisFrame: boolean = false;

    /** @internal */
    constructor(
        @inject(DEPENDENCY_TYPES.SystemManager) private readonly systemManager: SystemManager,
        @inject(DEPENDENCY_TYPES.CreateSystemService) private readonly systemFactory: CreateSystemService,
        @inject(DEPENDENCY_TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(DEPENDENCY_TYPES.AssetManager) private readonly assetManager: AssetManager,
        @inject(DEPENDENCY_TYPES.TimeManager) private readonly timeManager: TimeManager,
    ) {}

    public addScene(sceneType: SceneType, name: string, openingScene: boolean = false): void {
        const scene = new sceneType(this.entityManager, this.assetManager);
        this.scenes.set(name, scene);
        if (openingScene) this.openingSceneName = name;
    }

    public loadScene(name: string): void {
        if (!this.scenes.has(name)) throw new Error(`Invalid scene name: '${name}'`);
        this.sceneNameToBeLoaded = name;
    }

    public loadOpeningScene(): void {
        if (!this.openingSceneName) throw new Error("There is no opening scene");
        this.sceneNameToBeLoaded = this.openingSceneName;
    }

    public get loadingScene(): boolean {
        return this._loadingScene;
    }

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

            this.scenes.get(this.currentSceneName).loadAssets();
            this.scenes.get(this.currentSceneName).loadSystems();
            this._loadingScene = true;
        }

        if (this._loadingScene && this.assetManager.getAssetsLoaded()) {
            this._loadingScene = false;
            this._sceneLoadedThisFrame = true;

            this.scenes.get(this.currentSceneName).setup();

            // update some components for the initial entities
            this.systemManager.update(SystemGroup.Transform);
            this.systemManager.update(SystemGroup.PreGameLogic);

            this.scenes.get(this.currentSceneName).systems.forEach((systemType, index) => {
                this.systemFactory.createSystemIfNotExists(systemType);
                this.systemManager.enableSystem(systemType);
                this.systemManager.setExecutionOrder(systemType, index);
            });
        }
    }

    private destroyCurrentScene(): void {
        this.systemManager.disableSystem(AudioPlayerSystem);
        this.systemManager.disableSystem(VideoRendererSystem);

        this.scenes
            .get(this.currentSceneName)
            .systems.forEach((systemType) => this.systemManager.disableSystem(systemType));

        this.entityManager.removeAllEntities();

        // intervals and timeouts are cleared to avoid any unwanted behavior
        this.timeManager.clearAllIntervals();

        this.systemManager.enableSystem(AudioPlayerSystem);
        this.systemManager.enableSystem(VideoRendererSystem);
    }
}
