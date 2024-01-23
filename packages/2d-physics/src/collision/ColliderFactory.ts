import { Vector2 } from "@angry-pixel/math";
import { ICollider } from "./ICollider";
import { ICollisionResolution } from "./ICollisionResolution";
import { IShape } from "./shape/IShape";

export interface IColliderDto {
    shape: IShape;
    layer: string;
    updateCollisions: boolean;
    physics: boolean;
    position?: Vector2;
    rotation?: number;
    group?: string;
    onCollision?: (resolution: ICollisionResolution) => void;
}

export interface IColliderFactory {
    create(dto: IColliderDto): ICollider;
}

export class ColliderFactory implements IColliderFactory {
    public create({
        shape,
        layer,
        updateCollisions,
        physics,
        position,
        rotation,
        group,
        onCollision,
    }: IColliderDto): ICollider {
        return {
            id: 0,
            active: true,
            layer,
            shape,
            updateCollisions,
            physics,
            position: position ?? new Vector2(),
            rotation: rotation ?? 0,
            group,
            onCollision,
        };
    }
}
