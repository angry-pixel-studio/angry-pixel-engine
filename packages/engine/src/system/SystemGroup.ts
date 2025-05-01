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
 * Decorator to indicate that the target system will run in the game logic loop.\
 * Game logic systems handle core gameplay mechanics, AI behavior, input processing,\
 * and other non-physics, non-rendering game state updates that occur each frame.
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
 * Decorator to indicate that the target system will run in the physics loop.\
 * Physics systems handle physics calculations, collisions, and other physics-related updates.\
 * They typically run at a lower frequency than game logic systems to ensure accurate physics simulations.
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
 * Decorator to indicate that the target system will be executed at the begining of the render loop.\
 * Pre-render systems handle tasks that need to be completed before the final rendering step.\
 * They are useful for tasks like sorting sprites, updating UI elements, and positioning the camera before rendering,
 * along with other preparatory operations.
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
