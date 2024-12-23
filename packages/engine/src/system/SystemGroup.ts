import { SystemType } from "@ecs";

/** @internal */
export enum SystemGroup {
    GameLogic,
    GamePhysics,
    GamePreRender,
    Physics,
    PreGameLogic,
    Render,
    Transform,
}

/**
 * Decorator to indicate that the target system will run in the game logic loop.
 * @public
 * @category Decorators
 * @example
 * ```typescript
 * @gameLogicSystem()
 * class SomeSystem {
 * }
 * ```
 */
export function gameLogicSystem() {
    return function (target: SystemType) {
        addSystemGroup(target, SystemGroup.GameLogic);
    };
}

/**
 * Decorator to indicate that the target system will run in the physics loop.
 * @public
 * @category Decorators
 * @example
 * ```typescript
 * @gamePhysicsSystem()
 * class SomeSystem {
 * }
 * ```
 */
export function gamePhysicsSystem() {
    return function (target: SystemType) {
        addSystemGroup(target, SystemGroup.GamePhysics);
    };
}

/**
 * Decorator to indicate that the target system will be executed at the begining of the render loop.
 * @public
 * @category Decorators
 * @example
 * ```typescript
 * @gamePreRenderSystem()
 * class SomeSystem {
 * }
 * ```
 */
export function gamePreRenderSystem() {
    return function (target: SystemType) {
        addSystemGroup(target, SystemGroup.GamePreRender);
    };
}

/** @internal */
const addSystemGroup = (target: SystemType, group: SystemGroup): void => {
    if (!target.prototype.__system_group) target.prototype.__system_group = group;
};

/** @internal */
export const getSystemGroup = (target: SystemType): SystemGroup =>
    target.prototype.__system_group ?? SystemGroup.GameLogic;
