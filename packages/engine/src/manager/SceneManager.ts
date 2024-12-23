import { TYPES } from "@config/types";
import { EntityManager, SystemManager, SystemType } from "@ecs";
import { inject, injectable } from "@ioc";
import { AudioPlayerSystem } from "@system/gameLogic/AudioPlayerSystem";
import { CreateSystemService } from "@system/CreateSystemService";
import { AssetManager } from "./AssetManager";
import { SystemGroup } from "@system/SystemGroup";
import { VideoRendererSystem } from "@system/render2d/VideoRendererSystem";

/**
 * This type represents a scene class
 * @public
 * @category Core
 */
export type SceneType<T extends Scene = Scene> = { new (entityManager: EntityManager, assetManager: AssetManager): T };

/**
 * Base class for all game scenes
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
 * Manges the loading of the scenes.
 * @public
 * @category Managers
 * @example
 * ```js
 * this.sceneManager.loadScene("MainScene");
 * ```
 */
@injectable(TYPES.SceneManager)
export class SceneManager {
    private readonly scenes: Map<string, Scene> = new Map();

    private openingSceneName: string;
    private currentSceneName: string;
    private sceneNameToBeLoaded: string;
    private _loadingScene: boolean = false;
    private _sceneLoadedThisFrame: boolean = false;

    /** @internal */
    constructor(
        @inject(TYPES.SystemManager) private readonly systemManager: SystemManager,
        @inject(TYPES.CreateSystemService) private readonly systemFactory: CreateSystemService,
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.AssetManager) private readonly assetManager: AssetManager,
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

        this.systemManager.enableSystem(AudioPlayerSystem);
        this.systemManager.enableSystem(VideoRendererSystem);
    }
}
