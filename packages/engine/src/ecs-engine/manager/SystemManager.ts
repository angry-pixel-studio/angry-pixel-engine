import { IInputManager } from "../../input";
import { IAssetManager } from "./AssetManager";
import { IEntityManager } from "./EntityManager";
import { ISceneManager } from "./SceneManager";
import { ITimeManager } from "./TimeManager";
import { ICollisionQueryManager } from "./CollisionQueryManager";

export enum SystemGroup {
    GameLogic = "GameLogic",
    GamePhysics = "GamePhysics",
    GamePreRender = "GamePreRender",
    Physics = "Physics",
    PostGameLogic = "PostGameLogic",
    PreGameLogic = "PreGameLogic",
    Render = "Render",
}

export type SystemType<T extends ISystem = ISystem> = { new (...args: any[]): T };

export interface ISystem {
    group: SystemGroup;
    enabled: boolean;
    onCreate(): void;
    onUpdate(): void;
    onDestroy(): void;
}

export abstract class System implements ISystem {
    public group: SystemGroup;

    private _enabled: boolean;

    public get enabled(): boolean {
        return this._enabled;
    }

    public set enabled(enabled: boolean) {
        if (this._enabled === enabled) return;
        this._enabled = enabled;
        this._enabled ? this.onEnable() : this.onDisable();
    }

    public onCreate(): void {}

    public onEnable(): void {}

    public onUpdate(): void {}

    public onDisable(): void {}

    public onDestroy(): void {}
}

export abstract class GameSystem extends System {
    constructor(
        protected entityManager: IEntityManager,
        protected assetManager: IAssetManager,
        protected sceneManager: ISceneManager,
        protected timeManager: ITimeManager,
        protected inputManager: IInputManager,
        protected collisionQueryManager: ICollisionQueryManager,
    ) {
        super();
        if (!this.group) this.group = SystemGroup.GameLogic;
    }
}

export interface ISystemManager {
    addSystem<T extends ISystem>(system: T, enabled?: boolean): T;
    hasSystem<T extends ISystem>(systemType: SystemType<T>): boolean;
    enable<T extends ISystem>(systemType: SystemType<T>): void;
    disable<T extends ISystem>(systemType: SystemType<T>): void;
    remove<T extends ISystem>(systemType: SystemType<T>): void;
    update(group: SystemGroup): void;
}

export class SystemManager implements ISystemManager {
    private systems: Map<SystemGroup, ISystem[]> = new Map();

    constructor() {
        // game systems
        this.systems.set(SystemGroup.GameLogic, []);
        this.systems.set(SystemGroup.GamePhysics, []);
        this.systems.set(SystemGroup.GamePreRender, []);
        // engine systems
        this.systems.set(SystemGroup.PreGameLogic, []);
        this.systems.set(SystemGroup.Physics, []);
        this.systems.set(SystemGroup.Render, []);
        this.systems.set(SystemGroup.PostGameLogic, []);
    }

    public addSystem<T extends ISystem>(system: T, enabled: boolean = true): T {
        this.validateSystem(system);

        system.onCreate();
        system.enabled = enabled;

        this.systems.get(system.group).push(system);

        return system;
    }

    public hasSystem<T extends ISystem>(systemType: SystemType<T>): boolean {
        for (const group of this.systems.values()) {
            for (const system of group) {
                if (system instanceof systemType) return true;
            }
        }
        return false;
    }

    private validateSystem(system: ISystem): void {
        for (const group of this.systems) {
            if (group.find((found) => found.constructor === system.constructor)) {
                throw new Error(`There cannot be more than one system of type ${system.constructor.name}`);
            }
        }
    }

    public enable(systemType: SystemType): void {
        this.setEnabled(systemType, true);
    }

    public disable(systemType: SystemType): void {
        this.setEnabled(systemType, false);
    }

    private setEnabled(systemType: SystemType, enabled: boolean): void {
        for (const group of this.systems.values()) {
            for (const system of group) {
                if (system instanceof systemType) {
                    system.enabled = enabled;
                    return;
                }
            }
        }
    }

    public remove<T extends ISystem>(systemType: SystemType<T>): void {
        for (const group of this.systems.values()) {
            const index = group.findIndex((system) => system instanceof systemType);

            if (index !== -1) {
                group[index].onDestroy();
                group.splice(index, 1);

                return;
            }
        }
    }

    public update(group: SystemGroup): void {
        this.systems
            .get(group)
            .filter((system) => system.enabled)
            .forEach((system) => system.onUpdate());
    }
}

export function gameLogicSystem() {
    return function <T extends { new (...args: any[]): System }>(constructor: T) {
        return systemGroupDecorator<T>(constructor, SystemGroup.GameLogic);
    };
}

export function gamePhysicsSystem() {
    return function <T extends { new (...args: any[]): System }>(constructor: T) {
        return systemGroupDecorator<T>(constructor, SystemGroup.GamePhysics);
    };
}

export function gamePeRenderSystem() {
    return function <T extends { new (...args: any[]): System }>(constructor: T) {
        return systemGroupDecorator<T>(constructor, SystemGroup.GamePreRender);
    };
}

const systemGroupDecorator = <T extends { new (...args: any[]): System }>(constructor: T, group: SystemGroup) => {
    constructor.prototype.group = group;
    return constructor;
};
