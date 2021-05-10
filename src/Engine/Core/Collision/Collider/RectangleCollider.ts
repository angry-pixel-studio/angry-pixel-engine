import { GameObject } from "../../../GameObject";
import { Vector2 } from "../../../Math/Vector2";
import { Rectangle } from "../Shape/Rectangle";
import { ICollider } from "./ICollider";

export class RectangleCollider implements ICollider {
    public readonly gameObject: GameObject;
    public readonly shape: Rectangle;
    public readonly physics: boolean;

    private _position: Vector2 = new Vector2();
    private _width: number = 0;
    private _height: number = 0;
    private _angle: number = 0;

    private _quadVertices: Vector2[];
    private _quadMaxBounds: Vector2 = new Vector2();
    private _quadMinBounds: Vector2 = new Vector2();

    constructor(
        position: Vector2,
        width: number,
        height: number,
        physics: boolean,
        gameObject: GameObject,
        angle: number = 0
    ) {
        this._position.set(position.x, position.y);
        this._quadVertices = [new Vector2(), new Vector2(), new Vector2(), new Vector2()];
        this._width = width;
        this._height = height;
        this._angle = angle;
        this.gameObject = gameObject;
        this.physics = physics;

        this.shape = new Rectangle(this._position, this._width, this._height);

        this.updateQuadVertices();
    }

    public set position(coordinates: Vector2) {
        this._position.set(coordinates.x, coordinates.y);
        this.updateShape();
        this.updateQuadVertices();
    }

    public get position(): Vector2 {
        return this._position;
    }

    public set width(width: number) {
        this._width = width;
        this.updateShape();
        this.updateQuadVertices();
    }

    public get width(): number {
        return this._width;
    }

    public set height(height: number) {
        this._height = height;
        this.updateShape();
        this.updateQuadVertices();
    }

    public get height(): number {
        return this._height;
    }

    public get angle(): number {
        return this._angle;
    }

    public set angle(angle: number) {
        this._angle = angle;
    }

    public get bottomLeftQuadVertex(): Vector2 {
        return this._quadVertices[0];
    }

    public get bottomRightQuadVertex(): Vector2 {
        return this._quadVertices[3];
    }

    public get topLeftQuadVertex(): Vector2 {
        return this._quadVertices[1];
    }

    public get topRightQuadVertex(): Vector2 {
        return this._quadVertices[2];
    }

    private updateShape(): void {
        this.shape.position = this._position;
        this.shape.width = this._width;
        this.shape.height = this.height;
        this.shape.angle = this._angle * (Math.PI / 180);
        this.shape.update();
    }

    private updateQuadVertices(): void {
        this._quadMaxBounds.set(this.shape.vertices[0].x, this.shape.vertices[0].y);
        this._quadMinBounds.set(this.shape.vertices[0].x, this.shape.vertices[0].y);

        this.shape.vertices.forEach((vertex: Vector2) => {
            this._quadMaxBounds.set(
                Math.max(vertex.x, this._quadMaxBounds.x),
                Math.max(vertex.y, this._quadMaxBounds.y)
            );
            this._quadMinBounds.set(
                Math.min(vertex.x, this._quadMinBounds.x),
                Math.min(vertex.y, this._quadMinBounds.y)
            );
        });

        this._quadVertices[0].set(this._quadMinBounds.x, this._quadMinBounds.y);
        this._quadVertices[1].set(this._quadMinBounds.x, this._quadMaxBounds.y);
        this._quadVertices[2].set(this._quadMaxBounds.x, this._quadMaxBounds.y);
        this._quadVertices[3].set(this._quadMaxBounds.x, this._quadMinBounds.y);
    }
}
