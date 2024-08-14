import { IRigidBody } from "./component/RigidBody";
import { ITransform } from "./component/Transform";
import { ICollider } from "./component/Collider";

export interface IPhysicsEntityManager {
    getEntities(): PhysicsEntity[];
    removeAllEntities(): void;
    addTransform(entityId: number, transform: ITransform): void;
    addRigidBody(entityId: number, rigidBody: IRigidBody): void;
    addCollider(entityId: number, collider: ICollider): void;
}

export type PhysicsEntity = [number, ITransform, IRigidBody?, ICollider[]?];

export class PhysicsEntityManager implements IPhysicsEntityManager {
    private entities: PhysicsEntity[] = [];
    private lastColliderId: number = 0;

    public getEntities(): PhysicsEntity[] {
        return this.entities;
    }

    public removeAllEntities(): void {
        this.entities = [];
        this.lastColliderId = 0;
    }

    public addTransform(entityId: number, transform: ITransform): void {
        this.entities.push([entityId, transform, undefined, []]);
    }

    public addRigidBody(entityId: number, rigidBody: IRigidBody): void {
        this.findEntity(entityId)[2] = rigidBody;
    }

    public addCollider(entityId: number, collider: ICollider): void {
        collider.id = this.lastColliderId++;
        collider.entity = entityId;

        this.findEntity(entityId)[3].push(collider);
    }

    private findEntity(entityId: number): PhysicsEntity {
        const entity = this.entities.find(([e]) => e === entityId);

        if (!entity) throw new Error(`Entity ${entityId} needs a Transform first`);

        return entity;
    }
}
