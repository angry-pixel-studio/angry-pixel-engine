import Vector2 from "../../Helper/Vector2";

export enum GeometricShape {
    ellipse,
    polygon,
}

export interface ITrapezoid {
    getBottomLeftPoint(): Vector2;
    getBottomRightPoint(): Vector2;
    getTopLeftPoint(): Vector2;
    getTopRightPoint(): Vector2;
}

export default interface IColliderData {
    points: Array<Vector2>;
    type: GeometricShape;
}
