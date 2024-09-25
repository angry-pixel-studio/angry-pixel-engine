import { inject, injectable } from "ioc";
import { EntityManager, System } from "ecs";
import { Vector2 } from "math";
import { TYPES } from "config/types";
import { SYSTEMS } from "config/systems";
import { TimeManager } from "manager/TimeManager";
import { Transform } from "component/gameLogic/Transform";
import { RigidBody, RigidBodyType } from "component/physics2d/RigidBody";
import { TransformSystem } from "system/gameLogic/TransformSystem";

@injectable(SYSTEMS.ApplyVelocitySystem)
export class ApplyVelocitySystem implements System {
    // auxiliar
    private distance: Vector2 = new Vector2();

    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.TimeManager) private readonly timeManager: TimeManager,
        @inject(SYSTEMS.TransformSystem) private readonly transformSystem: TransformSystem,
    ) {}

    public onUpdate(): void {
        this.entityManager
            .search(RigidBody, { type: RigidBodyType.Dynamic })
            .forEach(({ component: rigidBody, entity }) => {
                const transform = this.entityManager.getComponent(entity, Transform);

                // apply gravity to velocity
                rigidBody.velocity.y -= rigidBody.gravity * this.timeManager.physicsDeltaTime;

                // apply acceleration and velocity to transform
                Vector2.add(
                    transform.position,
                    transform.position,
                    Vector2.scale(
                        this.distance,
                        Vector2.add(rigidBody.velocity, rigidBody.velocity, rigidBody.acceleration),
                        this.timeManager.physicsDeltaTime,
                    ),
                );
            });

        this.transformSystem.onUpdate();
    }
}
