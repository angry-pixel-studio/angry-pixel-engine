import { ICollision, IPhysicsManager } from "../../2d-physics";
import { BallCollider } from "../component/collider/BallCollider";
import { BoxCollider } from "../component/collider/BoxCollider";
import { EdgeCollider } from "../component/collider/EdgeCollider";
import { PolygonCollider } from "../component/collider/PolygonCollider";
import { TilemapCollider } from "../component/collider/TilemapCollider";

export type ColliderComponent = BallCollider | BoxCollider | EdgeCollider | PolygonCollider;

export interface ICollisionQueryManager {
    findCollisionsForCollider(collider: ColliderComponent): ICollision[];
    findCollisionsForColliderAndLayer(collider: ColliderComponent, layer: string): ICollision[];
}

export class CollisionQueryManager implements ICollisionQueryManager {
    constructor(private readonly physicsManager: IPhysicsManager) {}

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
