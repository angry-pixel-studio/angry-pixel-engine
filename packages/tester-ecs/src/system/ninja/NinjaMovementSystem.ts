import { BoxCollider, Entity, GameSystem, RigidBody, Transform } from "angry-pixel";
import { NinjaMovement } from "@component/ninja/NinjaMovement";
import { InputController } from "@component/InputController";
import { COLLISION_LAYERS } from "@config/layers";

export class NinjaMovementSystem extends GameSystem {
    // We keep these references in memory because this system only works with a single entity.
    private entity: Entity;
    private inputController: InputController;
    private ninjaMovement: NinjaMovement;
    private rigidBody: RigidBody;
    private collider: BoxCollider;
    private transform: Transform;

    public onEnabled(): void {
        this.inputController = this.entityManager.search(InputController)[0].component;
        ({ entity: this.entity, component: this.ninjaMovement } = this.entityManager.search(NinjaMovement)[0]);
        this.transform = this.entityManager.getComponent(this.entity, Transform);
        this.rigidBody = this.entityManager.getComponent(this.entity, RigidBody);
        this.collider = this.entityManager.searchInChildren(this.entity, BoxCollider)[0].component;
    }

    public onUpdate(): void {
        this.rigidBody.gravity = this.ninjaMovement.gravity;

        this.ninjaMovement.platformCollision = this.collisionRepository.findCollisionsForColliderAndLayer(
            this.collider,
            COLLISION_LAYERS.MovingPlatform,
        )[0];

        this.ninjaMovement.grounded =
            this.collisionRepository.findCollisionsForColliderAndLayer(this.collider, COLLISION_LAYERS.Foreground)
                .length > 0 || this.ninjaMovement.platformCollision !== undefined;

        this.walk();
        this.jump();
        this.checkForMovingPlatform();
    }

    private walk(): void {
        this.rigidBody.velocity.x = this.inputController.axes.x * this.ninjaMovement.walkSpeed;
        this.ninjaMovement.walking = this.ninjaMovement.grounded && this.rigidBody.velocity.x !== 0;
    }

    private jump(): void {
        this.ninjaMovement.jumping &&= !this.ninjaMovement.grounded;

        if (this.ninjaMovement.grounded && this.inputController.jump && this.ninjaMovement.jumpReleased) {
            this.ninjaMovement.jumping = true;
            this.rigidBody.velocity.y = this.ninjaMovement.jumpSpeed;
        }

        this.ninjaMovement.jumpReleased = !this.inputController.jump;
    }

    private checkForMovingPlatform(): void {
        if (this.ninjaMovement.platformCollision && !this.transform._parent) {
            const platformEntity = this.ninjaMovement.platformCollision.remoteEntity;
            this.entityManager.setParent(this.entity, platformEntity);
        } else if (!this.ninjaMovement.platformCollision && this.transform._parent) {
            this.entityManager.removeParent(this.entity);
        }
    }
}
