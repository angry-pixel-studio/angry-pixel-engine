import { CollisionManager, Collision } from "../collision/CollisionManager";
import { Vector2 } from "../../math/Vector2";
import { RigidBodyData } from "./RigidBodyData";

type Axis = "x" | "y";

export enum RigidBodyType {
    Static,
    Dynamic,
}

export class RigidBodyManager {
    private rigidBodyData: RigidBodyData[] = [];

    private cachePosition: Vector2 = new Vector2();
    private cacheVelocity: Vector2 = new Vector2();
    private cacheDisplacement: Vector2 = new Vector2();
    private cacheNewDisplacement: number = 0;
    private cacheCollisions: Collision[];

    constructor(private readonly collisionManager: CollisionManager) {}

    public addRigidBodyData(data: RigidBodyData): void {
        this.rigidBodyData.push(data);
    }

    public update(deltaTime: number): void {
        this.rigidBodyData.forEach((data) => {
            this.applyGravity(data, deltaTime);

            this.applyVelocity(data, deltaTime, "x");
            this.applyReposition(data, "x");

            this.applyVelocity(data, deltaTime, "y");
            this.applyReposition(data, "y");
        });
    }

    private applyGravity(data: RigidBodyData, deltaTime: number): void {
        if (data.gravity > 0) {
            data.velocity.y -= data.gravity * deltaTime;
        }
    }

    private applyVelocity(data: RigidBodyData, deltaTime: number, axis: Axis): void {
        this.cacheVelocity.set(0, 0);

        this.cacheVelocity[axis] = data.velocity[axis] * deltaTime;
        Vector2.add(data.position, data.position, this.cacheVelocity);

        data.colliders.forEach((collider) => {
            collider.position = Vector2.add(this.cachePosition, collider.position, this.cacheVelocity);
            this.collisionManager.refreshCollisionsForCollider(collider);
        });
    }

    private applyReposition(data: RigidBodyData, axis: Axis): void {
        this.cacheCollisions = this.getCollisions(data);

        if (this.cacheCollisions.length === 0) return;

        this.cacheDisplacement.set(0, 0);

        this.cacheCollisions.forEach((collision: Collision) => {
            this.cacheNewDisplacement =
                collision.collisionData.displacementDirection[axis] * collision.collisionData.penetration;

            this.cacheDisplacement[axis] =
                Math.abs(this.cacheDisplacement[axis]) > Math.abs(this.cacheNewDisplacement)
                    ? this.cacheDisplacement[axis]
                    : this.cacheNewDisplacement;
        });

        if (this.cacheDisplacement.magnitude <= 0) {
            return;
        }

        Vector2.add(data.position, data.position, this.cacheDisplacement);

        data.colliders.forEach((collider) => {
            collider.position = Vector2.add(this.cachePosition, collider.position, this.cacheDisplacement);
            this.collisionManager.refreshCollisionsForCollider(collider);
        });

        if (
            this.cacheDisplacement[axis] !== 0 &&
            Math.sign(this.cacheDisplacement[axis]) !== Math.sign(data.velocity[axis])
        ) {
            data.velocity[axis] = 0;
        }
    }

    private getCollisions(data: RigidBodyData): Collision[] {
        return data.colliders.reduce<Collision[]>((collisions, collider) => {
            collisions.push(
                ...this.collisionManager
                    .getFrameCollisionsForCollider(collider)
                    .filter(
                        (collision) =>
                            collision.remoteCollider.physics &&
                            collision.remoteCollider.gameObject.rigidBody &&
                            data.layersToCollider.includes(collision.remoteCollider.gameObject.layer)
                    )
            );
            return collisions;
        }, []);
    }

    public clear(): void {
        this.rigidBodyData = [];
    }
}
