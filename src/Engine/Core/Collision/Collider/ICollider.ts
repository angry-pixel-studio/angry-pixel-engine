import Vector2 from "../../../Helper/Vector2";

export enum ColliderType {
    Rectangle,
    Circle,
    Polygon,
}

export default interface ICollider {
    readonly type: ColliderType;
    readonly layer: string;
    points: Vector2[];
    readonly bottomLeftPoint: Vector2;
    readonly bottomRightPoint: Vector2;
    readonly topLeftPoint: Vector2;
    readonly topRightPoint: Vector2;
    hasCollision(collider: ICollider): boolean;
}
