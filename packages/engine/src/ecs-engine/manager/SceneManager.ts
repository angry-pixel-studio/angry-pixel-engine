import { EntityManager } from "../../ecs/EntityManager";
import { System, SystemManager, SystemType } from "../../ecs/SystemManager";
import { AudioPlayerSystem } from "../system/preGameLogic/AudioPlayerSystem";
import { VideoRendererSystem } from "../system/renderer/VideoRendererSystem";

export interface ISceneManager {
    addScene(name: string, systemTypes: SystemType[], openingScene?: boolean): void;
    loadScene(name: string): void;
    loadOpeningScene(): void;
    update(): void;
}

export class SceneManager implements ISceneManager {
    private scenes: Map<string, SystemType<System>[]> = new Map();
    private openingSceneName: string;
    private currentSceneName: string;
    private pendingToLoadSceneName: string;

    constructor(
        private entityManager: EntityManager,
        private systemManager: SystemManager,
    ) {}

    public addScene(name: string, systemTypes: SystemType<System>[], openingScene: boolean = false): void {
        if (this.scenes.has(name)) throw new Error(`There is already a scene with the name '${name}'`);

        this.scenes.set(name, systemTypes);

        if (openingScene) this.openingSceneName = name;
    }

    public loadScene(name: string): void {
        if (!this.scenes.has(name)) throw new Error(`Invalid scene name: '${name}'`);

        this.pendingToLoadSceneName = name;
    }

    public loadOpeningScene(): void {
        if (!this.openingSceneName) throw new Error("There is no opening scene");

        this.loadScene(this.openingSceneName);
    }

    public update(): void {
        if (this.pendingToLoadSceneName) {
            if (this.currentSceneName) this.destroyCurrentScene();

            this.currentSceneName = this.pendingToLoadSceneName;
            this.pendingToLoadSceneName = undefined;

            this.enableCurrentScene();
        }
    }

    private destroyCurrentScene(): void {
        this.systemManager.disableSystem(AudioPlayerSystem);
        this.systemManager.disableSystem(VideoRendererSystem);

        this.entityManager.removeAllEntities();
        this.scenes.get(this.currentSceneName).forEach((systemType) => this.systemManager.disableSystem(systemType));

        this.systemManager.enableSystem(AudioPlayerSystem);
        this.systemManager.enableSystem(VideoRendererSystem);
    }

    private enableCurrentScene(): void {
        this.scenes.get(this.currentSceneName).forEach((systemType, index) => {
            this.systemManager.enableSystem(systemType);
            this.systemManager.setExecutionOrder(systemType, index);
        });
    }
}
