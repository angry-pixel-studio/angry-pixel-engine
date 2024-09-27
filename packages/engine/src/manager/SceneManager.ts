import { TYPES } from "@config/types";
import { EntityManager, SystemManager, SystemType } from "@ecs";
import { inject, injectable } from "@ioc";
import { AudioPlayerSystem } from "@system/gameLogic/AudioPlayerSystem";
import { SystemFactory } from "@system/SystemFactory";
import { AssetManager } from "./AssetManager";
import { SystemGroup } from "@system/SystemGroup";
import { VideoRendererSystem } from "@system/render2d/VideoRendererSystem";

export type SceneType<T extends Scene = Scene> = { new (entityManager: EntityManager, assetManager: AssetManager): T };

export abstract class Scene {
    public systems: SystemType[];

    constructor(
        protected readonly entityManager: EntityManager,
        protected readonly assetManager: AssetManager,
    ) {}

    public loadAssets(): void {}
    public setup(): void {}
}

@injectable(TYPES.SceneManager)
export class SceneManager {
    private readonly scenes: Map<string, Scene> = new Map();

    private openingSceneName: string;
    private currentSceneName: string;
    private sceneNameToBeLoaded: string;
    private loadingScene: boolean = false;

    constructor(
        @inject(TYPES.SystemManager) private readonly systemManager: SystemManager,
        @inject(TYPES.SystemFactory) private readonly systemFactory: SystemFactory,
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.AssetManager) private readonly assetManager: AssetManager,
    ) {}

    public addScene(sceneType: SceneType, name: string, openingScene: boolean = false): void {
        const scene = new sceneType(this.entityManager, this.assetManager);
        this.scenes.set(name, scene);
        scene.systems.forEach((systemType) => this.systemFactory.createSystemIfNotExists(systemType));
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

    /** @internal */
    public update(): void {
        if (this.sceneNameToBeLoaded) {
            if (this.currentSceneName) this.destroyCurrentScene();

            this.currentSceneName = this.sceneNameToBeLoaded;
            this.sceneNameToBeLoaded = undefined;

            this.scenes.get(this.currentSceneName).loadAssets();
            this.loadingScene = true;
        }

        if (this.loadingScene && this.assetManager.getAssetsLoaded()) {
            this.loadingScene = false;

            this.scenes.get(this.currentSceneName).setup();

            // this line update the transforms of the first entities
            this.systemManager.update(SystemGroup.PostGameLogic);

            this.scenes.get(this.currentSceneName).systems.forEach((systemType, index) => {
                this.systemManager.enableSystem(systemType);
                this.systemManager.setExecutionOrder(systemType, index);
            });
        }
    }

    private destroyCurrentScene(): void {
        this.systemManager.disableSystem(AudioPlayerSystem);
        this.systemManager.disableSystem(VideoRendererSystem);

        this.entityManager.removeAllEntities();
        this.scenes
            .get(this.currentSceneName)
            .systems.forEach((systemType) => this.systemManager.disableSystem(systemType));

        this.systemManager.enableSystem(AudioPlayerSystem);
        this.systemManager.enableSystem(VideoRendererSystem);
    }
}
