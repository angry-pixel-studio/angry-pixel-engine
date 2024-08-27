import { EntityManager } from "../../ecs/EntityManager";
import { System, SystemType } from "../../ecs/SystemManager";
import { IInputManager } from "../../input";
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
        protected entityManager: EntityManager,
        protected assetManager: IAssetManager,
        protected sceneManager: ISceneManager,
        protected timeManager: ITimeManager,
        protected inputManager: IInputManager,
        protected collisionQueryManager: ICollisionQueryManager,
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
