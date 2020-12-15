import { Vector2 } from "../../../Math/Vector2";
export declare enum ShapeType {
    Rectangle = 0
}
export declare abstract class Shape {
    protected _type: ShapeType;
    protected _position: Vector2;
    protected _vertex: Vector2[];
    protected _direction: Vector2;
    protected _height: number;
    protected _width: number;
    protected _angle: number;
    get type(): ShapeType;
    get position(): Vector2;
    set position(position: Vector2);
    get angle(): number;
    set angle(angle: number);
    get width(): number;
    get height(): number;
    get direction(): Vector2;
    get vertex(): Vector2[];
    abstract update(): void;
    abstract clone(): Shape;
}
