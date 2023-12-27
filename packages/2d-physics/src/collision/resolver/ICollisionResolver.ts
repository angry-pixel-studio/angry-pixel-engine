import { IShape } from "../shape/IShape";
import { ICollisionResolution } from "../ICollisionResolution";

export interface ICollisionResolver {
    resolve(shapeA: IShape, shapeB: IShape, invert?: boolean): ICollisionResolution | null;
}
