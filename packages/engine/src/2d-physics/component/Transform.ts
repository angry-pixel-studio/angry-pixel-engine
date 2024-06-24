import { Vector2 } from "../../math";

export interface ITransform {
    /** Position relative to the zero point of the simulated world, or relative to the parent if it has one */
    position: Vector2;
    /** Scale on x-axis and y-axis */
    scale: Vector2;
    /** Rotation expressed in radians */
    rotation: number;
    /** The position became relative to this transform */
    parent?: ITransform;
    /** The real position in the simulated world. It is the same as position if there is no parent */
    localPosition: Vector2;
    /** The real scale in the simulated world. It has the same value as `scale` property if there is no parent */
    localScale: Vector2;
    /** The real rotation in the simulated world. It has the same value as `rotation` property if there is no parent */
    localRotation: number;
}
