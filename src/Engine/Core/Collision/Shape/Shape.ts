import { Vector2 } from "../../../Math/Vector2";

export enum ShapeType {
    Rectangle,
}

export abstract class Shape {
    protected _type: ShapeType;
    protected _vertex: Vector2[] = [];
    protected _position: Vector2 = new Vector2();
    protected _direction: Vector2 = new Vector2();
    protected _height: number = 0;
    protected _width: number = 0;
    protected _angle: number = 0;

    public get type(): ShapeType {
        return this._type;
    }

    public get position(): Vector2 {
        return this._position;
    }

    public set position(position: Vector2) {
        this._position.set(position.x, position.y);
    }

    public get angle(): number {
        return this._angle;
    }

    public set angle(angle: number) {
        this._angle = angle;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get direction(): Vector2 {
        return this._direction;
    }

    public get vertex(): Vector2[] {
        return this._vertex;
    }

    public abstract update(): void;

    public abstract clone(): Shape;
}
