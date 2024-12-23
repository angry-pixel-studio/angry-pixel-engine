import { inject, injectable } from "@ioc";
import { EntityManager, System } from "@ecs";
import { Vector2 } from "@math";
import { CollisionRepository } from "@collisions2d";
import { TYPES } from "@config/types";
import { SYSTEMS } from "@config/systemTypes";
import { Transform } from "@component/gameLogic/Transform";
import { RigidBody, RigidBodyType } from "@component/physics2d/RigidBody";
import { TransformSystem } from "@system/gameLogic/TransformSystem";

@injectable(SYSTEMS.ApplyRepositionSystem)
export class ApplyRepositionSystem implements System {
    // auxiliars
    private correction: Vector2 = new Vector2();
    private maxCorrection: Vector2 = new Vector2();

    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.CollisionRepository) private collisionRepository: CollisionRepository,
        @inject(SYSTEMS.TransformSystem) private readonly transformSystem: TransformSystem,
    ) {}

    public onUpdate(): void {
        const collisions = this.collisionRepository
            .findAll()
            .filter(
                ({ localCollider, remoteCollider, remoteEntity, localEntity }) =>
                    localCollider.physics &&
                    remoteCollider.physics &&
                    this.entityManager.hasComponent(localEntity, RigidBody) &&
                    this.entityManager.hasComponent(remoteEntity, RigidBody),
            );

        if (collisions.length === 0) return;

        this.entityManager
            .search(RigidBody, { type: RigidBodyType.Dynamic })
            .forEach(({ component: rigidBody, entity }) => {
                this.maxCorrection.set(0, 0);

                collisions
                    .filter(({ localEntity }) => entity === localEntity)
                    .forEach(({ remoteEntity, resolution: { direction, penetration } }) => {
                        // if remote body is dynamic and since the correction distance must be the same as the penetration,
                        // both bodies will be displaced by half the penetration
                        if (this.entityManager.getComponent(remoteEntity, RigidBody).type === RigidBodyType.Dynamic) {
                            penetration /= 2;
                        }

                        Vector2.scale(this.correction, direction, -penetration);

                        if (this.correction.magnitude > this.maxCorrection.magnitude) {
                            this.maxCorrection.copy(this.correction);
                        }
                    });

                if (this.maxCorrection.x === 0 && this.maxCorrection.y === 0) return;

                const { position } = this.entityManager.getComponent(entity, Transform);
                Vector2.add(position, position, this.maxCorrection);

                // due to gravity, we need to stop vertical velocity if it's direction is inverse to the correction direction
                if (rigidBody.gravity > 0 && this.maxCorrection.y * rigidBody.velocity.y < 0) {
                    rigidBody.velocity.y = 0;
                }
            });

        this.transformSystem.onUpdate();
    }
}
