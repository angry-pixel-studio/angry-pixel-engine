import { SYMBOLS } from "@config/dependencySymbols";
import { EntityManager, System, SystemManager } from "@angry-pixel/ecs";
import { inject } from "@angry-pixel/ioc";
import { AssetManager } from "@manager/AssetManager";
import { InputManager } from "@manager/InputManager";
import { SceneManager } from "@manager/SceneManager";
import { TimeManager } from "@manager/TimeManager";
import { CollisionRepository } from "@angry-pixel/collisions";
import { GameConfig } from "@config/bootstrap";

/**
 * Abstract base class for creating game systems with commonly needed dependencies injected.\
 * Provides access to the following core managers and services:
 * - EntityManager: For managing game entities and components
 * - SystemManager: For managing game systems
 * - AssetManager: For loading and managing game resources
 * - SceneManager: For controlling scene transitions and state
 * - TimeManager: For handling game timing and delta time
 * - InputManager: For processing keyboard, mouse and touch input
 * - CollisionRepository: For physics and collision detection
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
    @inject(SYMBOLS.SystemManager) protected readonly systemManager: SystemManager;
    @inject(SYMBOLS.AssetManager) protected readonly assetManager: AssetManager;
    @inject(SYMBOLS.SceneManager) protected readonly sceneManager: SceneManager;
    @inject(SYMBOLS.TimeManager) protected readonly timeManager: TimeManager;
    @inject(SYMBOLS.InputManager) protected readonly inputManager: InputManager;
    @inject(SYMBOLS.CollisionRepository) protected readonly collisionRepository: CollisionRepository;
    @inject(SYMBOLS.GameConfig) protected readonly gameConfig: GameConfig;

    /**
     * This method is called once every frame
     * @public
     */
    public onUpdate(): void {}

    /**
     * This method is called when the scene finishes loading, after its entities have been created
     * @public
     */
    public onSceneLoaded(): void {}

    /**
     * This method is called when the scene is destroyed, before its entities are removed
     * @public
     */
    public onSceneDestroyed(): void {}
}
