import { inject, injectable } from "@ioc";
import { EntityManager, System } from "@ecs";
import { Vector2 } from "@math";
import { TYPES } from "@config/types";
import { SYSTEMS } from "@config/systems";
import { TimeManager } from "@manager/TimeManager";
import { Transform } from "@component/gameLogic/Transform";
import { RigidBody, RigidBodyType } from "@component/physics2d/RigidBody";
import { TransformSystem } from "@system/gameLogic/TransformSystem";

@injectable(SYSTEMS.ApplyVelocitySystem)
export class ApplyVelocitySystem implements System {
    // auxiliars
    private displacement: Vector2 = new Vector2();
    private totalAcceleration: Vector2 = new Vector2();
    private scaledAcceleration: Vector2 = new Vector2();
    private scaledVelocity: Vector2 = new Vector2();

    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.TimeManager) private readonly timeManager: TimeManager,
        @inject(SYSTEMS.TransformSystem) private readonly transformSystem: TransformSystem,
    ) {}

    public onUpdate(): void {
        this.entityManager
            .search(RigidBody, { type: RigidBodyType.Dynamic })
            .forEach(({ component: { velocity, acceleration, gravity }, entity }) => {
                const { position } = this.entityManager.getComponent(entity, Transform);

                // apply gravity to acceleration
                this.totalAcceleration.y = acceleration.y - gravity;
                this.totalAcceleration.x = acceleration.x;

                // update velocity by the acceleration
                Vector2.add(
                    velocity,
                    velocity,
                    Vector2.scale(this.scaledAcceleration, this.totalAcceleration, this.timeManager.physicsDeltaTime),
                );

                // update position using UAM
                Vector2.add(
                    position,
                    position,
                    Vector2.add(
                        this.displacement,
                        Vector2.scale(this.scaledVelocity, velocity, this.timeManager.physicsDeltaTime),
                        Vector2.scale(
                            this.scaledAcceleration,
                            this.totalAcceleration,
                            0.5 * this.timeManager.physicsDeltaTime ** 2,
                        ),
                    ),
                );
            });

        this.transformSystem.onUpdate();
    }
}
