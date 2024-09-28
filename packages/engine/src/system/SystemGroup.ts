import { SystemType } from "@ecs";

export enum SystemGroup {
    GameLogic,
    GamePhysics,
    GamePreRender,
    Physics,
    PostGameLogic,
    PreGameLogic,
    Render,
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
    if (!target.prototype.__system_group) target.prototype.__system_group = group;
};

export const getSystemGroup = (target: SystemType): SystemGroup =>
    target.prototype.__system_group ?? SystemGroup.GameLogic;
