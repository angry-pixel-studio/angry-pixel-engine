import { IColliderDto, IColliderFactory } from "./collision/ColliderFactory";
import { ICollisionManager } from "./collision/CollisionManager";
import { ICollider } from "./collision/ICollider";
import { ICollision } from "./collision/ICollision";
import { IRigidBody } from "./rigidBody/IRigidBody";
import { IRigidBodyDto, IRigidBodyFactory } from "./rigidBody/RigidBodyFactory";
import { IRigidBodyManager } from "./rigidBody/RigidBodyManager";

/**
 * @internal
 */
export interface IPhysicsManager {
    addCollider(colliderDto: IColliderDto): ICollider;
    removeCollider(collider: ICollider): void;
    getCollisionsForCollider(collider: ICollider): ICollision[];
    getCollisionsForColliderAndLayer(collider: ICollider, layer: string): ICollision[];
    addRigidBody(rigidBodyDto: IRigidBodyDto): IRigidBody;
    removeRigidBody(rigidBody: IRigidBody): void;
    resolve(time: number): void;
    clear(): void;
}

export class PhysicsManager implements IPhysicsManager {
    constructor(
        private readonly collisionManager: ICollisionManager,
        private readonly colliderFactory: IColliderFactory,
        private readonly rigidBodyManager: IRigidBodyManager,
        private readonly rigidBodyFactory: IRigidBodyFactory
    ) {}

    public addCollider(colliderDto: IColliderDto): ICollider {
        const collider = this.colliderFactory.create(colliderDto);
        this.collisionManager.addCollider(collider);

        return collider;
    }

    public removeCollider(collider: ICollider): void {
        this.collisionManager.removeCollider(collider);
    }

    public getCollisionsForCollider(collider: ICollider): ICollision[] {
        return this.collisionManager.getCollisionsForCollider(collider);
    }

    public getCollisionsForColliderAndLayer(collider: ICollider, layer: string): ICollision[] {
        return this.collisionManager.getCollisionsForColliderAndLayer(collider, layer);
    }

    public addRigidBody(rigidBodyDto: IRigidBodyDto): IRigidBody {
        const rigidBody = this.rigidBodyFactory.create(rigidBodyDto);
        this.rigidBodyManager.addRigidBody(rigidBody);

        return rigidBody;
    }

    public removeRigidBody(rigidBody: IRigidBody): void {
        this.rigidBodyManager.removeRigidBody(rigidBody);
    }

    public resolve(time: number): void {
        this.collisionManager.resolve();
        this.rigidBodyManager.resolve(time);
    }

    public clear(): void {
        this.collisionManager.clearColliders();
        this.rigidBodyManager.clearRigidBodies();
    }
}
