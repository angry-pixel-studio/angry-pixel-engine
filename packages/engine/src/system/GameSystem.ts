import { SYMBOLS } from "@config/dependencySymbols";
import { EntityManager, System } from "@angry-pixel/ecs";
import { inject } from "@angry-pixel/ioc";
import { AssetManager } from "@manager/AssetManager";
import { InputManager } from "@manager/InputManager";
import { SceneManager } from "@manager/SceneManager";
import { TimeManager } from "@manager/TimeManager";
import { CollisionRepository } from "@angry-pixel/collisions";
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
    @inject(SYMBOLS.EntityManager) protected readonly entityManager: EntityManager;
    @inject(SYMBOLS.AssetManager) protected readonly assetManager: AssetManager;
    @inject(SYMBOLS.SceneManager) protected readonly sceneManager: SceneManager;
    @inject(SYMBOLS.TimeManager) protected readonly timeManager: TimeManager;
    @inject(SYMBOLS.InputManager) protected readonly inputManager: InputManager;
    @inject(SYMBOLS.CollisionRepository) protected readonly collisionRepository: CollisionRepository;
    @inject(SYMBOLS.GameConfig) protected readonly gameConfig: GameConfig;

    public onUpdate(): void {}

    public onCreate(): void {}

    public onEnabled(): void {}

    public onDisabled(): void {}

    public onDestroy(): void {}
}
