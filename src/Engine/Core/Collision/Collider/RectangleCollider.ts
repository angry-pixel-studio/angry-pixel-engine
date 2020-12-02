import { GameObject } from "../../../GameObject";
import { Vector2 } from "../../../Math/Vector2";
import { ICollider, ColliderType } from "./ICollider";

export class RectangleCollider implements ICollider {
    public readonly type: ColliderType = ColliderType.Rectangle;
    public readonly gameObject: GameObject;
    public readonly points: Vector2[] = [new Vector2(0, 0), new Vector2(0, 0), new Vector2(0, 0), new Vector2(0, 0)];

    private _coordinates: Vector2 = new Vector2(0, 0);
    private _width: number = 0;
    private _height: number = 0;

    constructor(coordinates: Vector2, width: number, height: number, gameObject: GameObject) {
        this._coordinates.set(coordinates.x, coordinates.y);
        this._width = width;
        this._height = height;
        this.gameObject = gameObject;

        this.updatePoints();
    }

    public set coordinates(coordinates: Vector2) {
        this._coordinates.set(coordinates.x, coordinates.y);
        this.updatePoints();
    }

    public get coordinates(): Vector2 {
        return this._coordinates;
    }

    public set width(width: number) {
        this._width = width;
        this.updatePoints();
    }

    public get width(): number {
        return this._width;
    }

    public set height(height: number) {
        this._height = height;
        this.updatePoints();
    }

    public get height(): number {
        return this._height;
    }

    public get bottomLeftPoint(): Vector2 {
        return this.points[3];
    }

    public get bottomRightPoint(): Vector2 {
        return this.points[2];
    }

    public get topLeftPoint(): Vector2 {
        return this.points[0];
    }

    public get topRightPoint(): Vector2 {
        return this.points[1];
    }

    public hasCollision(collider: ICollider): boolean {
        switch (collider.type) {
            case ColliderType.Rectangle:
                return (
                    this.topRightPoint.x >= collider.topLeftPoint.x &&
                    this.topLeftPoint.x <= collider.topRightPoint.x &&
                    this.bottomLeftPoint.y <= collider.topLeftPoint.y &&
                    this.topLeftPoint.y >= collider.bottomLeftPoint.y
                );
            case ColliderType.Polygon:
                return false;
            case ColliderType.Circle:
                return false;
        }
    }

    private updatePoints(): void {
        this.points[0].set(this._coordinates.x, this._coordinates.y);
        this.points[1].set(this._coordinates.x + this._width, this._coordinates.y);
        this.points[2].set(this._coordinates.x + this._width, this._coordinates.y - this._height);
        this.points[3].set(this._coordinates.x, this._coordinates.y - this._height);
    }
}
