import { Vector2 } from "../../math";
import { ICollision } from "../collision/Collision";
import { RigidBodyType } from "../component/RigidBody";
import { SystemBase } from "./System";
import { ITransform } from "../component/Transform";
import { ICollider } from "../component/Collider";

export class ApplyRepositionSystem extends SystemBase {
    // cache
    private displacement: Vector2 = new Vector2();
    private children: number[];

    public update(collisions: ICollision[]) {
        this.entityManager
            .getEntities()
            .filter(([e, t, rb]) => rb && rb.type === RigidBodyType.Dynamic)
            .forEach(([entity, transform, rigidBody]) => {
                this.displacement.set(0, 0);
                this.children = this.getChildrenColliders(transform).map((c) => c.id);

                collisions
                    .filter(
                        ({ localCollider }) =>
                            localCollider.physics &&
                            (localCollider.entity === entity || this.children.includes(localCollider.id)),
                    )
                    .forEach(({ resolution: { direction, penetration } }) => {
                        if (penetration > this.displacement.magnitude) {
                            Vector2.scale(this.displacement, direction, -penetration);
                        }
                    });

                Vector2.add(transform.position, transform.position, this.displacement);

                // stop velocity if it's direction is inverse to the displacement direction
                // e.g. stops the gravity velocity if the object reachs ground
                if (this.displacement.magnitude === 0) return;

                if (this.displacement.x * rigidBody.velocity.x < 0) rigidBody.velocity.x = 0;
                // else rigidBody.velocity.x += this.remoteVelocity.x;

                if (this.displacement.y * rigidBody.velocity.y < 0) rigidBody.velocity.y = 0;
                // else rigidBody.velocity.y += this.displacement.y;
            });
    }

    public getChildrenColliders(transform: ITransform): ICollider[] {
        const result: ICollider[] = [];

        this.entityManager
            .getEntities()
            .filter((e) => e[1].parent === transform && !e[2])
            .forEach((e) => {
                result.push(...e[3]);
                result.push(...this.getChildrenColliders(e[1]));
            });

        return result;
    }
}
