import { ICollisionManager } from "../collision/CollisionManager";
import { Vector2 } from "@angry-pixel/math";
import { IRigidBody, RigidBodyType } from "./IRigidBody";
import { ICollision } from "../collision/ICollision";
import { ICollider } from "../collision/ICollider";

type Axis = "x" | "y";

const axes: Axis[] = ["x", "y"];

export interface IRigidBodyManager {
    addRigidBody(rigidBody: IRigidBody): void;
    removeRigidBody(rigidBody: IRigidBody): void;
    resolve(time: number): void;
    clearRigidBodies(): void;
}

export class RigidBodyManager implements IRigidBodyManager {
    private rigidBodies: IRigidBody[] = [];

    private activeRigidBodies: IRigidBody[] = [];
    private colliders: number[] = [];
    private velocity: Vector2 = new Vector2();
    private displacement: Vector2 = new Vector2();
    private cacheDisplacement: number = 0;

    constructor(private readonly collisionManager: ICollisionManager) {}

    public addRigidBody(rigidBody: IRigidBody): void {
        this.rigidBodies.push(rigidBody);
    }

    public removeRigidBody(rigidBody: IRigidBody): void {
        const index = this.rigidBodies.indexOf(rigidBody);
        if (index >= 0) this.rigidBodies.splice(index, 1);
    }

    public clearRigidBodies(): void {
        this.rigidBodies = [];
    }

    public resolve(time: number): void {
        this.activeRigidBodies = this.rigidBodies.filter((rb) => rb.active);

        this.colliders = this.activeRigidBodies.reduce((c, rb) => [...c, ...rb.colliderIds], []);

        this.activeRigidBodies.forEach((rigidBody) => {
            if (rigidBody.type === RigidBodyType.Dynamic) {
                this.dynamicUpdate(rigidBody, time);
            } else if (rigidBody.type === RigidBodyType.Kinematic) {
                this.kinematicUpdate(rigidBody, time);
            }

            if (rigidBody.onResolve) rigidBody.onResolve(rigidBody);
        });
    }

    private dynamicUpdate(rigidBody: IRigidBody, time: number) {
        this.applyGravity(rigidBody, time);

        axes.forEach((axis) => {
            this.applyVelocity(rigidBody, time, axis);
            this.obtainDisplacement(rigidBody, axis);
            this.applyReposition(rigidBody, axis);
        });
    }

    private kinematicUpdate(rigidBody: IRigidBody, time: number) {
        Vector2.add(rigidBody.position, rigidBody.position, Vector2.scale(this.velocity, rigidBody.velocity, time));

        rigidBody.colliderIds
            .map<ICollider>((id) => this.collisionManager.getCollider(id))
            .forEach((collider) => {
                Vector2.add(collider.position, collider.position, this.velocity);
                this.collisionManager.refreshCollisionsForCollider(collider);
            });
    }

    private applyGravity(rigidBody: IRigidBody, time: number): void {
        if (rigidBody.gravity > 0) {
            rigidBody.velocity.y -= rigidBody.gravity * time;
        }
    }

    private applyVelocity(rigidBody: IRigidBody, time: number, axis: Axis): void {
        this.velocity[axis] = rigidBody.velocity[axis] * time;

        if (this.velocity[axis] === 0) return;

        rigidBody.position[axis] += this.velocity[axis];

        rigidBody.colliderIds
            .map<ICollider>((id) => this.collisionManager.getCollider(id))
            .forEach((collider) => {
                collider.position[axis] += this.velocity[axis];
                this.collisionManager.refreshCollisionsForCollider(collider);
            });
    }

    private obtainDisplacement(rigidBody: IRigidBody, axis: Axis): void {
        this.displacement[axis] = 0;

        this.getCollisions(rigidBody).forEach((collision: ICollision) => {
            this.cacheDisplacement =
                collision.resolution.displacementDirection[axis] * collision.resolution.penetration;

            this.displacement[axis] =
                Math.abs(this.displacement[axis]) > Math.abs(this.cacheDisplacement)
                    ? this.displacement[axis]
                    : this.cacheDisplacement;
        });
    }

    private applyReposition(rigidBody: IRigidBody, axis: Axis): void {
        if (this.displacement[axis] === 0) return;

        rigidBody.position[axis] += this.displacement[axis];

        rigidBody.colliderIds
            .map<ICollider>((id) => this.collisionManager.getCollider(id))
            .forEach((collider) => {
                collider.position[axis] += this.displacement[axis];
                this.collisionManager.refreshCollisionsForCollider(collider);
            });

        if (Math.sign(this.displacement[axis]) !== Math.sign(rigidBody.velocity[axis])) {
            rigidBody.velocity[axis] = 0;
        }
    }

    private getCollisions(rigidBody: IRigidBody): ICollision[] {
        return rigidBody.colliderIds
            .map<ICollider>((id) => this.collisionManager.getCollider(id))
            .filter((collider) => collider.active && collider.physics)
            .reduce<ICollision[]>((collisions, collider) => {
                collisions.push(
                    ...this.collisionManager
                        .getCollisionsForCollider(collider)
                        .filter(
                            (collision) =>
                                collision.remoteCollider.physics && this.colliders.includes(collision.remoteCollider.id)
                        )
                );
                return collisions;
            }, []);
    }
}
