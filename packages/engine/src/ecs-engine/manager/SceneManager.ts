import { Transform } from "../component/Transform";
import { Camera } from "../component/Camera";
import { IEntityManager } from "./EntityManager";

import { ISystem, ISystemManager, SystemType } from "./SystemManager";

export interface ISceneManager {
    addScene(name: string, systemTypes: SystemType[], openingScene?: boolean): void;
    loadScene(name: string): void;
    loadOpeningScene(): void;
    update(): void;
}

export class SceneManager implements ISceneManager {
    private scenes: Map<string, SystemType<ISystem>[]> = new Map();
    private openingSceneName: string;
    private currentSceneName: string;
    private pendingToLoadSceneName: string;

    constructor(
        private entityManager: IEntityManager,
        private systemManager: ISystemManager,
    ) {}

    public addScene(name: string, systemTypes: SystemType<ISystem>[], openingScene: boolean = false): void {
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

            this.mainCameraFactory();
            this.enableCurrentScene();
        }
    }

    private destroyCurrentScene(): void {
        this.entityManager.removeAllEntities();
        this.scenes.get(this.currentSceneName).forEach((systemType) => this.systemManager.disable(systemType));
    }

    private mainCameraFactory(): void {
        this.entityManager.createEntity([Transform, Camera]);
    }

    private enableCurrentScene(): void {
        this.scenes.get(this.currentSceneName).forEach((systemType) => this.systemManager.enable(systemType));
    }
}
