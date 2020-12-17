import { GameObject } from "../../../GameObject";
import { Vector2 } from "../../../Math/Vector2";
import { Rectangle } from "../Shape/Rectangle";
import { ICollider } from "./ICollider";

export class RectangleCollider implements ICollider {
    public readonly gameObject: GameObject;
    public readonly shape: Rectangle;
    public readonly physics: boolean;

    private _quadVertex: Vector2[];
    private _position: Vector2 = new Vector2(0, 0);
    private _width: number = 0;
    private _height: number = 0;

    constructor(position: Vector2, width: number, height: number, physics: boolean, gameObject: GameObject) {
        this._position.set(position.x, position.y);
        this._quadVertex = [new Vector2(0, 0), new Vector2(0, 0), new Vector2(0, 0), new Vector2(0, 0)];
        this._width = width;
        this._height = height;
        this.gameObject = gameObject;
        this.physics = physics;

        this.shape = new Rectangle(
            this.position.x - this.width / 2,
            this._position.y - this._height / 2,
            this.position.x + this.width / 2,
            this._position.y + this._height / 2
        );

        this.updateQuadVertex();
    }

    public set position(coordinates: Vector2) {
        this._position.set(coordinates.x, coordinates.y);
        this.updateQuadVertex();
        this.updateShape();
    }

    public get position(): Vector2 {
        return this._position;
    }

    public set width(width: number) {
        this._width = width;
        this.updateQuadVertex();
    }

    public get width(): number {
        return this._width;
    }

    public set height(height: number) {
        this._height = height;
        this.updateQuadVertex();
    }

    public get height(): number {
        return this._height;
    }

    public get bottomLeftQuadVertex(): Vector2 {
        return this._quadVertex[0];
    }

    public get bottomRightQuadvertex(): Vector2 {
        return this._quadVertex[3];
    }

    public get topLeftQuadVertex(): Vector2 {
        return this._quadVertex[1];
    }

    public get topRightQuadVertex(): Vector2 {
        return this._quadVertex[2];
    }

    private updateShape(): void {
        this.shape.position = this._position;
        this.shape.update();
    }

    // TODO:update using shape vertex
    private updateQuadVertex(): void {
        this._quadVertex[0].set(this._position.x - this._width / 2, this._position.y - this._height / 2);
        this._quadVertex[1].set(this._position.x - this._width / 2, this._position.y + this._height / 2);
        this._quadVertex[2].set(this._position.x + this._width / 2, this._position.y + this._height / 2);
        this._quadVertex[3].set(this._position.x + this._width / 2, this._position.y - this._height / 2);
    }
}
