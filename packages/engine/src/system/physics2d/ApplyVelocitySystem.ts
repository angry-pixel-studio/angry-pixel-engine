import { inject, injectable } from "@angry-pixel/ioc";
import { EntityManager, System } from "@angry-pixel/ecs";
import { Vector2 } from "@angry-pixel/math";
import { SYMBOLS } from "@config/dependencySymbols";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { TimeManager } from "@manager/TimeManager";
import { Transform } from "@component/gameLogic/Transform";
import { RigidBody, RigidBodyType } from "@component/physics2d/RigidBody";
import { TransformSystem } from "@system/gameLogic/TransformSystem";

@injectable(SYSTEM_SYMBOLS.ApplyVelocitySystem)
export class ApplyVelocitySystem implements System {
    // auxiliars
    private types = new Set([RigidBodyType.Dynamic, RigidBodyType.Kinematic]);
    private displacement: Vector2 = new Vector2();
    private totalAcceleration: Vector2 = new Vector2();
    private scaledAcceleration: Vector2 = new Vector2();
    private scaledVelocity: Vector2 = new Vector2();

    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.TimeManager) private readonly timeManager: TimeManager,
        @inject(SYSTEM_SYMBOLS.TransformSystem) private readonly transformSystem: TransformSystem,
    ) {}

    public onUpdate(): void {
        this.entityManager
            .search(RigidBody)
            .filter(({ component: { type } }) => this.types.has(type))
            .forEach(({ component: { velocity, acceleration, gravity, type }, entity }) => {
                const { position } = this.entityManager.getComponent(entity, Transform);

                // apply gravity to acceleration (only for dynamyc bodies)
                if (type === RigidBodyType.Dynamic) {
                    this.totalAcceleration.y = acceleration.y - gravity;
                    this.totalAcceleration.x = acceleration.x;
                } else {
                    this.totalAcceleration.copy(acceleration);
                }

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
