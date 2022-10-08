import { CollisionManager, Collision } from "../collision/CollisionManager";
import { Vector2 } from "angry-pixel-math";
import { RigidBodyData } from "./RigidBodyData";

type Axis = "x" | "y";

export enum RigidBodyType {
    Static,
    Dynamic,
    Kinematic,
}

export class RigidBodyManager {
    private rigidBodyData: RigidBodyData[] = [];

    private cacheVelocity: Vector2 = new Vector2();
    private cacheDisplacement: Vector2 = new Vector2();
    private cacheNewDisplacement: number = 0;
    private cacheCollisions: Collision[];

    constructor(private readonly collisionManager: CollisionManager) {}

    public addRigidBodyData(data: RigidBodyData): void {
        data.cacheVelocity ? data.cacheVelocity.set(0, 0) : (data.cacheVelocity = new Vector2());
        this.rigidBodyData.push(data);
    }

    public removeRigidBodyData(data: RigidBodyData): void {
        const index: number = this.rigidBodyData.indexOf(data);
        if (index !== -1) {
            delete this.rigidBodyData[index];
            this.rigidBodyData.splice(index, 1);
        }
    }

    public update(deltaTime: number): void {
        this.rigidBodyData.forEach((data) => {
            if (data.type === RigidBodyType.Dynamic) {
                this.dynamicUpdate(data, deltaTime);
            } else if (data.type === RigidBodyType.Kinematic) {
                this.kinematicUpdate(data, deltaTime);
            }
        });
    }

    private dynamicUpdate(data: RigidBodyData, deltaTime: number) {
        this.applyGravity(data, deltaTime);

        this.applyVelocity(data, deltaTime, "x");
        this.applyReposition(data, "x", true);

        this.applyVelocity(data, deltaTime, "y");
        this.applyReposition(data, "y", true);
    }

    private kinematicUpdate(data: RigidBodyData, deltaTime: number) {
        Vector2.add(data.position, data.position, Vector2.scale(this.cacheVelocity, data.velocity, deltaTime));
    }

    private applyGravity(data: RigidBodyData, deltaTime: number): void {
        if (data.gravity > 0) {
            data.velocity.y -= data.gravity * deltaTime;
        }
    }

    private applyVelocity(data: RigidBodyData, deltaTime: number, axis: Axis): void {
        this.cacheVelocity.set(0, 0);

        this.cacheVelocity[axis] =
            (data.cacheVelocity[axis] !== 0 ? data.cacheVelocity[axis] : data.velocity[axis]) * deltaTime;
        Vector2.add(data.position, data.position, this.cacheVelocity);

        data.colliders.forEach((collider) => {
            Vector2.add(collider.shape.position, collider.shape.position, this.cacheVelocity);
            collider.shape.update();
            this.collisionManager.refreshCollisionsForCollider(collider);
        });
    }

    private applyReposition(data: RigidBodyData, axis: Axis, resetVelocity: boolean): void {
        this.cacheCollisions = this.getCollisions(data);

        if (this.cacheCollisions.length === 0) return;

        this.cacheDisplacement.set(0, 0);

        this.cacheCollisions.forEach((collision: Collision) => {
            this.cacheNewDisplacement =
                collision.resolution.displacementDirection[axis] * collision.resolution.penetration;

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
            Vector2.add(collider.shape.position, collider.shape.position, this.cacheDisplacement);
            collider.shape.update();
            this.collisionManager.refreshCollisionsForCollider(collider);
        });

        if (
            resetVelocity &&
            this.cacheDisplacement[axis] !== 0 &&
            Math.sign(this.cacheDisplacement[axis]) !== Math.sign(data.velocity[axis])
        ) {
            data.cacheVelocity[axis] = data.velocity[axis];
            data.velocity[axis] = 0;
        }
    }

    private getCollisions(data: RigidBodyData): Collision[] {
        return data.colliders.reduce<Collision[]>((collisions, collider) => {
            collisions.push(
                ...this.collisionManager
                    .getCollisionsForCollider(collider)
                    .filter((collision) => collision.remoteCollider.physics && collision.remoteCollider.rigidBody)
            );
            return collisions;
        }, []);
    }

    public clear(): void {
        this.rigidBodyData = [];
    }
}
