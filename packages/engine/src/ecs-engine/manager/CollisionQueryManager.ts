import { ICollision, IPhysicsManager } from "../../2d-physics";
import { inject, injectable } from "../../ioc/container";
import { BallCollider } from "../component/collider/BallCollider";
import { BoxCollider } from "../component/collider/BoxCollider";
import { EdgeCollider } from "../component/collider/EdgeCollider";
import { PolygonCollider } from "../component/collider/PolygonCollider";
import { TilemapCollider } from "../component/collider/TilemapCollider";
import { TYPES } from "../../config/types";

export type ColliderComponent = BallCollider | BoxCollider | EdgeCollider | PolygonCollider;

export interface ICollisionQueryManager {
    findCollisionsForCollider(collider: ColliderComponent): ICollision[];
    findCollisionsForColliderAndLayer(collider: ColliderComponent, layer: string): ICollision[];
}

@injectable(TYPES.CollisionQueryManager)
export class CollisionQueryManager implements ICollisionQueryManager {
    constructor(@inject(TYPES.PhysicsManager) private readonly physicsManager: IPhysicsManager) {}

    public findCollisionsForCollider(collider: ColliderComponent): ICollision[] {
        if (collider instanceof TilemapCollider) return [];

        if (collider instanceof EdgeCollider) {
            return collider._colliders.reduce(
                (acc, c) => [...acc, ...this.physicsManager.getCollisionsForCollider(c)],
                [],
            );
        } else {
            return this.physicsManager.getCollisionsForCollider(collider._collider);
        }
    }

    public findCollisionsForColliderAndLayer(collider: ColliderComponent, layer: string): ICollision[] {
        if (collider instanceof TilemapCollider) return [];

        if (collider instanceof EdgeCollider) {
            return collider._colliders.reduce(
                (acc, c) => [...acc, ...this.physicsManager.getCollisionsForColliderAndLayer(c, layer)],
                [],
            );
        } else {
            return this.physicsManager.getCollisionsForColliderAndLayer(collider._collider, layer);
        }
    }
}
