import { inject, injectable } from "@ioc";
import { Entity, EntityManager, System } from "@ecs";
import { Vector2 } from "@math";
import { CollisionRepository } from "@collisions2d";
import { TYPES } from "@config/types";
import { SYSTEMS } from "@config/systems";
import { Transform } from "@component/gameLogic/Transform";
import { RigidBody, RigidBodyType } from "@component/physics2d/RigidBody";
import { TransformSystem } from "@system/gameLogic/TransformSystem";

@injectable(SYSTEMS.ApplyRepositionSystem)
export class ApplyRepositionSystem implements System {
    // auxiliar
    private max: Vector2 = new Vector2();
    private min: Vector2 = new Vector2();
    private correction: Vector2 = new Vector2();
    private totalCorrection: Vector2 = new Vector2();

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
                this.max.set(0, 0);
                this.min.set(0, 0);

                collisions
                    .filter(({ localEntity }) => entity === localEntity)
                    .forEach(({ resolution: { direction, penetration } }) => {
                        Vector2.scale(this.correction, direction, -penetration);

                        if (this.correction.x > 0) this.max.x = Math.max(this.max.x, this.correction.x);
                        else if (this.correction.x < 0) this.min.x = Math.min(this.min.x, this.correction.x);

                        if (this.correction.y > 0) this.max.y = Math.max(this.max.y, this.correction.y);
                        else if (this.correction.y < 0) this.min.y = Math.min(this.min.y, this.correction.y);
                    });

                Vector2.add(this.totalCorrection, this.max, this.min);
                if (this.totalCorrection.x === 0 && this.totalCorrection.y === 0) return;

                const { position } = this.entityManager.getComponent(entity, Transform);
                Vector2.add(position, position, this.totalCorrection);

                // stop velocity if it's direction is inverse to the displacement direction
                // e.g. stops the gravity velocity if the object reachs ground
                if (this.totalCorrection.x * rigidBody.velocity.x < 0) rigidBody.velocity.x = 0;
                if (this.totalCorrection.y * rigidBody.velocity.y < 0) rigidBody.velocity.y = 0;
            });

        this.transformSystem.onUpdate();
    }
}
