import { CollisionManager, Collision } from "./collision/CollisionManager";
import { GameObject } from "../core/GameObject";
import { Vector2 } from "../math/Vector2";
import { ICollider } from "./collision/collider/ICollider";
import { TimeManager } from "../core/managers/TimeManager";

type Axis = "x" | "y";

export enum RigidBodyType {
    Static,
    Dynamic,
}

export interface RigidBodyData {
    gameObject: GameObject;
    gravity: Vector2;
    velocity: Vector2;
    layersToCollider: string[];
    colliders: ICollider[];
}

export class PhysicsManager {
    private rigidBodyData: RigidBodyData[] = [];

    private cachePosition: Vector2 = new Vector2();
    private cacheVelocity: Vector2 = new Vector2();
    private cacheGravity: Vector2 = new Vector2();
    private cacheDisplacement: Vector2 = new Vector2();
    private cacheNewDisplacement: number = 0;
    private cacheCollisions: Collision[];

    constructor(private readonly timeManager: TimeManager, private readonly collisionManager: CollisionManager) {}

    public addRigidBodyData(data: RigidBodyData): void {
        this.rigidBodyData.push(data);
    }

    public update(): void {
        this.rigidBodyData.forEach((data) => {
            this.applyGravity(data);

            this.applyVelocity(data, "x");
            this.applyReposition(data, "x");

            this.applyVelocity(data, "y");
            this.applyReposition(data, "y");
        });
    }

    private applyGravity(data: RigidBodyData): void {
        if (data.gravity.y > 0) {
            Vector2.subtract(
                data.velocity,
                data.velocity,
                Vector2.scale(this.cacheGravity, data.gravity, this.timeManager.physicsDeltaTime)
            );
        }
    }

    private applyVelocity(data: RigidBodyData, axis: Axis): void {
        this.cacheVelocity.set(0, 0);

        this.cacheVelocity[axis] = data.velocity[axis] * this.timeManager.physicsDeltaTime;
        Vector2.add(data.gameObject.transform.position, data.gameObject.transform.position, this.cacheVelocity);

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

        Vector2.add(data.gameObject.transform.position, data.gameObject.transform.position, this.cacheDisplacement);

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
