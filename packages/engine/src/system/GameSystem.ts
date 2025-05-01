import { DEPENDENCY_TYPES } from "@config/dependencyTypes";
import { EntityManager, System } from "@ecs";
import { inject } from "@ioc";
import { AssetManager } from "@manager/AssetManager";
import { InputManager } from "@manager/InputManager";
import { SceneManager } from "@manager/SceneManager";
import { TimeManager } from "@manager/TimeManager";
import { CollisionRepository } from "@collisions2d";
import { GameConfig } from "@config/bootstrap";

/**
 * Abstract base class for creating game systems with commonly needed dependencies injected.\
 * Provides access to the following core managers and services:\
 * - EntityManager: For managing game entities and components\
 * - AssetManager: For loading and managing game resources\
 * - SceneManager: For controlling scene transitions and state\
 * - TimeManager: For handling game timing and delta time\
 * - InputManager: For processing keyboard, mouse and touch input\
 * - CollisionRepository: For physics and collision detection\
 * - GameConfig: For accessing game configuration settings
 * @public
 * @category Core
 * @example
 * ```javascript
 * class SomeSystem extends GameSystem {
 *   onUpdate() {
 *     const result = this.entityManager.search(SomeComponent);
 *   }
 * }
 * ```
 */
export abstract class GameSystem implements System {
    @inject(DEPENDENCY_TYPES.EntityManager) protected readonly entityManager: EntityManager;
    @inject(DEPENDENCY_TYPES.AssetManager) protected readonly assetManager: AssetManager;
    @inject(DEPENDENCY_TYPES.SceneManager) protected readonly sceneManager: SceneManager;
    @inject(DEPENDENCY_TYPES.TimeManager) protected readonly timeManager: TimeManager;
    @inject(DEPENDENCY_TYPES.InputManager) protected readonly inputManager: InputManager;
    @inject(DEPENDENCY_TYPES.CollisionRepository) protected readonly collisionRepository: CollisionRepository;
    @inject(DEPENDENCY_TYPES.GameConfig) protected readonly gameConfig: GameConfig;

    public onUpdate(): void {}

    public onCreate(): void {}

    public onEnabled(): void {}

    public onDisabled(): void {}

    public onDestroy(): void {}
}
