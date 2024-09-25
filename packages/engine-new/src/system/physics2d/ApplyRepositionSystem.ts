import { inject, injectable } from "ioc";
import { EntityManager, System, Entity } from "ecs";
import { Vector2 } from "math";
import { CollisionRepository } from "physics2d";
import { TYPES } from "config/types";
import { SYSTEMS } from "config/systems";
import { Transform } from "component/gameLogic/Transform";
import { RigidBody, RigidBodyType } from "component/physics2d/RigidBody";
import { TransformSystem } from "system/gameLogic/TransformSystem";

@injectable(SYSTEMS.ApplyRepositionSystem)
export class ApplyRepositionSystem implements System {
    // auxiliar
    private displacement: Vector2 = new Vector2();

    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.CollisionRepository) private collisionRepository: CollisionRepository,
        @inject(SYSTEMS.TransformSystem) private readonly transformSystem: TransformSystem,
    ) {}

    public onUpdate(): void {
        this.entityManager
            .search(RigidBody, { type: RigidBodyType.Dynamic })
            .forEach(({ component: rigidBody, entity }) => {
                const transform = this.entityManager.getComponent(entity, Transform);
                const entities = this.getChildren(transform);
                entities.unshift(entity);
                this.displacement.set(0, 0);

                this.collisionRepository
                    .findAll()
                    .filter(({ localCollider, localEntity }) => entities.includes(localEntity) && localCollider.physics)
                    .forEach(({ resolution: { direction, penetration } }) => {
                        if (penetration > this.displacement.magnitude) {
                            Vector2.scale(this.displacement, direction, -penetration);
                        }
                    });

                if (this.displacement.magnitude === 0) return;

                Vector2.add(transform.position, transform.position, this.displacement);

                // stop velocity if it's direction is inverse to the displacement direction
                // e.g. stops the gravity velocity if the object reachs ground
                if (this.displacement.x * rigidBody.velocity.x < 0) rigidBody.velocity.x = 0;
                if (this.displacement.y * rigidBody.velocity.y < 0) rigidBody.velocity.y = 0;
            });

        this.transformSystem.onUpdate();
    }

    public getChildren(parent: Transform): Entity[] {
        const result: Entity[] = [];

        this.entityManager.search(Transform, { parent }).forEach(({ entity, component: transform }) => {
            result.push(entity);
            result.push(...this.getChildren(transform));
        });

        return result;
    }
}
