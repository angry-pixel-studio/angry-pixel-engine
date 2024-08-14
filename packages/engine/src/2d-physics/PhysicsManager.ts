import { CollisionMethods } from "./collision/method/ICollisionMethod";
import { ApplyRepositionSystem } from "./system/ApplyRepositionSystem";
import { ApplyVelocitySystem } from "./system/ApplyVelocitySystem";
import { CollisionMatrix, ResolveCollisionSystem } from "./system/ResolveCollisionSystem";
import { UpdateColliderSystemShape } from "./system/UpdateColliderShapeSystem";
import { UpdateTransformSystem } from "./system/UpdateTransformSystem";
import { BroadPhaseMethods } from "./collision/broadPhase/IBroadPhaseResolver";
import { QuadTree } from "./collision/broadPhase/QuadTree";
import { SpartialGrid } from "./collision/broadPhase/SpartialGrid";
import { AABBMethod } from "./collision/method/AABBMethod";
import { AABBResolver } from "./collision/resolver/AABBResolver";
import { CircumferenceAABBResolver } from "./collision/resolver/CircumferenceAABBResolver";
import { CircumferenceResolver } from "./collision/resolver/CircumferenceResolver";
import { SatMethod } from "./collision/method/SatMethod";
import { SatResolver } from "./collision/resolver/SatResolver";
import { PhysicsEntity, PhysicsEntityManager, IPhysicsEntityManager } from "./PhysicsEntityManager";
import { IRigidBody } from "./component/RigidBody";
import { ICollider } from "./component/Collider";
import { ITransform } from "./component/Transform";
import { ICollision } from "./collision/Collision";

export interface PhysicsManagerOptions {
    collisionBroadPhaseMethod?: BroadPhaseMethods;
    collisionMatrix?: CollisionMatrix;
    collisionMethod?: CollisionMethods;
}

export interface IPhysicsManager {
    update(time: number): void;
    addTransform(entityId: number, transform: ITransform): void;
    addRigidBody(entityId: number, rigidBody: IRigidBody): void;
    addCollider(entityId: number, collider: ICollider): void;
    getEntities(): PhysicsEntity[];
    removeAllEntities(): void;
    getCollisionsForColliderAndLayer(collider: ICollider, layer: string): ICollision[];
    getCollisionsForCollider(collider: ICollider): ICollision[];
}

export class PhysicsManager implements IPhysicsManager {
    private entityManager: IPhysicsEntityManager;
    private applyVelocitySystem: ApplyVelocitySystem;
    private updateTransformSystem: UpdateTransformSystem;
    private updateColliderShapeSystem: UpdateColliderSystemShape;
    private resolveCollisionSystem: ResolveCollisionSystem;
    private applyRepositionSystem: ApplyRepositionSystem;

    constructor(options: PhysicsManagerOptions) {
        this.entityManager = new PhysicsEntityManager();
        this.initializeSystems(options);
    }

    private initializeSystems({
        collisionBroadPhaseMethod,
        collisionMatrix,
        collisionMethod,
    }: PhysicsManagerOptions): void {
        this.applyVelocitySystem = new ApplyVelocitySystem(this.entityManager);
        this.updateTransformSystem = new UpdateTransformSystem(this.entityManager);
        this.updateColliderShapeSystem = new UpdateColliderSystemShape(this.entityManager);
        this.resolveCollisionSystem = new ResolveCollisionSystem(
            this.entityManager,
            collisionBroadPhaseMethod === BroadPhaseMethods.SpartialGrid ? new SpartialGrid() : new QuadTree(),
            collisionMatrix ?? [],
            collisionMethod === CollisionMethods.AABB
                ? new AABBMethod(new AABBResolver(), new CircumferenceAABBResolver(), new CircumferenceResolver())
                : new SatMethod(new CircumferenceResolver(), new SatResolver()),
        );
        this.applyRepositionSystem = new ApplyRepositionSystem(this.entityManager);
    }

    public addTransform(entityId: number, transform: ITransform): void {
        this.entityManager.addTransform(entityId, transform);
    }

    public addRigidBody(entityId: number, rigidBody: IRigidBody): void {
        this.entityManager.addRigidBody(entityId, rigidBody);
    }

    public addCollider(entityId: number, collider: ICollider): void {
        this.entityManager.addCollider(entityId, collider);
    }

    public getEntities(): PhysicsEntity[] {
        return this.entityManager.getEntities();
    }

    public removeAllEntities(): void {
        this.entityManager.removeAllEntities();
    }

    public update(time: number): void {
        this.applyVelocitySystem.update(time);
        this.updateTransformSystem.update();
        this.updateColliderShapeSystem.update();
        this.resolveCollisionSystem.update();
        this.applyRepositionSystem.update(this.resolveCollisionSystem.collisions);
        this.updateTransformSystem.update();
        this.updateColliderShapeSystem.update();
    }

    public getCollisionsForColliderAndLayer(collider: ICollider, layer: string): ICollision[] {
        return this.resolveCollisionSystem.collisions.filter(
            (c) => c.localCollider.id === collider.id && c.remoteCollider.layer === layer,
        );
    }

    public getCollisionsForCollider(collider: ICollider): ICollision[] {
        return this.resolveCollisionSystem.collisions.filter((c) => c.localCollider.id === collider.id);
    }
}
