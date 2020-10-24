import Vector2 from "../../../Helper/Vector2";
import ICollider, { ColliderType } from "./ICollider";

export default class PolygonCollider implements ICollider {
    public readonly type: ColliderType = ColliderType.Polygon;
    public readonly layer: string;

    private _position: Vector2 = new Vector2(0, 0);
    private _points: Vector2[];
    private realPoints: Vector2[];

    constructor(position: Vector2, points: Vector2[], layer: string) {
        if (points.length < 3) {
            throw new Error("PolygonCollider needs at least three points");
        }

        this.layer = layer;
        this._position.set(position.x, position.y);
        this._points = points;
        this.createRealPoints();
    }

    public set points(points: Vector2[]) {
        this._points = points;
        this.createRealPoints();
    }

    public set position(position: Vector2) {
        this._position.set(position.x, position.y);
        this.updateRealPoints();
    }

    public get points(): Vector2[] {
        return this._points;
    }

    public get position(): Vector2 {
        return this._position;
    }

    public get bottomLeftPoint(): Vector2 {
        return null; // TODO: implement
    }

    public get bottomRightPoint(): Vector2 {
        return null; // TODO: implement
    }

    public get topLeftPoint(): Vector2 {
        return null; // TODO: implement
    }

    public get topRightPoint(): Vector2 {
        return null; // TODO: implement
    }

    private createRealPoints(): void {
        this.realPoints = [];
        this._points.forEach((point: Vector2) => this.realPoints.push(new Vector2(point.x, point.y)));
    }

    private updateRealPoints(): void {
        this.realPoints.forEach((point: Vector2, index: number) =>
            point.set(this._points[index].x + this._position.x, this._points[index].y + this._position.y)
        );
    }

    public hasCollision(collider: ICollider): boolean {
        // TODO: implement
        return false;
    }

    private lineIntersection(p11: Vector2, p12: Vector2, p21: Vector2, p22: Vector2): boolean {
        const det = (p12.x - p11.x) * (p22.y - p21.y) - (p22.x - p21.x) * (p12.y - p11.y);
        const lambda = ((p22.y - p21.y) * (p22.x - p11.x) + (p21.x - p22.x) * (p22.y - p11.y)) / det;
        const gamma = ((p11.y - p12.y) * (p22.x - p11.x) + (p12.x - p11.x) * (p22.y - p11.y)) / det;

        return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
    }
}
