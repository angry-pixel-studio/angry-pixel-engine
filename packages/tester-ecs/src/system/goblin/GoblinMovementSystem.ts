import {
    BoxCollider,
    CollisionRepository,
    EdgeCollider,
    EntityManager,
    inject,
    RigidBody,
    Symbols,
    System,
    Transform,
} from "angry-pixel-engine";
import { GoblinMovement } from "@component/goblin/GoblinMovement";
import { COLLISION_LAYERS } from "@config/layers";

export class GoblinMovementSystem implements System {
    @inject(Symbols.EntityManager) private readonly entityManager: EntityManager;
    @inject(Symbols.CollisionRepository) private readonly collisionRepository: CollisionRepository;

    public onUpdate(): void {
        this.entityManager.search(GoblinMovement).forEach(({ entity, component: movement }) => {
            const rigidBody = this.entityManager.getComponent(entity, RigidBody);
            const transform = this.entityManager.getComponent(entity, Transform);
            const edgeCollider = this.entityManager.getComponent(entity, EdgeCollider);

            const bodyCollisions = this.collisionRepository.findCollisionsForColliderAndLayer(
                this.entityManager.getComponent(entity, BoxCollider),
                COLLISION_LAYERS.Foreground,
            );
            const bodyCollision = bodyCollisions.length > 0;

            const edgeCollision =
                this.collisionRepository.findCollisionsForColliderAndLayer(edgeCollider, COLLISION_LAYERS.Foreground)
                    .length > 0;

            const wallCollision = bodyCollision && bodyCollisions.some((c) => c.resolution.direction.x !== 0);

            const yVelocity: number = bodyCollision ? 0 : rigidBody.velocity.y;

            if ((!edgeCollision || wallCollision) && bodyCollision) transform.scale.x *= -1;

            rigidBody.velocity.set(Math.sign(transform.scale.x) * movement.walkSpeed, yVelocity);
        });
    }
}
