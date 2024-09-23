import { EntityManager } from "../../ecs/EntityManager";
import { System, SystemType } from "../../ecs/SystemManager";
import { IInputManager } from "../../input";
import { inject } from "../../ioc/container";
import { TYPES } from "../../config/types";
import { IAssetManager } from "../manager/AssetManager";
import { ICollisionQueryManager } from "../manager/CollisionQueryManager";
import { ISceneManager } from "../manager/SceneManager";
import { ITimeManager } from "../manager/TimeManager";

export enum SystemGroup {
    GameLogic,
    GamePhysics,
    GamePreRender,
    Physics,
    PostGameLogic,
    PreGameLogic,
    Render,
}

export abstract class GameSystem implements System {
    constructor(
        @inject(TYPES.EntityManager) protected readonly entityManager: EntityManager,
        @inject(TYPES.AssetManager) protected readonly assetManager: IAssetManager,
        @inject(TYPES.SceneManager) protected readonly sceneManager: ISceneManager,
        @inject(TYPES.TimeManager) protected readonly timeManager: ITimeManager,
        @inject(TYPES.InputManager) protected readonly inputManager: IInputManager,
        @inject(TYPES.CollisionQueryManager) protected readonly collisionQueryManager: ICollisionQueryManager,
    ) {}

    public onUpdate(): void {}
}

export function gameLogicSystem() {
    return function (target: SystemType) {
        addSystemGroup(target, SystemGroup.GameLogic);
    };
}

export function gamePhysicsSystem() {
    return function (target: SystemType) {
        addSystemGroup(target, SystemGroup.GamePhysics);
    };
}

export function gamePreRenderSystem() {
    return function (target: SystemType) {
        addSystemGroup(target, SystemGroup.GamePreRender);
    };
}

const addSystemGroup = (target: SystemType, group: SystemGroup): void => {
    if (!target.prototype._group) target.prototype._group = group;
};

export const getSystemGroup = (target: SystemType): SystemGroup => target.prototype._group ?? SystemGroup.GameLogic;
