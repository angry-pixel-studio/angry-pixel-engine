import { TYPES } from "@config/types";
import { EntityManager, System } from "@ecs";
import { inject } from "@ioc";
import { AssetManager } from "@manager/AssetManager";
import { InputManager } from "@manager/InputManager";
import { SceneManager } from "@manager/SceneManager";
import { TimeManager } from "@manager/TimeManager";
import { CollisionRepository } from "@collisions2d";

/**
 * Abstract class which can be used to create Systems.\
 * It includes the following dependencies: EntityManager, AssetManager, SceneManager, TimeManager, InputManager, CollisionRepository.
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
    @inject(TYPES.EntityManager) protected readonly entityManager: EntityManager;
    @inject(TYPES.AssetManager) protected readonly assetManager: AssetManager;
    @inject(TYPES.SceneManager) protected readonly sceneManager: SceneManager;
    @inject(TYPES.TimeManager) protected readonly timeManager: TimeManager;
    @inject(TYPES.InputManager) protected readonly inputManager: InputManager;
    @inject(TYPES.CollisionRepository) protected readonly collisionRepository: CollisionRepository;

    public onUpdate(): void {}
}
