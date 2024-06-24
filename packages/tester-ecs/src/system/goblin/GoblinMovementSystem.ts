import { BoxCollider, EdgeCollider, GameSystem, RigidBody, Transform } from "angry-pixel-ecs";
import { GoblinMovement } from "../../component/goblin/GoblinMovement";
import { COLLISION_LAYERS } from "../../config/layers";

export class GoblinMovementSystem extends GameSystem {
    public onUpdate(): void {
        this.entityManager.search(GoblinMovement).forEach(({ entity, component: movement }) => {
            const rigidBody = this.entityManager.getComponent(entity, RigidBody);
            const transform = this.entityManager.getComponent(entity, Transform);
            const edgeCollider = this.entityManager.getComponent(entity, EdgeCollider);

            const bodyCollisions = this.collisionQueryManager.findCollisionsForColliderAndLayer(
                this.entityManager.getComponent(entity, BoxCollider),
                COLLISION_LAYERS.Foreground,
            );
            const bodyCollision = bodyCollisions.length > 0;

            const edgeCollision =
                this.collisionQueryManager.findCollisionsForColliderAndLayer(edgeCollider, COLLISION_LAYERS.Foreground)
                    .length > 0;

            /*const ninjaCollision =
                this.collisionQueryManager.findCollisionsForColliderAndLayer(edgeCollider, COLLISION_LAYERS.Ninja)
                    .length > 0;*/

            const wallCollision = bodyCollision && bodyCollisions.some((c) => c.resolution.direction.x !== 0);

            const yVelocity: number = bodyCollision ? 0 : rigidBody.velocity.y;

            if ((!edgeCollision || wallCollision) && bodyCollision) transform.scale.x *= -1;

            /*if (ninjaCollision && !movement.jumping) {
                movement.jumping = true;
                yVelocity = movement.jumpSpeed;
            }

            if (!ninjaCollision) movement.jumping = false;*/

            rigidBody.velocity.set(Math.sign(transform.scale.x) * movement.walkSpeed, yVelocity);
        });
    }
}
