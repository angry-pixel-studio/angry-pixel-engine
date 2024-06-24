import { Vector2 } from "../../math";
import { RigidBodyType } from "../component/RigidBody";
import { SystemBase } from "./System";

export class ApplyVelocitySystem extends SystemBase {
    private cacheDistance: Vector2 = new Vector2();

    public update(time: number) {
        this.entityManager
            .getEntities()
            .filter(([e, t, rb]) => rb && rb.type === RigidBodyType.Dynamic)
            .forEach(([entity, transform, rigidBody]) => {
                // apply gravity to velocity
                rigidBody.velocity.y -= rigidBody.gravity * time;

                // apply acceleration and velocity to transform
                Vector2.add(
                    transform.position,
                    transform.position,
                    Vector2.scale(
                        this.cacheDistance,
                        Vector2.add(rigidBody.velocity, rigidBody.velocity, rigidBody.acceleration),
                        time,
                    ),
                );
            });
    }
}
