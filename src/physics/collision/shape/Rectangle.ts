import { Vector2 } from "angry-pixel-math";
import { Polygon } from "./Polygon";

export class Rectangle extends Polygon {
    constructor(public width: number, public height: number, position: Vector2) {
        super([
            new Vector2(-width / 2, -height / 2),
            new Vector2(-width / 2, height / 2),
            new Vector2(width / 2, height / 2),
            new Vector2(width / 2, -height / 2),
        ]);

        this._position.copy(position);
        this._projectionAxes = [new Vector2(), new Vector2()];

        this.update();
    }

    public updateSize(width: number, height: number): void {
        this.width = width;
        this.height = height;

        this.vertexModel[0].set(-width / 2, -height / 2);
        this.vertexModel[1].set(-width / 2, height / 2);
        this.vertexModel[2].set(width / 2, height / 2);
        this.vertexModel[3].set(width / 2, -height / 2);
    }

    protected updateProjectionAxes(): void {
        Vector2.unit(
            this._projectionAxes[0],
            Vector2.subtract(this.projectionAxes[0], this._vertices[1], this._vertices[0])
        );
        Vector2.normal(this._projectionAxes[1], this._projectionAxes[0]);
    }
}
