import { TYPES } from "@config/types";
import { EntityManager, System } from "@ecs";
import { inject } from "@ioc";
import { AssetManager } from "@manager/AssetManager";
import { InputManager } from "@manager/InputManager";
import { SceneManager } from "@manager/SceneManager";
import { TimeManager } from "@manager/TimeManager";
import { CollisionRepository } from "@physics2d";

export abstract class GameSystem implements System {
    @inject(TYPES.EntityManager) protected readonly entityManager: EntityManager;
    @inject(TYPES.AssetManager) protected readonly assetManager: AssetManager;
    @inject(TYPES.SceneManager) protected readonly sceneManager: SceneManager;
    @inject(TYPES.TimeManager) protected readonly timeManager: TimeManager;
    @inject(TYPES.InputManager) protected readonly inputManager: InputManager;
    @inject(TYPES.CollisionRepository) protected readonly collisionQueryManager: CollisionRepository;

    public onUpdate(): void {}
}
