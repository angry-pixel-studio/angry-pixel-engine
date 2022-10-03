import { Vector2 } from "../../../math/Vector2";

export class TileData {
    public readonly position: Vector2 = new Vector2();
    public readonly width: number;
    public readonly height: number;

    private readonly halfWidth: number;
    private readonly halfHeight: number;

    constructor(position: Vector2, width: number, height: number) {
        this.position.set(position.x, position.y);
        this.width = width;
        this.height = height;
    }

    public get x(): number {
        return this.position.x - this.halfWidth;
    }

    public get x1(): number {
        return this.position.x + this.halfWidth;
    }

    public get y(): number {
        return this.position.y - this.halfHeight;
    }

    public get y1(): number {
        return this.position.y + this.halfHeight;
    }
}
