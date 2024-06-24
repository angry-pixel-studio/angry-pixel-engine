import { Vector2 } from "../../../math";
import { IShape } from "../../component/Shape";

export interface ICollisionResolution {
    penetration: number;
    direction: Vector2;
}

export interface ICollisionResolver {
    resolve(shapeA: IShape, shapeB: IShape, invert?: boolean): ICollisionResolution;
}
