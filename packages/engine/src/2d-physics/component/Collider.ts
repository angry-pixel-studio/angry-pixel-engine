import { Vector2 } from "../../math";
import { IShape } from "./Shape";

export interface ICollider<T extends IShape = IShape> {
    entity?: number;
    id?: number;
    shape: T;
    layer: string;
    physics: boolean;
    updateCollisions: boolean;
    offset: Vector2;
}
