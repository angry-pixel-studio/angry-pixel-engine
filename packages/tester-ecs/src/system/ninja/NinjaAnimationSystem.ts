import { Animator, GameSystem, RigidBody, Transform } from "angry-pixel";
import { NinjaMovement } from "@component/ninja/NinjaMovement";

export class NinjaAnimationSystem extends GameSystem {
    public onUpdate(): void {
        this.entityManager.search(NinjaMovement).forEach(({ entity, component: movements }) => {
            const animator = this.entityManager.getComponent(entity, Animator);
            const rigidBody = this.entityManager.getComponent(entity, RigidBody);
            const transform = this.entityManager.getComponent(entity, Transform);

            transform.scale.x =
                rigidBody.velocity.x !== 0
                    ? Math.sign(rigidBody.velocity.x) * Math.abs(transform.scale.x)
                    : transform.scale.x;

            if (rigidBody.velocity.x !== 0 && movements.grounded) animator.animation = "run";
            else animator.animation = "idle";
        });
    }
}
